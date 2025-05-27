import config from "../config";
import { LocalStore } from "../../tska/storage/LocalStore";
import { PREFIX } from "./Utils";

// party chat sender
export function partyMsg(text) {
    ChatLib.command(`party chat ${text}`);
}
// mod message sender
export function modMsg(text) {
    ChatLib.chat(`${PREFIX} ${text}`);
}

// HUD関連
export function initializeGuiSettings() {
    return {
        LegionLoc: { "x": 10, "y": 310, "s": 1 },
    };
}

export function loadGuiSettings() {
    let loadedSettings = {};
    try {
        loadedSettings = JSON.parse(FileLib.read("ChumuAddons", "guiSettings.json")) || initializeGuiSettings();
        loadedSettings = checkSettings(loadedSettings);
    } 
    catch (e) {
        loadedSettings = initializeGuiSettings();
        saveGuiSettings(loadedSettings);
    }
    return loadedSettings;
}

function checkSettings(loadedSettings) {
    const defaultSettings = initializeGuiSettings();
    for (let key in defaultSettings) {
        if (!loadedSettings.hasOwnProperty(key)) {
            loadedSettings[key] = defaultSettings[key];
        }
    }
    return loadedSettings;
}

export function saveGuiSettings(guiSettings) {
    FileLib.write("ChumuAddons", "guiSettings.json", JSON.stringify(guiSettings, null, 4));
}

// HUD描画関数
export function drawRect(x1, y1, scale, z) {
    let x = x1 / scale;
    let y = y1 / scale;
    let color = Renderer.color(config.slotColor.getRed(), config.slotColor.getGreen(), config.slotColor.getBlue(), 200);
    Renderer.translate(0, 0, z);
    Renderer.scale(scale, scale);
    Renderer.drawRect(color, x, y, 6.5, 6.5);
}

export function drawOutlinedString(text, x1, y1, scale, z) {
    let outlineString = "&0" + ChatLib.removeFormatting(text);
    let x = x1 / scale;
    let y = y1 / scale;

    Renderer.translate(0, 0, z);
    Renderer.scale(scale, scale);
    Renderer.drawString(outlineString, x + 1, y);
    Renderer.drawString(outlineString, x - 1, y);
    Renderer.drawString(outlineString, x, y + 1);
    Renderer.drawString(outlineString, x, y - 1);
    Renderer.drawString(text, x, y);
}

// setTimeoutラッパー
const Runnable = Java.type("java.lang.Runnable");
const Executors = Java.type("java.util.concurrent.Executors");
const TimeUnit = Java.type("java.util.concurrent.TimeUnit");
const scheduler = Executors.newSingleThreadScheduledExecutor();

export function setTimeout(callback, delay, ...args) {
    args = args || [];
    const timer = scheduler.schedule(
        new JavaAdapter(Runnable, {
            run: function () {
                callback(...args);
            },
        }),
        delay,
        TimeUnit.MILLISECONDS
    );
    return timer;
}

export function cancelTimeout(timer) {
    timer.cancel(true);
}

// GoldorSection
export const Data = new LocalStore("ChumuAddons", {
    goldorsection: 0,
}, "data.json");

export function stripRank(name) {
    return name.replace(/\[.+?] /, "");
}

register("chat", (message) =>
  [
    {
      predicate: msg => msg.startsWith("[BOSS] Storm: I should have known that I stood no chance."),
      action: () => Data.goldorsection = 1
    },
    {
      predicate: msg => (msg.includes("(7/7)") || msg.includes("(8/8)")) && !msg.includes(":"),
      action: () => Data.goldorsection += 1
    },
    {
      predicate: msg => msg === "The Core entrance is opening!",
      action: () => Data.goldorsection = 5
    },
    {
      predicate: msg => msg === "[BOSS] Necron: You went further than any human before, congratulations.",
      action: () => Data.goldorsection = 0
    }
  ].find(({ predicate }) => predicate(message))?.action()
).setCriteria("${message}");

register("worldLoad", () => {
    Data.goldorsection = 0;
});