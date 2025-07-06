import { partyMsg } from "../../../utils/Functions.js";
import chatCommandsConfig from "../config.js";

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
