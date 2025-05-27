import config from "../config";
import { saveGuiSettings, loadGuiSettings, setTimeout } from "../utils/Functions";
import { registerWhen } from "../utils/Utils";
import { YELLOW, BOLD } from "../utils/Constants";

let guiSettings = loadGuiSettings();
let editGui = new Gui();
let overlays = [];

export class OverlayTextLine {
    constructor(message) {
        this.text = new Text(message ?? "").setShadow(true).setScale(1.0).setAlign("LEFT");
        this.X = -1;
        this.Y = -1;
        this.scale = 1.0;
        this.lineBreak = true;
    }

    setText(message) {
        this.text.setString(message);
        return this;
    }

    draw() {
        this.text.draw();
    }

    setX(x) {
        this.X = x;
        this.text.setX(x);
        return this;
    }

    setY(y) {
        this.Y = y;
        this.text.setY(y);
        return this;
    }

    setScale(scale) {
        this.scale = scale;
        this.text.setScale(scale);
        return this;
    }
}

export class ChumuOverlay {
    constructor(name, setting, type, locName) {
        this.name = name;
        this.setting = setting;
        this.type = type;
        this.locName = locName;
        this.scale = parseFloat(guiSettings[locName]["s"]);
        this.X = parseInt(guiSettings[locName]["x"]);
        this.Y = parseInt(guiSettings[locName]["y"]);
        this.textLines = [];

        overlays.push(this);

        registerWhen(register("renderOverlay", () => {
            if (this.type !== "render") return;
            this.textLines.forEach((line, i) => {
                line.setX(this.X).setY(this.Y + i * 10).setScale(this.scale).draw();
            });
        }), () => config[this.setting]);
    }

    setLines(lines) {
        this.textLines = lines;
    }

    openGui() {
        editGui.open();
    }
}

register("command", () => {
    editGui.open();
}).setName("chumugui").setAliases("cagui");
