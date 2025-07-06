import config from "./config";
import chatCommandsConfig from "./features/ChatCommands/config";

try {
    require("./debug");
} catch(e) {}

// ChatCommands
import "./features/ChatCommands/config";

// General
import "./features/General/autopetDisplay";
// General - Overlays
// import "./features/General/legionCounter";
import "./features/General/speedOverlay";

// Dungeons
import "./features/Dungeons/cryptReminder";
import "./features/Dungeons/leapAnnouce";
import "./features/Dungeons/mimic";
import "./features/Dungeons/batDead";
import "./features/Dungeons/shadowAssassin";
import "./features/Dungeons/immunityCooldown";
import "./features/Dungeons/starredMob";
import "./features/Dungeons/key";
import "./features/Dungeons/dungeonRequeue";
// Dungeon - Overlays
import "./features/Dungeons/fireFreezeNotifier";

// F7
import "./features/Dungeons/F7/terminalLabel";
import "./features/Dungeons/F7/witherBox";

// Mining

// Misc 
import "./features/Misc/shattapWatcher";
// import "./features/Misc/worldAge";

// Notification 
import "./features/Notification/partyFinderNotifier";

// Need to load once
import "./utils/Utils";
import "./utils/Overlays";

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
            ChatLib.chat(GRAY + "/ca &8- &7Open the ChumuAddons Config GUI");
            ChatLib.chat(GRAY + "/ca help &8- &7Display this help message");
            ChatLib.chat(GRAY + "/ca gui &8- &7Open hud positions edit screen (Alias: /camovegui, /ca hud, /cagui)")
            ChatLib.chat(GRAY + "/ca chatcommands &8- &7Open the ChatCommands configs (Alias: /ca cc)");
            break;

        case "chatcommands":
        case "cc":
            chatCommandsConfig.openGUI();
            break;

        case "gui":
        case "hud":
            ChatLib.chat("camovegui");
            break;

        default:
            modMsg(DARK_AQUA + `Unknown subcommand (${args[0]}). Use /ca help for available commands.`);
            break;
    }
}).setName("ca").setAliases(["chumuaddons", "chumu"]);
