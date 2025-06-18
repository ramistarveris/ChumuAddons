import config from "../../config"
import { drawBox, drawInnerBox } from "../../utils/Utils"

register("postRenderEntity", (entity) => {
    if (!config.keyHighlight) return;
    if (!entity || !entity.getName || typeof entity.getName !== "function") return;

    const name = entity.getName().removeFormatting();
    if (!name.match("Wither Key")) return;

    const x = entity.getX();
    const y = entity.getY()+1;
    const z = entity.getZ();
    const width = 1;
    const height = 1;

    const r = config.keyHighlightColorWither.getRed() / 255;
    const g = config.keyHighlightColorWither.getGreen() / 255;
    const b = config.keyHighlightColorWither.getBlue() / 255;
    const a = config.keyHighlightColorWither.getAlpha() / 255;
    const ESP = true;

    drawBox(x, y, z, width, height, r, g, b, a, ESP);
    drawInnerBox(x, y, z, width, height, r, g, b, a, ESP);
});

register("postRenderEntity", (entity) => {
    if (!config.keyHighlight) return;
    if (!entity || !entity.getName || typeof entity.getName !== "function") return;

    const name = entity.getName().removeFormatting();
    if (!name.match("Blood Key")) return;

    const x = entity.getX();
    const y = entity.getY()+1;
    const z = entity.getZ();
    const width = 1;
    const height = 1;

    const r = config.keyHighlightColorBlood.getRed() / 255;
    const g = config.keyHighlightColorBlood.getGreen() / 255;
    const b = config.keyHighlightColorBlood.getBlue() / 255;
    const a = config.keyHighlightColorBlood.getAlpha() / 255;
    const ESP = true;

    drawBox(x, y, z, width, height, r, g, b, a, ESP);
    drawInnerBox(x, y, z, width, height, r, g, b, a, ESP);
});