import { partyMsg } from "../../../utils/Functions";
import chatCommandsConfig from "../config";

export default function (player, command, args) {
    switch (command) {
        case "warp":
        case "wt":
            ChatLib.chat(`return`);
            return true;
    }
    return false;
}
