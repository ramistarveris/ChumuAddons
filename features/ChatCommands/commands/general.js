import { message_chumu, message_help, modMsg, partyMsg } from "../../../utils/Functions";
import chatCommandsConfig from "../config";

let tps = 20;
let pastDate = 0;
let ping = 0;
let lastPing = 0;

// !tps
register("packetReceived", () => {
    tps = Math.min(20000 / (Date.now() - pastDate), 20) * 2/11 + tps * 9/11;
    pastDate = Date.now();
}).setFilteredClass(Java.type("net.minecraft.network.play.server.S03PacketTimeUpdate"));

// !ping send 
register("step", () => {
    if (lastPing === 0) {
        const C16 = Java.type("net.minecraft.network.play.client.C16PacketClientStatus");
        const STATE = Java.type("net.minecraft.network.play.client.C16PacketClientStatus$EnumState");
        Client.sendPacket(new C16(STATE.REQUEST_STATS));
        lastPing = Date.now();
    }
}).setDelay(3);
// !ping receive
register("packetReceived", () => {
    if (lastPing !== 0) {
        ping = Date.now() - lastPing;
        lastPing = 0;
    }
}).setFilteredClasses([
    Java.type("net.minecraft.network.play.server.S01PacketJoinGame"),
    Java.type("net.minecraft.network.play.server.S37PacketStatistics")
]);

export default function (player, command, args) {
    switch (command) {
        case "help":
        case "h":
            if (!chatCommandsConfig.help) return true;
            message_help();
            return true;

        case "chumu":
        case "ca":
            if (!chatCommandsConfig.chumu) return true;
            message_chumu();
            return true;

        case "ping":
            if (!chatCommandsConfig.ping) return true;
            if (ping === 0 || ping > 10000) {
                modMsg(`Ping: Pinging...`);
            } else {
                partyMsg(`Ping ➸ ${ping}ms`);
            };
            return true;

        case "tps":
            if (!chatCommandsConfig.tps) return true;
            partyMsg(`TPS ➸ ${tps.toFixed(1)}`);
            return true;

        case "time":
            if (!chatCommandsConfig.time) return true;
            const now = new Date();
            const week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            const day = week[now.getDay()];
            const formatted =
                now.getFullYear() + "/"
                + String(now.getMonth() + 1).padStart(2, "0") + "/"
                + String(now.getDate()).padStart(2, "0") + " "
                + String(now.getHours()).padStart(2, "0") + ":"
                + String(now.getMinutes()).padStart(2, "0") + ":"
                + String(now.getSeconds()).padStart(2, "0")
                + ` (${day})`;
            partyMsg(formatted);
            return true;

        case "wdr":
            if (!chatCommandsConfig.wdr) return true;
            const target = args.length > 0 && args[0] ? args[0] : "Okinaw_a";
            ChatLib.command(`wdr ${target}`);
            return true;
    }
    return false;
}
