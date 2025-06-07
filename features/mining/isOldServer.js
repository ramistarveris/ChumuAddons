import config from "../../config";
import { AQUA } from "../../utils/Constants";
import { modMsg } from "../../utils/Functions";
import { registerWhen } from "../../utils/Utils";
import { ChumuOverlay, OverlayTextLine } from "../../utils/Overlays"; // 追加

const targetLocations = [
    "jungle", "temple", "mithril", "divan", "goblin", "precursor",
    "crystal", "magma", "khazad", "fairy", "dragon", "dwarven"
];

let matched = false;
let wasMatched = false;
let dayText = "";

let dayOverlay = new ChumuOverlay("OldServerOverlay", "isOldServer", "render", "OldServerLoc");
let dayOverlayText = new OverlayTextLine("");

register("step", () => {
    if (!config.isOldServer) return;

    const rawLines = Scoreboard.getLines().map(line => line.getName().removeFormatting());
    const cleanedLines = rawLines.map(sanitizeText);

    wasMatched = matched;
    matched = false;

    for (const line of cleanedLines) {
        for (const keyword of targetLocations) {
            if (line.toLowerCase().includes(keyword)) {
                matched = true;
                break;
            }
        }
        if (matched) break;
    }

    if (matched) {
        const totalTicks = World.getWorld().func_72820_D();
        const days = Math.floor(totalTicks / 24000);
        dayText = `&z${days} days`;

        dayOverlay.setLines([dayOverlayText.setText(`${AQUA}${days} days`)]);

        if (!wasMatched) {
            modMsg(`${AQUA}This server has been up for ${days} days`);
        }
    } else {
        dayText = "";
        dayOverlay.setLines([]);
    }
}).setFps(2);

registerWhen(
    register("renderOverlay", () => {
        dayOverlay.render();
    }),
    () => config.isOldServer && matched
);

function sanitizeText(text) {
    return text
        .replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, "")
        .replace(/[^\x20-\x7E\u00A0-\u00FF\u3000-\u30FF\u4E00-\u9FFF]/g, "")
        .trim();
}
