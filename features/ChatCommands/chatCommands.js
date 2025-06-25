// import chatCommandsConfig from "./config";
// import { stripRank } from "../../utils/Functions";
// import { PREFIX } from "../../utils/Utils.js";
// import { RED, DARK_AQUA, GREEN } from "../../utils/Constants.js";

// import * as general from "./commands/general";
// import * as party from "./commands/party";
// import * as misc from "./commands/misc";

// const allCommands = {
//     ...general,
//     ...party,
//     ...misc
// };

// const instanceMap = {
//     f0: "CATACOMBS_ENTRANCE",
//     f1: "CATACOMBS_FLOOR_ONE",
//     f2: "CATACOMBS_FLOOR_TWO",
//     f3: "CATACOMBS_FLOOR_THREE",
//     f4: "CATACOMBS_FLOOR_FOUR",
//     f5: "CATACOMBS_FLOOR_FIVE",
//     f6: "CATACOMBS_FLOOR_SIX",
//     f7: "CATACOMBS_FLOOR_SEVEN",
//     m1: "MASTER_CATACOMBS_FLOOR_ONE",
//     m2: "MASTER_CATACOMBS_FLOOR_TWO",
//     m3: "MASTER_CATACOMBS_FLOOR_THREE",
//     m4: "MASTER_CATACOMBS_FLOOR_FOUR",
//     m5: "MASTER_CATACOMBS_FLOOR_FIVE",
//     m6: "MASTER_CATACOMBS_FLOOR_SIX",
//     m7: "MASTER_CATACOMBS_FLOOR_SEVEN",
//     t1: "KUUDRA_NORMAL",
//     t2: "KUUDRA_HOT",
//     t3: "KUUDRA_BURNING",
//     t4: "KUUDRA_FIERY",
//     t5: "KUUDRA_INFERNAL",
// };

// register("chat", (rawPlayer, message) => {
//     const player = stripRank(rawPlayer);
    
//     if (!config.toggleChatCommands) return;

//     const myUuid = Player.getUUID().replace(/-/g, "");
//     const blacklist = (config.blacklistUUIDs || "")
//         .split(",")
//         .map(s => s.trim())
//         .filter(Boolean);
//     const isBlacklisted = blacklist.includes(myUuid);

//     if (config.blacklist && isBlacklisted) return;

//     const prefix = (config.prefix || "!")
//         .split(",")
//         .map(p => p.trim())
//         .find(p => message.startsWith(p));
//     if (!prefix) return;

//     const body = message.slice(prefix.length).trim();
//     const [commandRaw, ...args] = body.split(" ");
//     const command = commandRaw.toLowerCase();

//     const instance = instanceMap[command];
//     if (instance) {
//         ChatLib.command(`joininstance ${instance}`);
//         return;
//     }

//     const handler = allCommands[command];
//     if (handler) {
//         handler(player, args);
//     } else {
//         ChatLib.chat(`§c[DEBUG] No handler for command: ${command}`);
//     }
// }).setCriteria("Party > ${rawPlayer}: ${message}");
