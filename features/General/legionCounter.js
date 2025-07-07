import config from "../../config";
import { registerWhen } from "../../utils/Utils";
import { hud } from "../../utils/Overlays";
import { YELLOW, BOLD, AQUA } from "../../utils/Constants";

const LegionHUD = hud.createHud("CA:Legion Counter", 300, 250, 60, 10);

let displayText = "";

function getLegionCount() {
    let legionDistance = 30;
    const players = World
        .getAllPlayers()
        .filter(player =>
            (player.getUUID().version() === 4 || player.getUUID().version() === 1) &&
            player.ping === 1 &&
            player.name != Player.getName() &&
            distanceToPlayer(player) <= legionDistance
        )
        .map(player => player.name)
        .filter((x, i, a) => a.indexOf(x) === i);

    return players.length;
}

function distanceToPlayer(player) {
    return Math.sqrt((player.x - Player.getX()) ** 2 + (player.z - Player.getZ()) ** 2);
}

registerWhen(register("step", () => {
    const count = getLegionCount();
    displayText = `${AQUA}${BOLD}Legion: ${YELLOW}${BOLD}${count}`;
}).setFps(1), () => config.legionCounter);

// Normal View
register("renderOverlay", () => {
    if (hud.isOpen() || !config.legionCounter || !displayText) return;

    Renderer.retainTransforms(true);
    Renderer.translate(LegionHUD.getX(), LegionHUD.getY());
    Renderer.scale(LegionHUD.getScale());

    Renderer.drawString(displayText, 0, 0);

    Renderer.retainTransforms(false);
});

// Editor View
LegionHUD.onDraw(() => {
    Renderer.retainTransforms(true);
    Renderer.translate(LegionHUD.getX(), LegionHUD.getY());
    Renderer.scale(LegionHUD.getScale());

    Renderer.drawString(`${AQUA}${BOLD}Legion: ${YELLOW}${BOLD}5`, 0, 0);

    Renderer.retainTransforms(false);
    Renderer.finishDraw();
});
