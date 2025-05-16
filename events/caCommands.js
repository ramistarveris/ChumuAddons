import config from "../config";

export function registerCommands() {
  register("command", () => {
    config.openGUI();
  }).setName("ca");
}