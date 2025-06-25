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
        const order = ["ChatCommand", "General", "Party", "Misc"];
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

    // - ↓ Fuckin Chat Commands ↓

    constructor() {
        this.initialize(this);
    }
}

export default new chatCommandsConfig();