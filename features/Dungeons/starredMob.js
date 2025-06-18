import config from "../../config"
import { drawBox, drawInnerBox } from "../../utils/Utils"

register("postRenderEntity", (entity) => {
    if (!config.starredMob) return;
    if (!entity || !entity.getName || typeof entity.getName !== "function") return;

    const name = entity.getName().removeFormatting();
    if (!name.includes("✯") && !name.includes("Shadow Assassin")) return;

    const x = entity.getX();
    const y = entity.getY();
    const z = entity.getZ();
    const width = 0.6;
    const height = name.includes("Fel") ? -3.0 : -2.0;

    const r = config.starredMobColor.getRed() / 255;
    const g = config.starredMobColor.getGreen() / 255;
    const b = config.starredMobColor.getBlue() / 255;
    const a = config.starredMobColor.getAlpha() / 255;

    const ESP = global.illegalMode;

    drawBox(x, y, z, width, height, r, g, b, a, ESP);
});