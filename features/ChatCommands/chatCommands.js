import chatCommandsConfig from "./config.js";

function stripRank(name) {
    return name.replace(/\[.+?] /, "");
}

import generalHandler from "./commands/general.js";
import miscHandler from "./commands/misc.js";
import partyHandler from "./commands/party.js";
import skyblockHandler from "./commands/skyblock.js";

const debug = false;
const handlers = [ generalHandler, miscHandler, partyHandler, skyblockHandler ];
const instanceMap = {
    "f0": "CATACOMBS_ENTRANCE",
    "f1": "CATACOMBS_FLOOR_ONE",
    "f2": "CATACOMBS_FLOOR_TWO",
    "f3": "CATACOMBS_FLOOR_THREE",
    "f4": "CATACOMBS_FLOOR_FOUR",
    "f5": "CATACOMBS_FLOOR_FIVE",
    "f6": "CATACOMBS_FLOOR_SIX",
    "f7": "CATACOMBS_FLOOR_SEVEN",
    "m1": "MASTER_CATACOMBS_FLOOR_ONE",
    "m2": "MASTER_CATACOMBS_FLOOR_TWO",
    "m3": "MASTER_CATACOMBS_FLOOR_THREE",
    "m4": "MASTER_CATACOMBS_FLOOR_FOUR",
    "m5": "MASTER_CATACOMBS_FLOOR_FIVE",
    "m6": "MASTER_CATACOMBS_FLOOR_SIX",
    "m7": "MASTER_CATACOMBS_FLOOR_SEVEN",
    "t1": "KUUDRA_NORMAL",
    "t2": "KUUDRA_HOT",
    "t3": "KUUDRA_BURNING",
    "t4": "KUUDRA_FIERY",
    "t5": "KUUDRA_INFERNAL",
};

register("chat", (rawPlayer, message) => {
    if (!chatCommandsConfig.toggleChatCommands) return;

    if (currentPartyLeader == null || currentPartyLeader === "" || currentPartyLeader === undefined) {
        ChatLib.command("pl");
        return;
    }

    const prefix = chatCommandsConfig.prefix.trim();
    if (!message.startsWith(prefix)) return;

    const player = stripRank(rawPlayer);
    const [cmd, ...args] = message.slice(prefix.length).trim().split(" ");
    const command = cmd.toLowerCase();

    debug && ChatLib.chat(`§7[DEBUG] ${command} ${args.join(" ")}`);

    if (instanceMap[command]) {
        ChatLib.command(`joininstance ${instanceMap[command]}`);
    }

    for (const handler of handlers) {
        try {
            if (handler(player, command, args)) break;
        } catch (e) {
            debug && ChatLib.chat(`§c[ERROR] handler: ${e}`);
        }
    }
}).setCriteria("Party > ${rawPlayer}: ${message}");

let currentPartyLeader = null;

register("chat", (leader) => {
    currentPartyLeader = stripRank(leader);
}).setCriteria("Party Leader: ${leader} ●");
register("chat", (leader) => {
    currentPartyLeader = stripRank(leader);
}).setCriteria("You have joined ${leader}'s party!");
register("chat", (leader, byWhom) => {
    currentPartyLeader = stripRank(leader);
}).setCriteria("The party was transferred to ${leader} by ${byWhom}");
register("chat", (promoter, leader) => {
    currentPartyLeader = stripRank(leader);
}).setCriteria("${promoter} has promoted ${leader} to Party Leader");

export function getPartyLeader() { return currentPartyLeader; }
export function isPartyLeader() { return currentPartyLeader && currentPartyLeader === Player.getName(); }
