import { LocalStore } from "../../tska/storage/LocalStore";
import { PREFIX } from "./Utils";

export function partyMsg(text) { ChatLib.command(`party chat ${text}`); }
export function modMsg(text) { ChatLib.chat(`${PREFIX} ${text}`); }

export function stripRank(name) {
    return name.replace(/\[.+?] /, "");
}

export const Data = new LocalStore("ChumuAddons", {
    goldorsection: 0,
    isInDungeon: false,
}, "data.json");

// - Message Functions
export function message_help() {
    partyMsg("[CA] Cmds: !help <general, party, misc or skyblock>");
}

export function message_chumu() {
    partyMsg("ChumuAddons!")
}