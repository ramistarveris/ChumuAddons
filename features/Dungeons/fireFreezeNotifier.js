import Dungeon from "../../../BloomCore/dungeons/Dungeon";
import { registerWhen } from "../../utils/Utils";
import { ChumuOverlay, OverlayTextLine } from "../../utils/Overlays";
import config from "../../config";
import { modMsg, partyMsg } from "../../utils/Functions";
import { DARK_AQUA } from "../../utils/Constants";

let timerStart = 0;

//              new ChumuOverlay(name, setting, type, locName)
const overlay = new ChumuOverlay("FireFreezeNotifier", "fireFreezeNotifier", "render", "FireFreezeNotifierLoc");

registerWhen(register("chat", () => {
    timerStart = Date.now();

    setTimeout(() => World.playSound("random.burp", 2, 1), 1000);
    setTimeout(() => World.playSound("random.anvil_land", 2, 1), 5000);
    modMsg(`${DARK_AQUA}Fire Freeze Notifier Timer Started`)
}).setCriteria("[BOSS] The Professor: Oh? You found my Guardians' one weakness?"), () => config.fireFreezeNotifier);

registerWhen(register("step", () => {
    if (timerStart === 0) return;

    const elapsed = (Date.now() - timerStart) / 1000;

    if (Math.floor(elapsed * 10) === 10) {
        modMsg(`&7[DEBUG] Overlay Pos: &eX=${overlay.X} &eY=${overlay.Y} &eS=${overlay.scale}`);
    }

    let line;

    if (elapsed > 1 && elapsed < 5) {
        const remaining = 5 - elapsed;
        const color = remaining > 3.35 ? "&c" : remaining > 1.7 ? "&6" : "&e";
        line = new OverlayTextLine(`&bFire Freeze: ${color}In ${remaining.toFixed(1)}s`);
        modMsg(`${DARK_AQUA}Fire Freeze: ${color}${remaining.toFixed(1)}s`)
    } else if (elapsed >= 5 && elapsed < 6.5) {
        line = new OverlayTextLine("&bFire Freeze: &aNOW!");
        modMsg(`${DARK_AQUA}Fire Freeze: &aNOW!`);
    } else if (elapsed >= 6.5) {
        timerStart = 0;
        overlay.setLines([]);
        return;
    }

    overlay.setLines([line]);
}).setFps(10), () => config.fireFreezeNotifier);
