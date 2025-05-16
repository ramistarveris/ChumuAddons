import caCommand from "../../../events/caCommands";

caCommand.addListener("help", () => {
    ChatLib.chat("§bChumuAddons Help:");
    ChatLib.chat("- /ca: Open settings GUI");
    ChatLib.chat("- /ca help: Show this help");
});