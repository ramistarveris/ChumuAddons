import config from "../../config";
import { DARK_AQUA } from "../../utils/Constants";
import { PREFIX, registerWhen } from "../../utils/Utils";

registerWhen(register("chat", (name, event) => {
    ChatLib.command(`pc Leaped to ${name}!`);
    ChatLib.chat(`${PREFIX} ${DARK_AQUA} Leaped to ${name}`);
    cancel(event);
}).setCriteria("You have teleported to ${name}!"),() => config.leapAnnounce);

registerWhen(register("chat", (from, to, event) => {
    const me = Player.getName();
    // Value=0 Never: Messages are not hidden.

    // Value=1 Hide Own: Hide self leap message
    if (config.hideLeap === 1 && from === me) cancel(event);

    // Value=2 Hide Others: Hide other player to other player leap message
    if (config.hideLeap === 2 && to !== me) cancel(event);

    // Value=3 Always: Hide all Leap Messages.
    if (config.hideLeap === 3) cancel(event);
}).setCriteria(/Party > (?:\[.+\])? ?(.+) ?[ቾ⚒]?: Leaped to (\S+)!?/),() => config.hideLeap !== 0);