import config from "../../config";
import { getFloor } from "../../utils/Dungeons";
import { modMsg } from "../../utils/Functions";

const instanceTypeMap = {
    F0: "CATACOMBS_ENTRANCE",
    F1: "CATACOMBS_FLOOR_ONE",
    F2: "CATACOMBS_FLOOR_TWO",
    F3: "CATACOMBS_FLOOR_THREE",
    F4: "CATACOMBS_FLOOR_FOUR",
    F5: "CATACOMBS_FLOOR_FIVE",
    F6: "CATACOMBS_FLOOR_SIX",
    F7: "CATACOMBS_FLOOR_SEVEN",
    M1: "MASTER_CATACOMBS_FLOOR_ONE",
    M2: "MASTER_CATACOMBS_FLOOR_TWO",
    M3: "MASTER_CATACOMBS_FLOOR_THREE",
    M4: "MASTER_CATACOMBS_FLOOR_FOUR",
    M5: "MASTER_CATACOMBS_FLOOR_FIVE",
    M6: "MASTER_CATACOMBS_FLOOR_SIX",
    M7: "MASTER_CATACOMBS_FLOOR_SEVEN"
};

let disableRequeue = false;

function setDisableRequeue(reason) {
    if (disableRequeue) return;
    disableRequeue = true;
    setTimeout(() => {
        modMsg(`&3Requeue disabled: ${reason}`);
    }, 500);
}

// left/kick
register("chat", (msg) => {
    if (msg.match(/has (left|been removed from) the party\./)) {
        setDisableRequeue("A member left or was removed from the party.");
    }
}).setCriteria("the party.");

// player not leader
register("chat", (msg) => {
    if (msg.match(/^The party was transferred to .+ because .+ left/)) {
        setDisableRequeue("Party leader was transferred due to a member leaving.");
    }
}).setCriteria("The party was transferred to ");

// disbanded
register("chat", (msg) => {
    if (msg.includes("The party was disbanded because all invites expired and the party was empty.")) {
        setDisableRequeue("Party was disbanded due to all invites expiring.");
    }
}).setCriteria("The party was disbanded because all invites expired");

// offline player kicked
register("chat", (msg) => {
    if (msg.match(/^Kicked .+ because they were offline\./)) {
        setDisableRequeue("A member was kicked for being offline.");
    }
}).setCriteria("because they were offline.");

// player kicked
register("chat", (msg) => {
    if (msg.match(/^You have been kicked from the party by .+/)) {
        setDisableRequeue("You were kicked from the party.");
    }
}).setCriteria("You have been kicked from the party");

// player left
register("chat", (msg) => {
    setDisableRequeue("You left the party.");
}).setCriteria("You left the party.");

// leader disbanded
register("chat", (msg) => {
    if (msg.match(/has disbanded the party\./)) {
        setDisableRequeue("The party was disbanded.");
    }
}).setCriteria("has disbanded the party.");

// - reset variable
register("chat", (msg) => {
    if (msg.trim() === "> EXTRA STATS <" || msg.includes("> EXTRA STATS <")) {
        disableRequeue = false;
    }
}).setCriteria("> EXTRA STATS <");

register("chat", () => {
    if (!config.toggleDungeonRequeue) return;
    if (disableRequeue) return;

    const delayTime = config.dungeonRequeueDelay;
    const delay = Math.max(0, Math.min(30, Number(delayTime))) * 1000;
    const floor = getFloor();
    const instanceType = instanceTypeMap[floor];

    if (!instanceType) return;

    modMsg("&3Dungeon Requeue -> Restarting in " + delayTime + "s");
    setTimeout(() => {
        ChatLib.command(`joininstance ${instanceType}`);
    }, delay);
}).setCriteria("                             > EXTRA STATS <");
