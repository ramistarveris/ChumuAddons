// GET compact of pickaxe
register("command", () => {
    const item = Player.getHeldItem();
    if (!item) return;

    const rawNBT = item.getNBT().toString();
    const match = rawNBT.match(/compact_blocks:(\d+)/);
    if (match) {
        ChatLib.chat("compact_blocks: " + match[1]);
    } else {
        ChatLib.chat("compact_blocks not found");
    }
}).setName("test");
