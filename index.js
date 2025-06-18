import "./config";
import "./debug";

// ChatCommands
import "./features/ChatCommands/chatCommands";
import "./features/ChatCommands/index";

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

import { YELLOW } from "./utils/Constants";
import { PREFIX } from "./utils/Utils";
import { modMsg } from "./utils/Functions";

global.illegalMode = false;

register("gameLoad", () => {
    ChatLib.chat(`${PREFIX} ${YELLOW}Module Loaded!`)
});