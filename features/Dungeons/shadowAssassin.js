import Dungeon from "../../../BloomCore/dungeons/Dungeon";
import { DARK_AQUA } from "../../utils/Constants";
import { modMsg } from "../../utils/Functions";

const S44PacketWorldBorder = Java.type("net.minecraft.network.play.server.S44PacketWorldBorder");
const WorldBorder = Java.type("net.minecraft.world.border.WorldBorder");

register("packetReceived", (packet, event) => {
    if (!Dungeon.inDungeon) return;

    const worldborder = new WorldBorder();
    packet.func_179788_a(worldborder);

    if (worldborder.func_177741_h() !== 1) return;

    Client.showTitle(" ", "§aShadow Assassin!", 0, 30, 0);
    modMsg(`${DARK_AQUA}Shadow Assassin!`);
    World.playSound("mob.blaze.hit", 1, 1);
    World.playSound("mob.blaze.hit", 1, 1);
    World.playSound("mob.blaze.hit", 1, 1);
}).setFilteredClass(S44PacketWorldBorder);
