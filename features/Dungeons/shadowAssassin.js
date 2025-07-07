import Dungeon from "../../../BloomCore/dungeons/Dungeon";
import { getFloor } from "../../utils/Dungeons";
import { modMsg } from "../../utils/Functions";
import { Render2D } from "../../../tska/rendering/Render2D";
import { DARK_AQUA } from "../../utils/Constants";
import config from "../../config";

const S44PacketWorldBorder = Java.type("net.minecraft.network.play.server.S44PacketWorldBorder");
const WorldBorder = Java.type("net.minecraft.world.border.WorldBorder");

register("packetReceived", (packet, event) => {
    if (!Dungeon.inDungeon || getFloor() === "F1") return;

    const worldborder = new WorldBorder();
    packet.func_179788_a(worldborder);

    if (worldborder.func_177741_h() !== 1) return;

    // Show title
    Render2D.showTitle(`§cShadow Assassin!`, `§eSA is warping to you!`, 3000);

    // Chat message
    modMsg(`${DARK_AQUA}Shadow Assassin!`);

    // Play sound if enabled
    try {
        if (!config.saUseCustomSound) return;
        const pitch = parseFloat(config.saCustomSoundPitch);
        const volume = config.saCustomSoundVolume;
        const repeat = config.saCustomSoundRepeat;

        for (let i = 0; i < repeat; i++) {
            setTimeout(() => {
                World.playSound(config.saCustomSoundName, volume, pitch);
            }, i * 500);
        }
    } catch (e) {
        modMsg(`§c[Error] Failed to play custom sound: ${e}`);
    }
}).setFilteredClass(S44PacketWorldBorder);
