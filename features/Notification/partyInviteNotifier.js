import config from "../../config";

const S02PacketChat = Java.type("net.minecraft.network.play.server.S02PacketChat");
const SystemTray = Java.type("java.awt.SystemTray");
const TrayIcon = Java.type("java.awt.TrayIcon");
const BufferedImage = Java.type("java.awt.image.BufferedImage");

let tray = null;

function showWindowsNotification(title, text) {
    try {
        if (SystemTray.isSupported()) {
            if (!tray) {
                const image = new BufferedImage(1, 1, BufferedImage.TYPE_INT_ARGB);
                tray = new TrayIcon(image, "Party Invite Notifier");
                tray.setImageAutoSize(true);
                SystemTray.getSystemTray().add(tray);
            }
            tray.displayMessage(title, text, TrayIcon.MessageType.INFO);
        }
    } catch (e) {
        ChatLib.chat(`§c[NotifierError]: ${e}`);
    }
}

register("packetReceived", (packet, event) => {
    if (!config.partyInviteNotifier) return;
    if (!(packet instanceof S02PacketChat)) return;
    if (packet.func_179841_c() === 2) return;

    const message = ChatLib.removeFormatting(packet.func_148915_c().func_150260_c());
    if (
        message.includes("has invited you to join") &&
        message.includes("You have 60 seconds to accept") &&
        message.includes("Click here to join")
    ) {
        const match = message.match(/(.*?) has invited you to join/);
        const player = match ? match[1] : "Someone";
        showWindowsNotification("Party Invite", `${player} has invited you to join their party!`);
    }
}).setFilteredClass(S02PacketChat);
