import config from "../config";
import { saveGuiSettings, loadGuiSettings } from "../utils/Functions";
import { registerWhen } from "../utils/Utils";

let guiSettings = loadGuiSettings();
let editGui = new Gui();
let overlays = [];
let dragging = null;
let dragOffsetX = 0;
let dragOffsetY = 0;

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

        if (!guiSettings[locName]) {
            guiSettings[locName] = {
                x: 50,
                y: 100,
                s: 1
            };
        }

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

            if (editGui.isOpen()) {
                const posText = new Text(`X: ${this.X}, Y: ${this.Y}, S: ${this.scale.toFixed(1)}`)
                    .setX(this.X)
                    .setY(this.Y - 10)
                    .setScale(1).setShadow(true);
                posText.draw();
            }
        }), () => config[this.setting]);
    }

    setLines(lines) {
        this.textLines = lines;
    }

    openGui() {
        editGui.open();
    }

    isInOverlay(x, y) {
        return x >= this.X && x <= this.X + 100 && y >= this.Y && y <= this.Y + 20;
    }
}

editGui.registerClicked((x, y, btn) => {
    for (let overlay of overlays) {
        if (overlay.isInOverlay(x, y)) {
            dragging = overlay;
            dragOffsetX = x - overlay.X;
            dragOffsetY = y - overlay.Y;
            break;
        }
    }
});

editGui.registerMouseDragged((x, y) => {
    if (dragging) {
        dragging.X = x - dragOffsetX;
        dragging.Y = y - dragOffsetY;
        guiSettings[dragging.locName]["x"] = dragging.X;
        guiSettings[dragging.locName]["y"] = dragging.Y;
    }
});

editGui.registerMouseReleased(() => {
    dragging = null;
    saveGuiSettings(guiSettings);
});

editGui.registerScrolled((x, y, delta) => {
    overlays.forEach(overlay => {
        if (overlay.isInOverlay(x, y)) {
            if (delta === 1 && overlay.scale < 10) overlay.scale += 0.1;
            if (delta === -1 && overlay.scale > 0.2) overlay.scale -= 0.1;
            overlay.scale = parseFloat(overlay.scale.toFixed(1));
            guiSettings[overlay.locName]["s"] = overlay.scale;
        }
    });
});

register("command", () => {
    editGui.open();
}).setName("cagui");
