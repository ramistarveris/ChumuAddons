import config from "../../config";

const SystemTray = Java.type("java.awt.SystemTray");
const TrayIcon = Java.type("java.awt.TrayIcon");
const BufferedImage = Java.type("java.awt.image.BufferedImage");

let tray = null;

function showWindowsNotification(title, text) {
    try {
        if (SystemTray.isSupported()) {
            if (!tray) {
                const image = new BufferedImage(1, 1, BufferedImage.TYPE_INT_ARGB);
                tray = new TrayIcon(image, "CA Notification");
                tray.setImageAutoSize(true);
                SystemTray.getSystemTray().add(tray);
            }
            tray.displayMessage(title, text, TrayIcon.MessageType.INFO);
        }
    } catch (e) {
        ChatLib.chat(`§c[NotifierError]: ${e}`);
    }
}

register("chat", (player, classType, classLevel) => {
    if (!config.partyFinderNotifier) return;
    const title = "Party Finder";
    const description = `${player} Joined\n${classType} (${classLevel})`;
    showWindowsNotification(title, description);
}).setCriteria("Party Finder > ${player} joined the dungeon group! (${classType} Level ${classLevel})");

register("chat", () => {
    if (!config.partyFinderNotifier) return;
    const title = "Party Finder";
    const description = "Your dungeon group is full!";
    showWindowsNotification(title, description);
}).setCriteria("Party Finder > Your dungeon group is full! Click here to warp to the dungeon!");
