import { Render2D } from "../../../tska/rendering/Render2D";
import config from "../../config";
import { DARK_AQUA } from "../../utils/Constants";
import { PREFIX } from "../../utils/Utils"
import Dungeon from "../../../BloomCore/dungeons/Dungeon";

const handleBatDeath = (soundName) => {
    if (!Dungeon.inDungeon) return;
    if (config.batDead) {
        Render2D.showTitle("&cBat Dead!", null, 1000);
        ChatLib.chat(`${PREFIX} ${DARK_AQUA}Bat killed`);
    }
};

["mob.bat.death", "mob.bat.hurt"].forEach(sound =>
    register("soundPlay", () => handleBatDeath(sound)).setCriteria(sound)
);
