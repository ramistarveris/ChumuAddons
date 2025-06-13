import { LIGHT_PURPLE, RED } from "./utils/Constants";
import { 
    @Vigilant, 
    @SwitchProperty, 
    @TextProperty, 
    @SliderProperty, 
    @ButtonProperty, 
    @SelectorProperty
} from "Vigilance";

@Vigilant("ChumuAddons", "§l§bChumu§9Addons", {
    getCategoryComparator: () => (a, b) => {
        const order = ["General", "Dungeons", "F7/M7", "Mining", "Notification", "Chat Commands", "Misc", "HUD"];
        return order.indexOf(a.name) - order.indexOf(b.name);
    },
})

class Config {

    /* ========== General ========== */

    @SwitchProperty({
        name: "Test Overlay",
        description: "Shows a test overlay",
        category: "General"
    })
    testOverlay = true;

    @ButtonProperty({
        name: "Move GUIs",
        description: "Open GUI position edit screen (/cagui)",
        category: "General"
    })
    openGUIEditor() {
        ChatLib.command("cagui", true);
    }

    @SwitchProperty({
        name: "Autopet Display",
        description: "Show title when autopet rule is triggered",
        category: "General",
    })
    autopetDisplay = false;

    @SwitchProperty({
        name: "Legion Counter",
        description: "Enable Legion overlay (players nearby)",
        category: "General",
    })
    legionCounter = false;

    /* ========= Dungeons ========== */
    @SwitchProperty({
        name: 'Bat Dead Title',
        description: 'Display Bat Dead when bat dead.',
        category: 'Dungeons',
    })
    batDead = false;
    @SwitchProperty({
        name: "Shadow Assassin Jamping",
        description: "!!WARNIN!! SA TELEPORTING YOU!!!",
        category: "Dungeons",
    })
    saJumping = false;

    // Dungeon - Crypt Reminder
    // > Toggle Crypt Reminder
    @SwitchProperty({
        name: "Crypt Reminder",
        description: "Enable the crypt reminder feature in dungeons.",
        category: "Dungeons",
        subcategory: "Crypt Reminder"
    })
    cryptReminder = false;
    // > Remind Time
    @SliderProperty({
        name: "Reminder Interval",
        description: "How often (in seconds) to remind if crypts are missing",
        category: "Dungeons",
        subcategory: "Crypt Reminder",
        min: 15,
        max: 120,
    })
    cryptReminderInterval = 60;
    // > Display Missing Crypt Amount
    @SwitchProperty({
        name: "Missing Crypts Title",
        description: "Show a title with the amount of missing crypts.",
        category: "Dungeons",
        subcategory: "Crypt Reminder",
    })
    cryptReminderTitle = true;
    // > Send Missing Crypts
    @SwitchProperty({
        name: "Send Missing Crypts",
        description: "Announce the amount of missing crypts in party chat.",
        category: "Dungeons",
        subcategory: "Crypt Reminder",
    })
    sendMissingCrypts = true;
    
    // > Display Crypt Done
    @SwitchProperty({
        name: "Crypt Done",
        description: "Display message when Crypt reaches 5",
        category: "Dungeons",
        subcategory: "Crypt Reminder",
    })
    cryptDoneTitle = true;
    // > Send Crypt Done
    @SwitchProperty({
        name: "Send Crypt Done",
        description: "Send party message when Crypt reaches 5",
        category: "Dungeons",
        subcategory: "Crypt Reminder",
    })
    sendCryptDone = true;

    // Dungeon - Leap
    @SwitchProperty({
        name: 'Leap Announce',
        description: 'Says in party chat who you are leaping to.',
        category: 'Dungeons',
        subcategory: 'Leap'
    })
    leapAnnounce = false
    @SelectorProperty({
        name: 'Hide Leap Messages',
        description: 'Hides leap messages when:',
        category: 'Dungeons',
        subcategory: 'Leap',
        options: ['Never', 'Hide Own', 'Hide Others', 'Always'],
    })
    hideLeap = 0;

    // Dungeon - Mimic
    // > Mimic Chest
    @SwitchProperty({
        name: "Mimic Chest Highlight",
        description: "Highlight TrapChest in Dungeon",
        category: "Dungeons",
        subcategory: "Mimic"
    })
    mimicChestHighlight = false;
    @SwitchProperty({
        name: "&dEnable ESP Mimic Chest",
        description: "Mimic Chest can be highlighted through walls",
        category: "Dungeons",
        subcategory: "Mimic"
    })
    mimicChestESP = false;
    @TextProperty({
        name: "Mimic Chest Color",
        description: "Color used for Mimic Chest ESP (You must reload to make changes)",
        category: "Dungeons",
        subcategory: "Mimic"
    })
    mimicChestColor = "#ff0000";
    // > Mimic Dead
    @SwitchProperty({
        name: 'Send Mimic Dead Message',
        description: `Send Mimic Dead! on detected mimic killed.\n ※ Forge mod specs recommended! \n${LIGHT_PURPLE}[WIP] ${RED}Does not work!`,
        category: 'Dungeons',
        subcategory: 'Mimic'
    })
    mimicDead = false;
    
    // > Immunity Cooldown
    @SwitchProperty({
        name: 'Display Mask/Pet Activated',
        description: 'Displayed on screen when Mask/Pet activated',
        category: 'Dungeons',
        subcategory: 'Immunity Cooldown'
    })
    displayMaskActive = false;
    @SwitchProperty({
        name: 'Send Mask/Pet Activated',
        description: 'Send a party message when Mask/Pet is activated',
        category: 'Dungeons',
        subcategory: 'Immunity Cooldown'
    })
    sendMaskActive = false;
    @SwitchProperty({
        name: 'Display Mask/Pet Cooldown Announce',
        description: 'Show Mask/Pet cooldown in chat',
        category: 'Dungeons',
        subcategory: 'Immunity Cooldown'
    })
    displayMaskCooldown = false;
    @SelectorProperty({
        name: 'Select Cooldown Announce Sound',
        description: 'Sound played when Mask/Pet cooldown is announced',
        category: 'Dungeons',
        subcategory: 'Immunity Cooldown',
        options: [
            "none",
            "Custom",
            "note.pling",
            "note.bass",
            "note.bassattack",
            "note.bd",
            "note.harp",
            "note.hat",
            "note.snare",
        ]
    })
    maskCooldownSound = 2;
    @TextProperty({
        name: 'Custom Cooldown Announce Sound',
        description: 'Used if "Custom" is selected in Cooldown Announce Sound \nClick List of Sounds to specify sounds',
        category: 'Dungeons',
        subcategory: 'Immunity Cooldown',
    })
    CustomMaskCooldownSound = "random.anvil_land";
    @ButtonProperty({
        name: 'List of Sounds',
        description: 'Click to print the list of sounds URL to chat.',
        category: 'Dungeons',
        subcategory: 'Immunity Cooldown'
    })
    openSoundList() {
        ChatLib.chat("&bSound List:\nhttps://www.minecraftforum.net/forums/mapping-and-modding-java-edition/mapping-and-modding-tutorials/2213619-1-8-all-playsound-sound-arguments");
    }
    @SwitchProperty({
        name: 'Mask/Pet Cooldown HUD',
        description: 'Show Mask/Pet cooldown on HUD',
        category: 'Dungeons',
        subcategory: 'Immunity Cooldown'
    })
    displayMaskCooldownHUD = false;

    // each Floor
    // F3/M3
    @SwitchProperty({
        name: "Fire Freeze Notifier",
        description: "Show when to use FireFreeze in M3.",
        category: "Dungeons",
        subcategory: "Boss"
    })
    fireFreezeNotifier = false;

    // F5
    @SwitchProperty({
        name: "Livid vuln Timer",
        description: "Display the timer until Ice Spray can be used on Livid.",
        category: "Dungeons",
        subcategory: "Dedicated to each floor"
    })
    lividVulnTimer = false;

    // F6/M6

    /* ===== F7/M7 ====== */
    // > terminal - labels (Credits: MeowAddons)
    @SwitchProperty({
        name: 'Display Terminal Number',
        description: 'Displays the terminal number in front of the terminal',
        category: 'F7\/M7',
        subcategory: 'P3'
    })
    displayTermNumber = false;
    @SwitchProperty({
        name: "Display Terminal Class",
        description: 'Display each class name in front of terminal',
        category: 'F7\/M7',
        subcategory: 'P3'
    })
    displayTermClass = false;
    @SwitchProperty({
        name: "Display Device",
        description: "Displays the location of the device",
        category: 'F7\/M7',
        subcategory: 'P3'
    })
    displayDevice = false;
    @SliderProperty({
        name: 'Display Class Distance',
        description: 'Distance at which class name is displayed',
        category: 'F7\/M7',
        subcategory: 'P3',
        min: 0,
        max: 15
    })
    displayClassDistance = 14;

    // > Wither Box
    @SwitchProperty({
        name: 'Wither Box',
        description: 'Highlight Boss Witherlords',
        category: 'F7\/M7',
        subcategory: 'General'
    })
    witherBox = false;
    @SwitchProperty({
        name: '&dEnable ESP Wither Box',
        description: 'Enable Wither Box ESP',  
        category: 'F7\/M7',
        subcategory: 'General'
    })
    witherBoxESP = false;

    /* ===== Mining ===== */
    @SwitchProperty({
        name: 'Is old Server?',
        description: 'You can check how many days have passed since this server was created',
        category: 'Mining',
    })
    isOldServer = false;

    /* ===== Misc ===== */
    @SwitchProperty({
        name: 'Shattap Watcher',
        description: 'Disable watcher music only',
        category: 'Misc'
    })
    shattapWatcher = false;

    /* ===== Notification ===== */
    @SwitchProperty({
        name: "Party Finder Notifier",
        description: 'Send party finder notifications (Windows Notification)',
        category: 'Notification',
    })
    partyFinderNotifier = false;

    /* ===== Chat Commands ===== */
    @SwitchProperty({
        name: "Toggle Chat Commands",
        description: 'Enables the use of chat commands',
        category: 'Chat Commands',
    })
    toggleChatCommands = true;
    @TextProperty({
        name: 'Prefix',
        description: 'Change chat command prefix\nDefault prefix is \"!\". Ex: !help, !inv\nUse commas without spaces to specify multiple prefixes\n',
        category: 'Chat Commands',
    })
    prefix = "!";
    @TextProperty({
        name: "Blacklist",
        description: "Enter the users you wish to add to your Blacklist, \nSeparated by a single space \n(e.g. CatGirlNecron Femboy_Sadan Okinaw_a)",
        category: 'Chat Commands'
    })
    blacklist = "";
    @TextProperty({
        name: "Whitelist",
        description: "Enter the users you wish to add to your Whitelist, \nSeparated by a single space \n(e.g. JerryChan Haai NaN NigaSky)",
        category: 'Chat Commands'
    })
    whitelist = "";
    
    // @SwitchProperty({
    //    name: 'Black List',
    //    description: '/ca bl (add/remove)',
    //    category: 'Chat Commands'
    // })
    // blacklist = false;
    
    // @SwitchProperty({
    //    name: 'White List',
    //    description: '/ca wl (add/remove)',
    //    category: 'Chat Commands'
    // })
    // whitelist = false;
    
    // Commands
    @SwitchProperty({
        name: 'help',
        description: 'Send ChatCommads help.',
        category: 'Chat Commands',
        subcategory: 'General'
    })
    help = true;
    @SwitchProperty({
        name: 'ping',
        description: '',
        category: 'Chat Commands',
        subcategory: 'General'
    })
    ping = true;
    @SwitchProperty({
        name: 'tps',
        description: '',
        category: 'Chat Commands',
        subcategory: 'General'
    })
    tps = true;
    @SwitchProperty({
        name: 'coords', 
        description: '',
        category: 'Chat Commands',
        subcategory: 'General'
    })
    coords = true;

    // Party
    @SwitchProperty({
        name: 'inv', // /p invite <mcid>
        description: '!inv <mcid> (/p invite <mcid>)',
        category: 'Chat Commands',
        subcategory: 'Party'
    })
    inv = true;
    @SwitchProperty({
        name: 'allinv', // /p setting allinvite
        description: '!allinv (/p setting allinvite)',
        category: 'Chat Commands',
        subcategory: 'Party'
    })
    allinv = true;
    @SwitchProperty({
        name: 'tr',
        description: '!tr <mcid> (/p transfer <mcid>) \n(Aliases: pt)',
        category: 'Chat Commands',
        subcategory: 'Party'
    })
    tr = true;
    @SwitchProperty({
        name: 'ptme',
        description: '!ptme (Party Leader Exec: /p transfer <yourID>)',
        category: 'Chat Commands',
        subcategory: 'Party'
    })
    ptme = true;
    @SwitchProperty({
        name: 'pm', // /p promote <mcid>
        description: '!pm <mcid> (/p promote <mcid>)',
        category: 'Chat Commands',
        subcategory: 'Party'
    })
    pm = true;
    @SwitchProperty({
        name: 'warp',
        description: '!warp (/p warp)',
        category: 'Chat Commands',
        subcategory: 'Party'
    })
    warp = true;
    @SwitchProperty({
        name: 'kick',
        description: '!kick <mcid> (/p kick <mcid>)',
        category: 'Chat Commands',
        subcategory: 'Party'
    })
    kick = true;
    @SwitchProperty({
        name: 'db',
        description: '!db (/p disband)',
        category: 'Chat Commands',
        subcategory: 'Party'
    })
    db = true;
    @SwitchProperty({
        name: 'dt',
        description: '!dt <text:reason> \nRequest down time from party leader\nIf Dungeon Requeue is turned on, Dugeon Requeue on that Run will not run automatically.',
        category: 'Chat Commands',
        subcategory: 'Party'
    })
    dt = true;
    @SwitchProperty({
        name: 'cdt',
        description: '!cdt \nIf you had sent "!dt", cancel it',
        category: 'Chat Commands',
        subcategory: 'Party'
    })
    cdt = true;
    @SwitchProperty({
        name: 'requeue',
        description: '!requeue <number:time(s)>\nTemporarily change the Dungeon Requeue time\nSettings will be carried over to the next run',
        category: 'Chat Commands',
        subcategory: 'Party'
    })
    requeue = true;

    // Misc
    @SwitchProperty({
        name: "uuid",
        description: "test",
        category: "Chat Commands",
        subcategory: "Misc"
    })
    uuid = true;
    @SwitchProperty({
        name: "deux",
        description: "Randomly returns one of the two arguments; use quotes to include spaces (e.g. !deux \"stay home\" \"destroy school\")",
        category: "Chat Commands",
        subcategory: "Misc"
    })
    deux = true;
    @SwitchProperty({
        name: "iq",
        description: "",
        category: "Chat Commands",
        subcategory: "Misc"
    })
    iq = true;
    @SwitchProperty({
        name: "dice",
        description: "",
        category: "Chat Commands",
        subcategory: "Misc"
    })
    dice = true;
    @SwitchProperty({
        name: "rnd",
        description: "(e.g. !rnd tax tox tix) = tix",
        category: "Chat Commands",
        subcategory: "Misc"
    })
    rnd = true;
    @SwitchProperty({
        name: "math",
        description: "",
        category: "Chat Commands",
        subcategory: "Misc"
    })
    math = true;
    @SwitchProperty({
        name: "watchdogreport",
        description: "!watchdogreport <mcid> (Aliases: wdr)",
        category: "Chat Commands",
        subcategory: "Misc"
    })
    watchdogreport = true;

    // JoinInstance Shortcut
    @SwitchProperty({
        name: "JoinInstance Shortcuts",
        description: "Enables the !f1, !m3, !t5 etc. to run /joininstance",
        category: "Chat Commands",
        subcategory: "Party - JoinInstance"
    })
    joininstance = true;

    constructor() {
        this.initialize(this);

        this.addDependency("Reminder Interval", "Crypt Reminder");
        this.addDependency("Send Missing Crypts", "Crypt Reminder");
        this.addDependency("Missing Crypts Title", "Crypt Reminder");

        this.addDependency("&dEnable ESP Mimic Chest", "Mimic Chest Highlight");
        this.addDependency("Mimic Chest Color", "Mimic Chest Highlight");
        this.addDependency("&dEnable ESP Wither Box", "Wither Box");

        this.addDependency("Select Cooldown Announce Sound", "Display Mask/Pet Cooldown Announce");
        this.addDependency("Custom Cooldown Announce Sound", "Display Mask/Pet Cooldown Announce");
        this.addDependency("List of Sounds", "Display Mask/Pet Cooldown Announce");
    }
}


export default new Config(); 