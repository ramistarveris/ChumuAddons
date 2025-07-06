import "./chatCommands";
import { 
    @Vigilant, 
    @CheckboxProperty,
    @SwitchProperty, 
    @TextProperty, 
    @SliderProperty, 
    @ButtonProperty, 
    @ColorProperty,
    Color,
    @SelectorProperty
} from "Vigilance";

// fuck the term ChatCommands is too long I don't like the abbreviation CC I need something better
@Vigilant("ChumuAddons/features/ChatCommands", "§l§bChumu§9Addons §7- §3ChatCommands ", {
    getCategoryComparator: () => (a, b) => {
        const order = ["ChatCommand", "General", "Party", "Skyblock", "Misc"];
        return order.indexOf(a.name) - order.indexOf(b.name);
    },
})

class chatCommandsConfig {
    // fuckin toggle cc
    @SwitchProperty({
        name: "Enable Chat Commands",
        description: "Enable or disable the chat commands feature.",
        category: "ChatCommand",
    })
    toggleChatCommands = false;
    @TextProperty({
        name: "Chat Commands Prefix",
        description: "The prefix for chat commands. Multiple prefixes can be separated by commas.",
        category: "ChatCommand",
    })
    prefix = "!";
    // - Whitelist
    @SwitchProperty({
        name: "Enable Whitelist",
        description: "Enable or disable the whitelist feature for chat commands.",
        category: "ChatCommand",
        subcategory: "Whitelist",
    })
    enableWhitelist = false;
    @TextProperty({
        name: "Whitelist",
        description: "List of IGN to whitelist, separated by commas. Leave empty to disable the whitelist.",
        category: "ChatCommand",
        subcategory: "Whitelist",
        placeholder: "name1, name2, etc.",
    })
    whitelist= "";
    // - Blacklist 
    @SwitchProperty({
        name: "Enable Blacklist",
        description: "Enable or disable the blacklist feature for chat commands.",
        category: "ChatCommand",
        subcategory: "Blacklist",
    })
    enableBlacklist = false;
    @TextProperty({
        name: "Blacklist",
        description: "List of INGs to blacklist, separated by commas. Leave empty to disable the blacklist.",
        category: "ChatCommand",
        subcategory: "Blacklist",
        placeholder: "name1, name2, etc.",
    })
    blacklist = "";

    // General 6/6 Complete
    @SwitchProperty({ name: "help",  category: "General" }) help = true;
    @SwitchProperty({ name: "chumu", description:"ca", category: "General" }) chumu = true;
    @SwitchProperty({ name: "ping",  category: "General" }) ping = true;
    @SwitchProperty({ name: "tps",  category: "General" }) tps = true;
    @SwitchProperty({ name: "time",  category: "General" }) time = true;
    @SwitchProperty({ name: "wdr", category: "General" }) wdr = false;

    // Party 9/16 Complete
    @SwitchProperty({ name: "warp", description:"w", category: "Party" }) warp = true;
    @SwitchProperty({ name: "wt", description:"warptransfer", category: "Party" }) warptransfer = true;
    @SwitchProperty({ name: "wl", description:"warplocation warplocate", category: "Party" }) warplocate = true; // CHUMU ONLY
    @SwitchProperty({ name: "inv", description:"invite i", category: "Party" }) invite = true;
    @SwitchProperty({ name: "allinv", description:"allinvite ai", category: "Party" }) allinv = true;
    @SwitchProperty({ name: "reparty", description: "", category: "Party" }) reparty = true;
    @SwitchProperty({ name: "tr", description:"transfer trans", category: "Party" }) tr = true;
    @SwitchProperty({ name: "promote",  category: "Party" }) promote = true;
    @SwitchProperty({ name: "demote",  category: "Party" }) demote = true;
    @SwitchProperty({ name: "disband", description:"db", category: "Party" }) disband = true;
    @SwitchProperty({ name: "kick", description:"k", category: "Party" }) kick = true;
    @SwitchProperty({ name: "requeue", description:"rq", category: "Party" }) requeue = true;
    @SwitchProperty({ name: "pt", description:"ptme", category: "Party" }) pt = true;
    @SwitchProperty({ name: "dt", description:"downtime", category: "Party" }) downtime = true;
    @SwitchProperty({ name: "undt", description:"undowntime", category: "Party" }) undowntime = true;
    @SwitchProperty({ name: "Joininstace Shortcuts", decription: "Each Floor/Tier join command | usage: !(f0-7, m1-7, t1-5)", category: "Party" }) joinshortcuts = true;

    // Misc 6/6 Complete
    @SwitchProperty({ name: "coinflip", description:"cf", category: "Misc" }) coinflip = true;
    @SwitchProperty({ name: "8ball",  category: "Misc" }) eightball = true;
    @SwitchProperty({ name: "dice",  category: "Misc" }) dice = true;
    @SwitchProperty({ name: "racism",  category: "Misc" }) racism = true;
    @SwitchProperty({ name: "iq",  category: "Misc" }) iq = true;
    @SwitchProperty({ name: "issi", category: "Misc" }) issi = true;

    // Skyblock 0/10 Complete
    @SwitchProperty({ name: "location", description:"locate", category: "Misc" }) location = true;
    @SwitchProperty({ name: "holding",  category: "Misc" }) holding = true;
    @SwitchProperty({ name: "coords", description:"coord pos waypoint", category: "Skyblock" }) coords = true;
    @SwitchProperty({ name: "bank",  category: "Skyblock" }) bank = true;
    @SwitchProperty({ name: "pet",  category: "Skyblock" }) pet = true;
    @SwitchProperty({ name: "playtime", description: "", category: "Skyblock" }) playtime = true;
    @SwitchProperty({ name: "runs",  category: "Skyblock" }) runs = true;
    @SwitchProperty({ name: "secrets",  category: "Skyblock" }) secrets = true;
    @SwitchProperty({ name: "class",  category: "Skyblock" }) class = true;
    @SwitchProperty({ name: "cata",  category: "Skyblock" }) cata = true;

    constructor() {
        this.initialize(this);
    }
}

export default new chatCommandsConfig();