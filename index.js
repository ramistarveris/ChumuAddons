import config from "./config";
import chatCommandsConfig from "./features/ChatCommands/config";

try {
    require("./debug");
} catch(e) {}
global.illegalMode = false;

// ChatCommands
import "./features/ChatCommands/config";

// General
import "./features/General/autopetDisplay";
// import "./features/General/legionCounter";

// Dungeons
import "./features/Dungeons/cryptReminder";
import "./features/Dungeons/leapAnnouce";
import "./features/Dungeons/mimic";
import "./features/Dungeons/batDead";
// import "./features/Dungeons/fireFreezeNotifier";
import "./features/Dungeons/shadowAssassin";
import "./features/Dungeons/immunityCooldown";
import "./features/Dungeons/starredMob";
import "./features/Dungeons/key";

// F7
import "./features/Dungeons/F7/terminalLabel";
import "./features/Dungeons/F7/witherBox";

// Mining
// import "./features/mining/isOldServer"

// Misc 
import "./features/Misc/shattapWatcher";

// Notification 
import "./features/Notification/partyFinderNotifier";

// Need to load once
import "./utils/Utils"

import { DARK_AQUA, GRAY, YELLOW } from "./utils/Constants";
import { PREFIX } from "./utils/Utils";
import { modMsg } from "./utils/Functions";

register("gameLoad", () => {
    ChatLib.chat(`${PREFIX} ${YELLOW}Module Loaded!`)
});

register("command", (...args) => {
    const subCommand = args[0] === undefined ? undefined : args[0].toLowerCase();

    switch (subCommand) {
        case undefined:
            config.openGUI();
            break;

        case "help":
            modMsg(DARK_AQUA + "ChumuAddons Help:");
            ChatLib.chat(GRAY + "/ca - Open the ChumuAddons Config GUI");
            ChatLib.chat(GRAY + "/ca help - Display this help message");
            ChatLib.chat(GRAY + "/ca chatcommands - Open the ChatCommands GUI (Alias: /ca cc)");
            break;

        case "chatcommands":
        case "cc":
            chatCommandsConfig.openGUI();
            break;

        default:
            modMsg(DARK_AQUA + `Unknown subcommand (${args[0]}). Use /ca help for available commands.`);
            break;
    }
}).setName("ca").setAliases(["chumuaddons", "chumu"]);
