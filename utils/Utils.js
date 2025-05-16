// Basic Stuff 
export const PREFIX = `§9[§bChumu§9]`;
export const moduleVersion = JSON.parse(FileLib.read("ChumuAddons", "metadata.json")).version;
export const moduleAuthor = JSON.parse(FileLib.read("ChumuAddons", "metadata.json")).author;
export const configHeader = `§9[§bChumu§9] &ev${moduleVersion} \nMade by ${moduleAuthor}`;
import Dungeon from "../../BloomCore/dungeons/Dungeon";

// Chat Message Stuff
const messageColors = { info: `&e`, success: `&a`, error: `&c`, warning: `&6` };

export const showChatMessage = (message, status = "info") => { 
  const color = messageColors[status] || messageColors.info;
  ChatLib.chat(`${PREFIX} ${color}${message}`);
}

// Alternative to World.playSound()
export const playSound = (soundName, volume, pitch) => new net.minecraft.network.play.server.S29PacketSoundEffect(soundName, Player.getX(), Player.getY(), Player.getZ(), volume, pitch).func_148833_a(Client.getConnection());

// Registering and unregistering of triggers
const SettingsGui = Java.type("gg.essential.vigilance.gui.SettingsGui");
const registers = [];

export const registerWhen = (trigger, dependency) => {
  registers.push({
    controller: trigger.unregister(),
    dependency,
    registered: false,
  });
};

export const setRegisters = () => {
  registers.forEach((item) => {
    const shouldBeRegistered = item.dependency();
    if (shouldBeRegistered && !item.registered) {
      item.controller.register();
      item.registered = true;
    } else if (!shouldBeRegistered && item.registered) {
      item.controller.unregister();
      item.registered = false;
    }
  });
};

register("gameLoad", () => setRegisters());

register("guiClosed", (gui) => {
  if (gui instanceof SettingsGui) setRegisters();
});

// Checks if a entity is in a specific area
export function isPlayerInArea(x1, x2, y1, y2, z1, z2, entity = Player) {
  const x = entity.getX();
  const y = entity.getY();
  const z = entity.getZ();
  return (
    x >= Math.min(x1, x2) &&
    x <= Math.max(x1, x2) &&
    y >= Math.min(y1, y2) &&
    y <= Math.max(y1, y2) &&
    z >= Math.min(z1, z2) &&
    z <= Math.max(z1, z2)
  );
}

export function isInBoss() { return Dungeon.bossEntry }