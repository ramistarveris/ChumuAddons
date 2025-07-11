import config from "../../config";
import { registerWhen } from "../../utils/Utils";
import { hud } from "../../utils/Overlays";

let timerStart = 0;
let displayText = "";

const FireFreezeHUD = hud.createHud("CA:Fire Freeze Notifier", 300, 200, 100, 10);

registerWhen(register("chat", () => {
    timerStart = Date.now();

    setTimeout(() => World.playSound("random.burp", 2, 1), 1000);
    setTimeout(() => World.playSound("random.anvil_land", 2, 1), 5000);
}).setCriteria("[BOSS] The Professor: Oh? You found my Guardians' one weakness?"), () => config.fireFreezeNotifier);

registerWhen(register("step", () => {
    if (timerStart === 0) return;

    const elapsed = (Date.now() - timerStart) / 1000;

    if (elapsed > 1 && elapsed < 5) {
        const remaining = 5 - elapsed;
        const color = remaining > 3.35 ? "&c" : remaining > 1.7 ? "&6" : "&e";
        displayText = `&bFire Freeze: ${color}In ${remaining.toFixed(1)}s`;
    } else if (elapsed >= 5 && elapsed < 6.5) {
        displayText = "&bFire Freeze: &aNOW!";
    } else if (elapsed >= 6.5) {
        timerStart = 0;
        displayText = "";
        return;
    }
}).setFps(10), () => config.fireFreezeNotifier);

// Normal View
register("renderOverlay", () => {
    if (hud.isOpen() || !config.fireFreezeNotifier || !displayText) return;

    Renderer.retainTransforms(true);
    Renderer.translate(FireFreezeHUD.getX(), FireFreezeHUD.getY());
    Renderer.scale(FireFreezeHUD.getScale());

    Renderer.drawStringWithShadow(displayText, 0, 0);

    Renderer.retainTransforms(false);
});

// Editor View
FireFreezeHUD.onDraw(() => {
    Renderer.retainTransforms(true);
    Renderer.translate(FireFreezeHUD.getX(), FireFreezeHUD.getY());
    Renderer.scale(FireFreezeHUD.getScale());

    Renderer.drawStringWithShadow("&bFire Freeze: 5.0s", 0, 0);

    Renderer.retainTransforms(false);
    Renderer.finishDraw();
});
