import config from "../../config";

register("step", () => {
    if (!config.shouldSend) return;

    const text = config.customMessage;
    const channel = config.chatChannel;

    let prefix;
    switch (channel) {
        case 0: prefix = "ac"; break;
        case 1: prefix = "pc"; break;
        case 2: prefix = "gc"; break;
        default: prefix = "ac";
    }

    const fullMessage = `${prefix} ${text}`;

    Client.currentChat = fullMessage;
    Client.clickMouse();
    KeyBind.enter.setState(true);
    KeyBind.enter.setState(false);

    config.shouldSend = false;
}).setFps(2);
