import { partyMsg } from "../../../utils/Functions";
import chatCommandsConfig from "../config";

export default function (player, command, args) {
    switch (command) {
        case "coords":
        case "coord":
        case "pos":
        case "waypoint":
            ChatLib.chat("return");
            return true;
    }
    return false;
}
