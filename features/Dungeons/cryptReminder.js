import { PREFIX, registerWhen } from "../../utils/Utils";
import { DARK_AQUA } from "../../utils/Constants";
import { Render2D } from "../../../tska/rendering/Render2D";
import Dungeon from "../../../BloomCore/dungeons/Dungeon";
import config from "../../config";

let lastReminderTime = 0;

registerWhen(register("step", () => {
    if (!config.cryptReminder) return;
    if (!Dungeon.inDungeon) return;
    if (!config.cryptReminderInterval) return;

    const cryptsFound = Dungeon.crypts;
    const dungeonTime = Dungeon.seconds;
    const reminderInterval = config.cryptReminderInterval;

    if (cryptsFound >= 5) return;
    if (dungeonTime - lastReminderTime < reminderInterval) return;

    const cryptsNeeded = 5 - cryptsFound;

    if (config.cryptReminderAnnounce) {
        ChatLib.command(`party chat Crypt Reminder: Need ${cryptsNeeded} more Crypts.`);
        ChatLib.chat(`${PREFIX} ${DARK_AQUA}Announcing: Crypt Reminder`);
    }

    if (config.cryptReminderPopup) {
        Render2D.showTitle(`&cNeed ${cryptsNeeded} more crypts!`, null, 5000);
        World.playSound("random.orb", 1, 1);
    }

    lastReminderTime = dungeonTime;
}).setFps(1), () => true);

register("worldUnload", () => {
    lastReminderTime = 0;
});
