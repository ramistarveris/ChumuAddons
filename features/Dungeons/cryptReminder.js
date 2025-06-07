import config from "../../config";
import { registerWhen } from "../../utils/Utils";
import { DARK_AQUA } from "../../utils/Constants";
import { isInBoss } from "../../utils/Dungeons";
import { partyMsg, modMsg } from "../../utils/Functions";

import { Render2D } from "../../../tska/rendering/Render2D";
import Dungeon from "../../../BloomCore/dungeons/Dungeon";

let lastReminderTime = 0;
let cryptDoneAnnounced = false;
let bossEntered = false;

// Crypt Reminder
registerWhen(register("step", () => {
    if (!config.cryptReminder) return;
    if (!Dungeon.inDungeon) return;
    if (!config.cryptReminderInterval) return;
    if (isInBoss()) return;

    const cryptsFound = Dungeon.crypts;
    const dungeonTime = Dungeon.seconds;
    const reminderInterval = config.cryptReminderInterval;

    if (cryptsFound >= 5) return;
    if (dungeonTime - lastReminderTime < reminderInterval) return;

    const cryptsNeeded = 5 - cryptsFound;

    if (config.sendMissingCrypts) {
        partyMsg(`Crypt Reminder: Need ${cryptsNeeded} more crypts!`);
        modMsg(`${DARK_AQUA}Announcing -> Crypt Reminder`);
    }

    if (config.cryptReminderTitle) {
        Render2D.showTitle(`&cNeed ${cryptsNeeded} more crypts!`, null, 5000);
        World.playSound("random.orb", 1, 1);
    }

    lastReminderTime = dungeonTime;
}).setFps(1), () => true);

// Crypt Done
registerWhen(register("step", () => {
    if (!config.cryptDoneTitle) return;
    if (!Dungeon.inDungeon) return;
    if (cryptDoneAnnounced) return;
    if (isInBoss()) return;
    if (Dungeon.crypts >= 5) {
        cryptDoneAnnounced = true;
        Render2D.showTitle(`&cCrypt Done`, null, 2000);
        World.playSound("random.orb", 1, 1);

        if (config.sendCryptDone) {
            partyMsg(`Crypt Done!`);
            modMsg(`${DARK_AQUA}Announcing -> Crypt Done`);
        }
    }
}).setFps(3), () => true);

registerWhen(register("step", () => {
    if (!Dungeon.inDungeon) return;

    const nowInBoss = isInBoss();

    if (nowInBoss && !bossEntered) {
        bossEntered = true;
        lastReminderTime = 0;
        cryptDoneAnnounced = false;
    }

    if (!nowInBoss) {
        bossEntered = false;
    }
}).setFps(10), () => true);

// TODO:
// Add selecter Crypt Remider toggle Interval/OnesOnly