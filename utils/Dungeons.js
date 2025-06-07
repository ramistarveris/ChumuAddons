import Dungeon from "../../BloomCore/dungeons/Dungeon"
import config from "../config"
import { romanToInt } from "./Utils"

export function isInDungeon() {
    try {
        return TabList?.getNames()?.some(a => a.removeFormatting() == 'Dungeon: Catacombs')
    } catch (e) {}
}

export function isInBoss() {
    if (!Dungeon.bossEntry || !Dungeon.runStarted || !Dungeon.inDungeon) return false;
    const elapsedSeconds = (Date.now() - Dungeon.runStarted) / 1000;
    const bossTriggerSeconds = (Dungeon.bossEntry - Dungeon.runStarted) / 1000;
    return elapsedSeconds >= bossTriggerSeconds;
}

export function getPower() {
    let footer = TabList?.getFooter()?.removeFormatting();
    let totalPower = 0;
    powerMatch = footer.match(/Blessing of Power (.+)/);
    timeMatch = footer.match(/Blessing of Time (.+)/);

    if (!powerMatch) return;
    totalPower = romanToInt(powerMatch[1]);

    timeMatch ? totalPower += 2.5 : totalPower;
    config.paulBuff ? totalPower *= 1.25 : totalPower;

    return totalPower;
}

export function getClass() {
    let index = TabList?.getNames()?.findIndex(line => line?.includes(Player.getName()));
    if (index == -1) return;

    let match = TabList?.getNames()[index]?.removeFormatting().match(/.+ \((.+) .+\)/);
    if (!match) return "EMPTY";

    return match[1];
}

export function getFloor() {
    if (!Dungeon.floor) return "Unknown";
    const prefix = Dungeon.dungeonType === "Master Mode" ? "M" : "F";
    return `${prefix}${Dungeon.floorNumber}`;
}

export const classColors = {
    "&a": "Tank",
    "&b": "Mage",
    "&c": "Bers",
    "&6": "Arch",
    "&d": "Healer"
};

// ===== F7 Functions =======
//  - Phase

//  - Goldor Phase
let goldorPhase = 0;
register("chat", (message) => {
    [
        {
        predicate: msg => msg.startsWith("[BOSS] Storm:"),
        action: () => goldorPhase = 1
        },
        {
        predicate: msg => (msg.includes("(7/7)") || msg.includes("(8/8)")) && !msg.includes(":"),
        action: () => goldorPhase += 1
        },
        {
        predicate: msg => msg === "The Core entrance is opening!",
        action: () => goldorPhase = 5
        },
        {
        predicate: msg => msg === "[BOSS] Necron: You went further than any human before, congratulations.",
        action: () => goldorPhase = 0
        }
    ].find(({ predicate }) => predicate(message))?.action()
}).setCriteria("${message}");

register("worldLoad", () => {
    goldorPhase = 0;
});

export function getGoldorPhase() {
    return goldorPhase;
}