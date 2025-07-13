import config from "../../config";
import Dungeon from "../../../BloomCore/dungeons/Dungeon";
import { getFloor } from "../../utils/Dungeons";
import { modMsg } from "../../utils/Functions";
import { Render2D } from "../../../tska/rendering/Render2D";
import { DARK_AQUA } from "../../utils/Constants";

const S44PacketWorldBorder = Java.type("net.minecraft.network.play.server.S44PacketWorldBorder");
const WorldBorder = Java.type("net.minecraft.world.border.WorldBorder");

register("packetReceived", (packet, event) => {
    if (!Dungeon.inDungeon || getFloor() === "F1") return;
    if (!config.saJumping) return;

    const worldborder = new WorldBorder();
    packet.func_179788_a(worldborder);

    if (worldborder.func_177741_h() !== 1) return;

    Render2D.showTitle(`§cShadow Assassin!`, `§eSA is warping to you!`, 3000);

    modMsg(`${DARK_AQUA}Shadow Assassin!`);

    try {
        if (!config.saUseCustomSound) {
            World.playSound("random.orb", 1, 1);
            return;
        }

        const pitch = parseFloat(config.saCustomSoundPitch);
        const volume = parseFloat(config.saCustomSoundVolume);
        const repeat = config.saCustomSoundRepeat;

        for (let i = 0; i < repeat; i++) {
            setTimeout(() => {
                World.playSound(config.saCustomSoundName, volume, pitch);
            }, i * 500);
        }
    } catch (e) {
        modMsg(`§c[Error] Failed to play sound: ${e}`);
    }
}).setFilteredClass(S44PacketWorldBorder);
