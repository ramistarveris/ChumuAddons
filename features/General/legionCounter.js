import config from "../../config.js";
import { registerWhen } from "../../utils/Utils";
import { OverlayTextLine, ChumuOverlay } from "../../utils/Overlays.js";
import { YELLOW, BOLD, AQUA } from "../../utils/Constants";
// legionOverlay legionCounter
let legionCounter = new ChumuOverlay("legionCounter", "legionCounter", "render", "LegionLoc");
let legionCounterText = new OverlayTextLine("");

// credits SBO(FeeshNotifier)

function getLegionCount() {
    let legionDistance = 30;
    const players = World
        .getAllPlayers()
        .filter(player =>
            // Player, Watchdog は UUID v4、Nickname付きPlayerはv1。NPCを除外するために使用。
            (player.getUUID().version() === 4 || player.getUUID().version() === 1) && 
            player.ping === 1 && // Ping -1 のGhostとWatchdogを除外
            player.name != Player.getName() &&
            disctanceToPlayer(player) <= legionDistance
        )
        .map(player => player.name)
        .filter((x, i, a) => a.indexOf(x) == i);
    
    playersCount = players.length;
    return playersCount;
}

function refreshlegionCounter() {
    legionCounter.setLines([legionCounterText.setText(`${AQUA}${BOLD}Legion: ${YELLOW}${BOLD}${getLegionCount()}`)]);
}

registerWhen(register("step", () => {
    refreshlegionCounter();
}).setFps(1), () => config.legionCounter);

function disctanceToPlayer(player) {
    return distance = Math.sqrt((player.x - Player.getX()) ** 2 + (player.z - Player.getZ()) ** 2);
}

// TODO:
// FIX