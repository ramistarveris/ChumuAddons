import config from "../../config";
import { DARK_AQUA } from "../../utils/Constants";
import { modMsg, partyMsg } from "../../utils/Functions";
import Dungeon from "../../../BloomCore/dungeons/Dungeon";
import { Render3D } from "../../../tska/rendering/Render3D";
import { isInDungeon } from "../../utils/Dungeons";

// let sent = false;
// let mimicSpawned = false;

// register("entityDeath", (ent) => {
//     if (!config.mimicDead || sent || !Dungeon.inDungeon) return;

//     const mcEntity = ent.getEntity();
//     if (!mcEntity || ent.getName().removeFormatting() !== "Mimic") return;

//     // cacmcpCcmp+cm; cap;ICKNp cm;aconmccpOIHNC
//     const isChild = mcEntity.func_70631_g?.();
//     const hasHelmet = mcEntity.func_82169_q?.(0);

//     if (isChild && !hasHelmet) {
//         modMsg(`${DARK_AQUA}Announcing -> Mimic Dead!`);
//         partyMsg("Mimic Dead!");
//         sent = true;
//     }
// });

// ===== Mimic Chest Highlight
const trapChests = new Set();

// Mimic Chest Coord Save
register("step", () => {
    if (!isInDungeon) return;
    if (!World.isLoaded() || !config.mimicChestHighlight) return;

    World.getAllTileEntities().forEach(tile => {
        const text = tile?.toString?.() || "";
        if (text.includes("trapped_chest")) {
            const x = tile.getX?.();
            const y = tile.getY?.();
            const z = tile.getZ?.();
            const key = `${x},${y},${z}`;
            if (!trapChests.has(key)) {
                trapChests.add(key);
            }
        }
    });
}).setFps(1);

// TrapChest Highlighter
register("renderWorld", () => {
    if (!isInDungeon) return;
    if (!config.mimicChestHighlight) return;

    const hex = config.mimicChestColor.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const ESP = global.illegalMode; // toggle ESP

    trapChests.forEach(pos => {
        const [x, y, z] = pos.split(",").map(Number);
        const block = World.getBlockAt(x, y, z);
        if (!block) return;

        Render3D.outlineBlock(block, r, g, b, 255, ESP);
        Render3D.filledBlock(block, r, g, b, 60, ESP);
    });
});

register("worldUnload", () => {
    trapChests.clear();
});