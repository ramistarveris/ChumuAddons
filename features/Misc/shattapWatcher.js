import config from "../../config";
import { registerWhen } from "../../utils/Utils";
import { DARK_AQUA } from "../../utils/Constants";
import Dungeon from "../../../BloomCore/dungeons/Dungeon";
import { modMsg } from "../../utils/Functions";
import { onChatPacket } from "../../../BloomCore/utils/Events";

let wasInDungeon = false;
let musicToggled = false;
let awaitingMusicOffConfirm = false;

// onDungeonJoin -> music off
registerWhen(register("step", () => {
    if (!config.shattapWatcher) return;

    const nowInDungeon = Dungeon.inDungeon;

    // onJoin
    if (nowInDungeon && !wasInDungeon) {
        ChatLib.command("togglemusic");
        modMsg(`${DARK_AQUA}shattapWatcher -> Music Off!`);
        musicToggled = true;
        awaitingMusicOffConfirm = true;
    }

    // onLeave
    if (!nowInDungeon && wasInDungeon) {
        musicToggled = false;
        awaitingMusicOffConfirm = false;
    }

    wasInDungeon = nowInDungeon;
}).setFps(1), () => true);

// onWatcherDone -> music ON!
onChatPacket(() => {
    if (!config.shattapWatcher) return;

    if (musicToggled) {
        ChatLib.command("togglemusic");
        modMsg(`${DARK_AQUA}shattapWatcher -> Music ON!`);
        musicToggled = false;
        awaitingMusicOffConfirm = false;
    }
}).setCriteria("[BOSS] The Watcher: You have proven yourself. You may pass.");

// if music is already ON turn OFF
onChatPacket(() => {
    if (!config.shattapWatcher) return;
    if (!awaitingMusicOffConfirm) return;

    modMsg(`${DARK_AQUA}shattapWatcher -> Music was ON, toggling OFF again`);
    ChatLib.command("togglemusic");
    awaitingMusicOffConfirm = false;
}).setCriteria("Play Music is now enabled!");

// flagReset
register("worldLoad", () => {
    wasInDungeon = false;
    musicToggled = false;
    awaitingMusicOffConfirm = false;
});
