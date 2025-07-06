import config from "../../config";
import { hud } from "../../utils/Overlays";
import { WHITE } from "../../utils/Constants";

const speedHUD = hud.createHud("CA:Speed Overlay", 300, 300, 30, 10);

let speedStr = "";

register("tick", () => {
    if (!config.speedOverlay) {
        speedStr = "";
        return;
    }
    const walkSpeed = Player.getPlayer().field_71075_bZ.func_75094_b();
    speedStr = `✦${Math.floor(walkSpeed * 1000)}`;
});

// Normal View
register("renderOverlay", () => {
    if (hud.isOpen() || !config.speedOverlay || !speedStr) return;

    Renderer.retainTransforms(true);
    Renderer.translate(speedHUD.getX(), speedHUD.getY());
    Renderer.scale(speedHUD.getScale());

    Renderer.drawStringWithShadow(speedStr, 0, 0);

    Renderer.retainTransforms(false);
});

// Editor View
speedHUD.onDraw(() => {
    Renderer.retainTransforms(true);
    Renderer.translate(speedHUD.getX(), speedHUD.getY());
    Renderer.scale(speedHUD.getScale());

    Renderer.drawStringWithShadow(`✦500`, 0, 0);

    Renderer.retainTransforms(false);
    Renderer.finishDraw();
});
