import { HudManager } from "../../tska/gui/HudManager";
import { LocalStore } from "../../tska/storage/LocalStore";

const HudData = new LocalStore("tska", {});
export const hud = new HudManager(HudData);

register("command", () => {
    hud.open();
}).setName("camovegui").setAliases("cagui");