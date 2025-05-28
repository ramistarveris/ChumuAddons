import "./config";
import "./debug";

// ChatCommands
import "./features/ChatCommands/chatCommands";
import "./features/ChatCommands/index";

// General
import "./features/General/customMessage";
import "./features/General/autopetDisplay";
import "./features/General/legionCounter";

// Dungeons
import "./features/Dungeons/cryptReminder";
import "./features/Dungeons/leapAnnouce";
import "./features/Dungeons/mimic";
import "./features/Dungeons/batDead";
import "./features/Dungeons/fireFreezeNotifier";

// F7
import "./features/Dungeons/F7/terminalLabel";

// Mining
import "./features/mining/isOldServer"

// Misc 
import "./features/Misc/shattapWatcher";

// Need to load once
import "./utils/Utils"

import { YELLOW } from "./utils/Constants";
import { PREFIX } from "./utils/Utils";
import { modMsg } from "./utils/Functions";

register("gameLoad", () => {
    ChatLib.chat(`${PREFIX} ${YELLOW}Module Loaded!`)
});