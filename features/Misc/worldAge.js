import config from "../../config.js";
import { registerWhen } from "../../utils/Utils";
import { hud } from "../../utils/Overlays";
import { AQUA, BOLD } from "../../utils/Constants";
import { modMsg } from "../../utils/Functions.js";

const worldAgeHUD = hud.createHud("CA:World Age", 300, 270, 100, 10);

let displayText = "";

register("worldLoad", () => {
    displayText = "";
    if (config.worldAge) {  
        ChatLib.chat(`${AQUA}World loaded. Server uptime will update shortly.`);
    }
});

registerWhen(register("step", () => {
    if (!config.worldAge) return;

    const totalTicks = World.getWorld().func_72820_D();
    const days = Math.floor(totalTicks / 24000);
    displayText = `${AQUA}${days} days`;

}).setFps(2), () => config.worldAge);

// normal view
register("renderOverlay", () => {
    if (hud.isOpen() || !config.worldAge || !displayText) return;

    Renderer.retainTransforms(true);
    Renderer.translate(worldAgeHUD.getX(), worldAgeHUD.getY());
    Renderer.scale(worldAgeHUD.getScale());

    Renderer.drawString(displayText, 0, 0);

    Renderer.retainTransforms(false);
});

// editor view
worldAgeHUD.onDraw(() => {
    Renderer.retainTransforms(true);
    Renderer.translate(worldAgeHUD.getX(), worldAgeHUD.getY());
    Renderer.scale(worldAgeHUD.getScale());

    Renderer.drawString(`${AQUA}5 days`, 0, 0);

    Renderer.retainTransforms(false);
    Renderer.finishDraw();
});
