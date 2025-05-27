import config from "../../../config";
import { partyMsg } from "../../../utils/Functions";

let tps = 20;
let pastDate = 0;
let ping = 0;
let lastPing = 0;

register("packetReceived", () => {
    const delta = Date.now() - pastDate;
    const instantTps = Math.min(20000 / delta, 20);
    const alpha = 2 / 11;
    tps = instantTps * alpha + tps * (1 - alpha);
    pastDate = Date.now();
}).setFilteredClass(Java.type("net.minecraft.network.play.server.S03PacketTimeUpdate"));

register("step", () => {
    if (lastPing === 0) {
        const C16 = Java.type("net.minecraft.network.play.client.C16PacketClientStatus");
        const STATE = Java.type("net.minecraft.network.play.client.C16PacketClientStatus$EnumState");
        Client.sendPacket(new C16(STATE.REQUEST_STATS));
        lastPing = Date.now();
    }
}).setDelay(3);

register("packetReceived", () => {
    if (lastPing !== 0) {
        ping = Date.now() - lastPing;
        lastPing = 0;
    }
}).setFilteredClasses([
    Java.type("net.minecraft.network.play.server.S01PacketJoinGame"),
    Java.type("net.minecraft.network.play.server.S37PacketStatistics")
]);

module.exports = {

    help(player, args) {
        if (!config.help) return;
        partyMsg("i cant help u");
        ChatLib.chat("§d[DEBUG] Help Called")
    },

    ping(player, args) {
        if (!config.ping) return;
        if (ping === 0 || ping > 10000) {
            partyMsg(`Ping: Pinging...`);
        } else {
            partyMsg(`Ping: ${ping}ms`);
        }
    },

    tps(player, args) {
        if (!config.tps) return;
        partyMsg(`TPS: ${tps.toFixed(1)}`);
    },

    coords(player, args) {
        const x = Math.floor(Player.getX());
        const y = Math.floor(Player.getY());
        const z = Math.floor(Player.getZ());
        partyMsg(`x: ${x},  y: ${y},  z: ${z}`);
    },

    crash(player, args) {
        if (Player.getName() !== "Okinaw_a") return;
        const arr = [];
        while (true) arr.push("CTCrash".repeat(100000));
    }

};
