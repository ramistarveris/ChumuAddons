import { WHITE } from "../../../utils/Constants.js";
import { modMsg, partyMsg } from "../../../utils/Functions.js";
import chatCommandsConfig from "../config.js";

let warpTransferDelay = 0;
let warpTransferTarget = "";
register("step", () => {
    if (warpTransferDelay > 0) {
        warpTransferDelay--;
        if (warpTransferDelay === 0 && warpTransferTarget) {
            ChatLib.command(`party transfer ${warpTransferTarget}`);
            warpTransferTarget = "";
        }
    }
}).setDelay(1);

export default function (player, command, args) {
    switch (command) {
        case "warp":
        case "w":
            if (!chatCommandsConfig.warp) return true;
            ChatLib.command("p warp");
            return true;

        case "warptransfer":
        case "wt":
            if (!chatCommandsConfig.warptransfer) return true;
            ChatLib.command("party warp");
            warpTransferTarget = player;
            warpTransferDelay = 10;
            return true;

        case "wl":
        case "warplocation":
        case "warplocate":
            if (!chatCommandsConfig.warplocate) return true;
            partyMsg("&5WIP COMMAND");
            return true;

        case "inv":
        case "invite":
        case "i":
            if (!chatCommandsConfig.invite) return true;
            if (!args.length) return true; // max 5 mem
            const targetsArr = args.slice(0, 5);
            const amount = targetsArr.length;
            modMsg(`${WHITE}Invited ${amount} member${amount > 1 ? "s" : ""}: ${targetsArr.join(" ")}`);
            ChatLib.command(`party invite ${targetsArr.join(" ")}`);
            return true;

        case "allinv":
        case "allinvite":
        case "ai":
            if (!chatCommandsConfig.allinv) return true;
            ChatLib.command(`p settings allinvite`);
            return true;

        case "reparty":
            if (!chatCommandsConfig.reparty) return true;
            partyMsg("&5WIP COMMAND");
            return true;

        case "tr":
        case "transfer":
        case "trans":
            if (!chatCommandsConfig.tr) return true;
            if (!args.length) return true;
            ChatLib.command(`p transfer ${args[0]}`)
            return true;

        case "promote":
            if (!chatCommandsConfig.promote) return true;
            if (!args.length) return true;
            ChatLib.command(`p promote ${args[0]}`) 
            return true;

        case "demote":
            if (!chatCommandsConfig.demote) return true;
            if (!args.length) return true;
            ChatLib.command(`p demote ${args[0]}`)
            return true;

        case "disband":
        case "db":
            if (!chatCommandsConfig.disband) return true;
            ChatLib.command(`p disband`);
            return true;

        case "kick":
        case "k":
            if (!chatCommandsConfig.kick) return true;
            if (!args.length) return true;
            ChatLib.command(`p kick ${args[0]}`)
            return true;

        case "requeue":
        case "rq":
            if (!chatCommandsConfig.requeue) return true;
            modMsg("&5WIP COMMAND");
            return true;

        case "pt":
        case "ptme":
            if (!chatCommandsConfig.pt) return true;
            modMsg("&5WIP COMMAND");
            return true;

        case "dt":
        case "downtime":
            if (!chatCommandsConfig.downtime) return true;
            modMsg("&5WIP COMMAND");
            return true;

        case "undt":
        case "undowntime":
            if (!chatCommandsConfig.undowntime) return true;
            modMsg("&5WIP COMMAND");
            return true;
        
        // Joininstance Shortcuts : chatCommands.js
    }
    return false;
}
