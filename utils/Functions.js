import config from "../config";
import { LocalStore } from "../../tska/storage/LocalStore";
import { PREFIX } from "./Utils";

export function partyMsg(text) { ChatLib.command(`party chat ${text}`); }
export function modMsg(text) { ChatLib.chat(`${PREFIX} ${text}`); }

export function stripRank(name) { return name.replace(/\[.+?] /, ""); }

export function initializeGuiSettings() {
    return {
        LegionLoc: { x: 10, y: 310, s: 1 },
        FireFreezeNotifierLoc: { x: 50, y: 100, s: 1 },
        OldServerLoc: { x: 100, y: 100, s: 1 },
        testOverlayLoc: {x: 100, y: 100, s: 1},
    };
}

export function loadGuiSettings() {
    let loadedSettings = {};
    try {
        loadedSettings = JSON.parse(FileLib.read("ChumuAddons", "guiSettings.json")) || initializeGuiSettings();
        loadedSettings = checkSettings(loadedSettings);
    } catch (e) {
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

// GUI 表示ユーティリティ
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

// setTimeout 実装
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

// データ管理
export const Data = new LocalStore("ChumuAddons", {
    goldorsection: 0,
    isInDungeon: false,
}, "data.json");