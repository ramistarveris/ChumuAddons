import config from "./config";

// General
import "./features/General/customMessage";
import "./features/General/autopetDisplay";
import "./features/General/legionCounter";

// Dungeons
import "./features/Dungeons/cryptReminder";
import "./features/Dungeons/leapAnnouce";
import "./features/Dungeons/mimic";
import "./features/Dungeons/batDead";
    import "./features/Dungeons/F7/terminalLabel";

// Need to load once
import "./utils/Utils";

ChatLib.chat("§9[§bChumu§9]§e Module Loaded!");

register("command", () => {
    config.openGUI();
}).setName("chumuaddons").setAliases("ca");
