import Settings from "../../config";
import saCommand from "../../events/caCommands";
import "./help";

saCommand.addListener(undefined, () => Settings.openGUI());
