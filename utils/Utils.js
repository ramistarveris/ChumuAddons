// Basic Stuff 
export const PREFIX = `§9[§bChumu§9]`;
export const moduleVersion = JSON.parse(FileLib.read("ChumuAddons", "metadata.json")).version;
export const moduleAuthor = JSON.parse(FileLib.read("ChumuAddons", "metadata.json")).author;
export const configHeader = `§9[§bChumu§9] &ev${moduleVersion} \nMade by ${moduleAuthor}`;

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

const romanHash = { I: 1, V: 5, X: 10 };
export function romanToInt(s) {
    let total = 0;
    for (let i = 0; i < s.length; i++) {
        const current = romanHash[s[i]];
        const next = romanHash[s[i + 1]];

        if (next > current) {
            total += next - current;
            i++;
        } else {
            total += current;
        }
    }
    return total;
}

export function hexToRGBA(hex) {
    if (!hex || typeof hex !== "string") return [1, 1, 1, 1];
    if (hex.startsWith("#")) hex = hex.slice(1);

    if (hex.length === 6) {
        const r = parseInt(hex.substring(0, 2), 16) / 255;
        const g = parseInt(hex.substring(2, 4), 16) / 255;
        const b = parseInt(hex.substring(4, 6), 16) / 255;
        return [r, g, b, 1.0];
    } else if (hex.length === 8) {
        const r = parseInt(hex.substring(0, 2), 16) / 255;
        const g = parseInt(hex.substring(2, 4), 16) / 255;
        const b = parseInt(hex.substring(4, 6), 16) / 255;
        const a = parseInt(hex.substring(6, 8), 16) / 255;
        return [r, g, b, a];
    } else {
        return [1, 1, 1, 1]; 
    }
}

export function drawBox(x, y, z, w, h, red, green, blue, alpha, phase) {
    Tessellator.pushMatrix();
    GL11.glLineWidth(2.0);
    GlStateManager.func_179129_p(); // disableCullFace
    GlStateManager.func_179147_l(); // enableBlend
    GlStateManager.func_179106_n()  // disableFog
    GlStateManager.func_179112_b(770, 771); // blendFunc
    GlStateManager.func_179090_x(); // disableTexture2D

    if (phase) {
        GlStateManager.func_179097_i() // disableDepth
    }

    const locations = [
        [[0, 0, 0], [w, 0, 0]],
        [[0, 0, 0], [0, 0, w]],
        [[w, 0, w], [w, 0, 0]],
        [[w, 0, w], [0, 0, w]],
        [[0, h, 0], [w, h, 0]],
        [[0, h, 0], [0, h, w]],
        [[w, h, w], [w, h, 0]],
        [[w, h, w], [0, h, w]],
        [[0, 0, 0], [0, h, 0]],
        [[w, 0, 0], [w, h, 0]],
        [[0, 0, w], [0, h, w]],
        [[w, 0, w], [w, h, w]],
    ];

    locations.forEach((loc) => {
        Tessellator.begin(3).colorize(red, green, blue, alpha);
        Tessellator.pos(x + loc[0][0] - w / 2, y + loc[0][1], z + loc[0][2] - w / 2).tex(0, 0);
        Tessellator.pos(x + loc[1][0] - w / 2, y + loc[1][1], z + loc[1][2] - w / 2).tex(0, 0);
        Tessellator.draw();
    });

    GlStateManager.func_179089_o(); // enableCull
    GlStateManager.func_179084_k(); // disableBlend
    GlStateManager.func_179127_m()  // enableFog
    GlStateManager.func_179098_w(); // enableTexture2D
    if (phase) {
        GlStateManager.func_179126_j(); // enableDepth
    }

    Tessellator.popMatrix();
}

export function drawInnerBox(x, y, z, w, h, r, g, b, a, phase) {
    Tessellator.pushMatrix();

    GL11.glDisable(GL11.GL_CULL_FACE);
    GL11.glEnable(GL11.GL_BLEND);
    GL11.glDisable(GL11.GL_TEXTURE_2D);
    GL11.glDisable(GL11.GL_LIGHTING);
    GL11.glBlendFunc(GL11.GL_SRC_ALPHA, GL11.GL_ONE_MINUS_SRC_ALPHA);

    if (phase) GL11.glDisable(GL11.GL_DEPTH_TEST);

    const hw = w / 2;

    Tessellator.begin(GL11.GL_QUADS);
    Tessellator.colorize(r, g, b, a);

    // bottom
    Tessellator.pos(x - hw, y, z - hw);
    Tessellator.pos(x + hw, y, z - hw);
    Tessellator.pos(x + hw, y, z + hw);
    Tessellator.pos(x - hw, y, z + hw);

    // top
    Tessellator.pos(x - hw, y + h, z - hw);
    Tessellator.pos(x + hw, y + h, z - hw);
    Tessellator.pos(x + hw, y + h, z + hw);
    Tessellator.pos(x - hw, y + h, z + hw);

    // north
    Tessellator.pos(x - hw, y, z - hw);
    Tessellator.pos(x + hw, y, z - hw);
    Tessellator.pos(x + hw, y + h, z - hw);
    Tessellator.pos(x - hw, y + h, z - hw);

    // south
    Tessellator.pos(x - hw, y, z + hw);
    Tessellator.pos(x + hw, y, z + hw);
    Tessellator.pos(x + hw, y + h, z + hw);
    Tessellator.pos(x - hw, y + h, z + hw);

    // east
    Tessellator.pos(x + hw, y, z - hw);
    Tessellator.pos(x + hw, y, z + hw);
    Tessellator.pos(x + hw, y + h, z + hw);
    Tessellator.pos(x + hw, y + h, z - hw);

    // west
    Tessellator.pos(x - hw, y, z - hw);
    Tessellator.pos(x - hw, y, z + hw);
    Tessellator.pos(x - hw, y + h, z + hw);
    Tessellator.pos(x - hw, y + h, z - hw);

    Tessellator.draw();

    if (phase) GL11.glEnable(GL11.GL_DEPTH_TEST);

    GL11.glEnable(GL11.GL_TEXTURE_2D);
    GL11.glEnable(GL11.GL_CULL_FACE);
    GL11.glDisable(GL11.GL_BLEND);
    GL11.glEnable(GL11.GL_LIGHTING);

    Tessellator.popMatrix();
}
