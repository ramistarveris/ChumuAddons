import config from "../../config";
import { modMsg } from "../../utils/Functions";

const S02PacketChat = Java.type("net.minecraft.network.play.server.S02PacketChat");

register("packetReceived", (packet, event) => {
    if (!config.partyInviteSound) return;
    if (!(packet instanceof S02PacketChat)) return;
    if (packet.func_179841_c() === 2) return;

    const message = ChatLib.removeFormatting(packet.func_148915_c().func_150260_c());
    modMsg(message);
    if (
        message.includes("has invited you to join") &&
        message.includes("You have 60 seconds to accept") &&
        message.includes("Click here to join")
    ) {
        World.playSound("mob.cat.meow", 1, 1);
    }
}).setFilteredClass(S02PacketChat);
