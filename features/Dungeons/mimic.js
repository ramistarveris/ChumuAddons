import config from "../../config";
import { Feature } from "../../../tska/event/Feature";

let inDungeon = false;
const deadMimics = new Set();
const trapChests = new Set();

// Dungeon 判定用（S3EPacketTeamsのprefix判定）
let PrefixField = null;
register("packetReceived", (packet) => {
    if (packet.class.getSimpleName() !== "S3EPacketTeams") return;
    if (!PrefixField) {
        PrefixField = packet.getClass().getDeclaredField("field_149319_c");
        PrefixField.setAccessible(true);
    }
    const prefix = PrefixField.get(packet);
    inDungeon = [
        "Starting in", "Dungeon Cleared", "Time Elapsed", "Keys"
    ].some(v => (prefix || "").split(":")[0] === v || prefix.startsWith(" §7⏣ §cThe Cat"));
});

register("worldLoad", () => {
    inDungeon = false;
    deadMimics.clear();
    trapChests.clear();
});

// Mimic死亡検出機能
const MimicDead = new Feature(() => config.mimicDead, "Send Mimic Dead Message", "Dungeons");

MimicDead.onRegister(() => {
    deadMimics.clear();
    trapChests.clear();
});

register("step", () => {
    if (!inDungeon || !config.mimicDead) return;

    World.getAllEntities().forEach(entity => {
        const rawName = entity.getName?.() || "null";
        const cleaned = rawName.removeFormatting?.() || rawName;
        const uuid = entity.getUUID?.() || "";

        if (entity.getClassName() === "EntityArmorStand" && cleaned.includes("Mimic")) {
            if (!deadMimics.has(uuid)) {
                const match = cleaned.match(/Mimic (\d+(?:\.\d+)?)([kKmM])?[❤?]/);
                if (!match) return;

                let shownHp = parseFloat(match[1]);
                const suffix = match[2]?.toLowerCase();

                if (suffix === "k") shownHp *= 1_000;
                else if (suffix === "m") shownHp *= 1_000_000;

                if (shownHp === 0) {
                    deadMimics.add(uuid);
                    ChatLib.command("pc Mimic Dead!");
                }
            }
        }
    });
}).setFps(1);

// TrapChest検出＋デバッグ出力（GUI設定でON/OFF）
// register("step", () => {
//     if (!World.isLoaded() || !config.mimicChest) return;
//     trapChests.clear();

//     World.getAllTileEntities().forEach(tile => {
//         const text = tile?.toString?.() || "";
//         if (text.includes("trapped_chest")) {
//             const x = tile.getX?.(), y = tile.getY?.(), z = tile.getZ?.();
//             if (x != null && y != null && z != null) {
//                 const key = `${x},${y},${z}`;
//                 trapChests.add(key);
//                 ChatLib.chat(`&a[DETECTED] TrapChest at ${x} ${y} ${z}`);
//             }
//         }
//     });
// }).setFps(5);

