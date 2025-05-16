import { Render2D } from "../../../tska/rendering/Render2D";
import { registerWhen } from "../../utils/Utils";
import config from "../../config";

registerWhen(
    register("chat", (color, pet) => {
        Render2D.showTitle(`${color}${pet}`, `&cAutopet`, 400);
    })
    .setCriteria(/&.Autopet &.equipped your &.\[Lvl \d+\] (&.)([A-z ]+)(?:&. ✦)?&.! &.&.VIEW RULE&./)
    .setStart(),
    () => config.autopetDisplay
);