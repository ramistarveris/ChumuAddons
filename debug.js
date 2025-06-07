// Toggle Debug Mode
const debug = true;

import config from "./config";

// Utils
import { Data, modMsg, stripRank } from "./utils/Functions";
import { registerWhen } from "./utils/Utils";

// 外部モジュール
import Dungeon from "../BloomCore/dungeons/Dungeon";
import { ChumuOverlay, OverlayTextLine } from "./utils/Overlays";

// testcommands
register("command", () => {

}).setName("catest");
