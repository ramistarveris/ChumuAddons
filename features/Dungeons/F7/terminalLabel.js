import config from "../../../config";
import { getGoldorPhase } from "../../../utils/Dungeons";
import { Render3D } from "../../../../tska/rendering/Render3D";

// Credits Meow Addons
const DEBUG = false;

const phases = {
    1: [
        { text: "&7[&f1&7]", x: 110.5, y: 113.5, z: 73.5 },
        { text: "&7[&f2&7]", x: 110.5, y: 119.5, z: 79.5 },
        { text: "&7[&f3&7]", x: 89.5, y: 112.5, z: 92.5 },
        { text: "&7[&f4&7]", x: 89.5, y: 122.5, z: 101.5 },
        { text: "Device", x: 108, y: 122, z: 94 },
    ],
    2: [
        { text: "&7[&f1&7]", x: 68.5, y: 109.5, z: 121.5 },
        { text: "&7[&f2&7]", x: 59.5, y: 120.5, z: 122.5 },
        { text: "&7[&f3&7]", x: 47.5, y: 109.5, z: 121.5 },
        { text: "&7[&f4&7]", x: 39.5, y: 108.5, z: 143.5 },
        { text: "&7[&f5&7]", x: 40.5, y: 124.5, z: 123.5 },
        { text: "Device", x: 60.5, y: 134, z: 140.5 },
    ],
    3: [
        { text: "&7[&f1&7]", x: -2.5, y: 109.5, z: 112.5 },
        { text: "&7[&f2&7]", x: -2.5, y: 119.5, z: 93.5 },
        { text: "&7[&f3&7]", x: 19.5, y: 123.5, z: 93.5 },
        { text: "&7[&f4&7]", x: -2.5, y: 109.5, z: 77.5 },
        { text: "Device", x: 0.5, y: 121.5, z: 77.5 },
    ],
    4: [
        { text: "&7[&f1&7]", x: 41.5, y: 109.5, z: 29.5 },
        { text: "&7[&f2&7]", x: 44.5, y: 121.5, z: 29.5 },
        { text: "&7[&f3&7]", x: 67.5, y: 109.5, z: 29.5 },
        { text: "&7[&f4&7]", x: 72.5, y: 115.5, z: 48.5 },
        { text: "Device", x: 63.5, y: 128.5, z: 35.5 },
    ],
};

const labels = {
    "&7[&f1&7]": "&aTank",
    "&7[&f2&7]": "&bMage",
    "&7[&f3&7]": "&cBers",
    "&7[&f4&7]": "&6Arch",
    "&7[&f5&7]": "&cBers",
};

const getLabel = text => {
    const phase = getGoldorPhase();
    if (phase === 1) {
        if (["&7[&f1&7]", "&7[&f2&7]"].includes(text)) return "&aTank";
        if (["&7[&f3&7]", "&7[&f4&7]"].includes(text)) return "&bMage";
        return "";
    }
    return labels[text] || "";
};

const renderTerm = ({ text, x, y, z }) => {
    if (text === "Device" && !config.displayDevice) return;

    if (DEBUG) {
        ChatLib.chat(`§b[renderTerm] ${text} at (${x}, ${y}, ${z})`);
    }

    if (config.displayTermNumber) {
        Render3D.renderString(text, x, y + 0.5, z, 0xffffff, true, 0.05, false, true, true);
    }

    if (config.displayTermClass && text !== "Device") {
        const label = getLabel(text);
        if (label) {
            Render3D.renderString(label, x, y, z, 0xffffff, true, 0.05, false, true, true);
        }
    }
};

register("renderWorld", () => {
    if (!config.displayTermNumber && !config.displayTermClass && !config.displayDevice) return;

    const phase = getGoldorPhase();
    const phaseData = phases[phase];
    if (!phaseData) return;

    phaseData.forEach(renderTerm);
});
