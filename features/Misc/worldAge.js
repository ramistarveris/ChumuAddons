import config from "../../config";
import { modMsg } from "../../utils/Functions";
import { AQUA } from "../../utils/Constants.js";
import { registerWhen } from "../../utils/Utils.js";

register("worldLoad", () => {
    if (!config.worldAge) return;

    setTimeout(() => {
        const world = World.getWorld();
        if (!world) return;

        const totalTicks = world.func_72820_D();
        const days = totalTicks / 24000;

        let color;
        if (days >= 17) {
            color = "&c";
        } else if (days >= 10) {
            color = "&e";
        } else {
            color = "&a";
        }

        modMsg(`${color}${days.toFixed(2)} days`);
    }, 400);
});