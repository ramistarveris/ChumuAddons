import chatCommandsConfig from "./config";
import { stripRank } from "../../utils/Functions";

import generalHandler from "./commands/general.js"
import miscHandler from "./commands/misc.js"
import partyHandler from "./commands/party.js"
import skyblockHandler from "./commands/skyblock.js"

const debug = false;
const handlers = [ generalHandler, miscHandler, partyHandler, skyblockHandler ];

register("chat", (rawPlayer, message) => {
    if (!chatCommandsConfig.toggleChatCommands) return;

    const prefix = chatCommandsConfig.prefix.trim();
    if (!message.startsWith(prefix)) return;

    const player = stripRank(rawPlayer);
    const [cmd, ...args] = message.slice(prefix.length).trim().split(" ");
    const command = cmd.toLowerCase();

    debug && ChatLib.chat(`§7[DEBUG] ${command} ${args.join(" ")}`);

    for (const handler of handlers) {
        try {
            if (handler(player, command, args)) break;
        } catch (e) {
            debug && ChatLib.chat(`§c[ERROR] handler: ${e}`);
        }
    }
}).setCriteria("Party > ${rawPlayer}: ${message}");
