import config from "../../config";
import { DARK_AQUA } from "../../utils/Constants";
import { modMsg, partyMsg } from "../../utils/Functions";
import Dungeon from "../../../BloomCore/dungeons/Dungeon";

let sent = false;
let mimicSpawned = false;

register("entityDeath", (ent) => {
    if (!config.mimicDead || sent || !Dungeon.inDungeon) return;

    const mcEntity = ent.getEntity();
    if (!mcEntity || ent.getName().removeFormatting() !== "Mimic") return;

    // cacmcpCcmp+cm; cap;ICKNp cm;aconmccpOIHNC
    const isChild = mcEntity.func_70631_g?.();
    const hasHelmet = mcEntity.func_82169_q?.(0);

    if (isChild && !hasHelmet) {
        modMsg(`${DARK_AQUA}Announcing -> Mimic Dead!`);
        partyMsg("Mimic Dead!");
        sent = true;
    }
});

