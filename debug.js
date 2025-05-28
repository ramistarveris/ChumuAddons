// Toggle Debug Mode
const debug = true;

import config from "./config";

// Utils
import { Data, modMsg, stripRank } from "./utils/Functions";
import { registerWhen } from "./utils/Utils";

// 外部モジュール
import Dungeon from "../BloomCore/dungeons/Dungeon";
import { onChatPacket } from "../BloomCore/utils/Events";

let wasInDungeon = false;

registerWhen(register("step", () => {
    const nowInDungeon = Dungeon.inDungeon;

    if (nowInDungeon && !wasInDungeon) {
        Data.isInDungeon = true;
    }

    if (!nowInDungeon && wasInDungeon) {
        Data.isInDungeon = false;
    }

    wasInDungeon = nowInDungeon;
}).setFps(1), () => true);