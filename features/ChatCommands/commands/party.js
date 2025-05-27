import config from "../../../config";
import { partyMsg } from "../../../utils/Functions"

module.exports = {

    inv(player, args) {
        if (!config.inv) return;
        if (args.length > 0) ChatLib.command(`p ${args.join(" ")}`);
    },

    allinv(player, args) {
        if (!config.allinv) return;
        ChatLib.command("p setting allinvite");
    },

    tr(player, args) {
        if (!config.tr) return;
        if (args.length > 0) ChatLib.command(`p transfer ${args.join(" ")}`);
    },

    ptme(player, args) {
        if (!config.ptme) return;
        ChatLib.command(`p transfer ${Player.getName()}`);
    },

    pm(player, args) {
        if (!config.pm) return;
        if (args.length > 0) ChatLib.command(`p promote ${args.join(" ")}`);
    },

    warp(player, args) {
        if (!config.warp) return;
        ChatLib.command("p warp");
    },

    kick(player, args) {
        if (!config.kick) return;
        if (args.length > 0) ChatLib.command(`p kick ${args.join(" ")}`);
    },

    db(player, args) {
        if (!config.db) return;
        ChatLib.command("p disband");
    },

    // ===== Dungeon Requeue =====
    dt(player, args) {
        if (!config.dt) return;
        // todo
    },

    cdt(player, args) {
        if (!config.cdt) return;
        // todo
    },

    requeue(player, args) {
        if (!config.requeue) return;
        // todo
    },
};