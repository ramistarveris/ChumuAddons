import config from "../../config";
import { addListener } from "../../event/commandListener";
// import { updateList } from "./chatCommands";

addListener(undefined, () => config.openGUI());

// addListener("whitelist", (action, mcid) => {
//     updateList("whitelist", action, mcid);
// });

// addListener("blacklist", (action, mcid) => {
//     updateList("blacklist", action, mcid);
// });
