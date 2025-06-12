import config from "../../../config"
import { isInBoss } from "../../../utils/Dungeons";
import { drawBox, drawInnerBox } from "../../../utils/Utils"

register("postRenderEntity", (entity) => {
    if (!config.witherBox) return;
    if (!isInBoss()) return;
    if (entity.getClassName() !== "EntityArmorStand") return;

    const name = entity.getName()?.removeFormatting?.() || "";
    if (!name.match(/Maxor|Storm|Goldor|Necron/)) return;

    const x = entity.getX();
    const y = entity.getY() - 0.5;
    const z = entity.getZ();
    const width = 1.0;
    const height = -3.0;
    const r = 1.0, g = 0.0, b = 0.0;
    const alphaBox = 1.0;
    const alphaFill = 0.2;
    const ESP = config.witherBoxESP;

    drawBox(x, y, z, width, height, r, g, b, alphaBox, ESP);
    drawInnerBox(x, y, z, width, height, r, g, b, alphaFill, ESP);
});
