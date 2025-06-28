// -----------------------------------------------------
// [MVP+] _Vivian_Banshee_ has invited you to join their party!
// You have 60 seconds to accept. Click here to join!
// -----------------------------------------------------

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

register("chat", (player) => {
    if (!config.partyInviteNotifier) return;
    const title = "Invitation received!";
    const description = `${player} has invited you to join their party!\nYou have 60 seconds to accept. Click here to join!`;
    showWindowsNotification(title, description);
}).setCriteria("${player} has invited you to join their party! You have 60 seconds to accept. Click here to join!");
