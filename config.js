import { LIGHT_PURPLE, RED } from "./utils/Constants";
import {
    @Vigilant,
    @SwitchProperty,
    @TextProperty,
    @SliderProperty,
    @ButtonProperty,
    @ColorProperty,
    Color,
    @SelectorProperty
} from "Vigilance";
import chatCommandsConfig from "./features/ChatCommands/config";

@Vigilant("ChumuAddons", "§l§bChumu§9Addons", {
    getCategoryComparator: () => (a, b) => {
        const order = ["General", "Dungeons", "F7/M7", "Mining", "Notification", "Chat Commands", "Misc", "HUD"];
        return order.indexOf(a.name) - order.indexOf(b.name);
    },
})

class Config {
    // ========== General ==========

    @ButtonProperty({
        name: "Open GUI Editor",
        description: "Open HUD positions edit screen (/cagui)",
        category: "General",
        subcategory: "Overlays",
        placeholder: "EDIT"
    })
    openGUIEditor() {
        ChatLib.command("cagui");
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

    @SwitchProperty({
        name: "Speed Overlay",
        description: "Enable display of your speed status",
        category: "General",
    })
    speedOverlay = false;

    // ========== Dungeons ==========

    @SwitchProperty({
        name: 'Bat Dead Title',
        description: 'Display Bat Dead when bat dead.',
        category: 'Dungeons',
    })
    batDead = false;

    // Shadow Assassin
    @SwitchProperty({ 
        name: "Shadow Assassin Jamping",
        description: "!!WARNIN!! SA TELEPORTING YOU!!!",
        category: "Dungeons",
        subcategory: "Shadow Assassin"
    })
    saJumping = false;
    @SwitchProperty({
        name: "> Use Custom Sound (SA)",
        description: "Play a custom sound when SA jumps.",
        category: "Dungeons",
        subcategory: "Shadow Assassin"
    })
    saUseCustomSound = false;
    @TextProperty({
        name: ">> Custom Sound Name (SA)",
        description: "Specify the sound name (e.g., mob.wither.spawn).",
        category: "Dungeons",
        subcategory: "Shadow Assassin"
    })
    saCustomSoundName = "random.orb";
    @TextProperty({
        name: ">> Custom Sound Volume (SA)",
        description: "Set the volume of the custom sound (0.0 - 1.0).",
        category: "Dungeons",
        subcategory: "Shadow Assassin",
    })
    saCustomSoundVolume = "1";
    @TextProperty({
        name: ">> Custom Sound Pitch (SA)",
        description: "Set the pitch of the custom sound (0.5 - 2).",
        category: "Dungeons",
        subcategory: "Shadow Assassin"
    })
    saCustomSoundPitch = "1";
    @SliderProperty({
        name: ">> Custom Sound Repeat (SA)",
        description: "How many times to repeat the custom sound.",
        category: "Dungeons",
        subcategory: "Shadow Assassin",
        min: 1,
        max: 10
    })
    saCustomSoundRepeat = 1;

    // > Dungeon Requeue
    @SwitchProperty({
        name: "Enable Dungeon Requeue",
        description: "After the dungeon ends, a new dungeon is automatically restarted",
        category: "Dungeons",
        subcategory: "Dungeon Requeue",
    })
    toggleDungeonRequeue = false;
    @SliderProperty({
        name: "Delay",
        description: "Delay time to requeue (seconds)",
        category: "Dungeons",
        subcategory: "Dungeon Requeue",
        min: 0,
        max: 30,
    })
    dungeonRequeueDelay = 10;
    @SwitchProperty({
        name: "Disable on Leave/Kick",
        description: "Stop the next recue function if someone leaves the party or kicks",
        category: "Dungeons",
        subcategory: "Dungeon Requeue",
    })
    dungeonRequeueAutoDisable = true;
    @SwitchProperty({
        name: "Enable Requeue Delay Command",
        description: "Extend delay if Requeue command is executed\nCommand Usage: !rq <seconds>",
        category: "Dungeons",
        subcategory: "Dungeon Requeue",
    })
    dungeonRequeueRequeueCommand = true;

    // > Starred Mob
    @SwitchProperty({
        name: "Starred Mob Highlight",
        description: "Highlights starred mobs in dungeons.\n",
        category: "Dungeons",
    })
    starredMob = false;
    @ColorProperty({
        name: 'Starred Mob Highlight Color',
        description: 'Pick up a color for the starred mob highlight.',
        category: 'Dungeons',
    })
    starredMobColor = Color.BLUE;

    // > Key Highlight
    @SwitchProperty({
        name: "Key Highlight",
        description: "Highlights the Wither&Blood Key in dungeons",
        category: "Dungeons",
        subcategory: "Key"
    })
    keyHighlight = false;
    @ColorProperty({
        name: "Wither Key Color",
        description: "Color of the Wither Key highlight",
        category: "Dungeons",
        subcategory: "Key"
    })
    keyHighlightColorWither = Color.BLACK;
    @ColorProperty({
        name: "Blood Key Color",
        description: "Color of the Blood Key highlight",
        category: "Dungeons",
        subcategory: "Key"
    })
    keyHighlightColorBlood = Color.RED;

    // > Crypt Reminder
    @SwitchProperty({
        name: "Crypt Reminder",
        description: "Enable the crypt reminder feature in dungeons.",
        category: "Dungeons",
        subcategory: "Crypt Reminder"
    })
    cryptReminder = false;
    @SliderProperty({
        name: "Reminder Interval",
        description: "How often (in seconds) to remind if crypts are missing",
        category: "Dungeons",
        subcategory: "Crypt Reminder",
        min: 15,
        max: 120,
    })
    cryptReminderInterval = 60;
    @SwitchProperty({
        name: "Missing Crypts Title",
        description: "Show a title with the amount of missing crypts.",
        category: "Dungeons",
        subcategory: "Crypt Reminder",
    })
    cryptReminderTitle = true;
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

    // > Leap
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

    // > Mimic
    @SwitchProperty({
        name: "Mimic Chest Highlight",
        description: "Highlight TrapChest in Dungeon",
        category: "Dungeons",
        subcategory: "Mimic"
    })
    mimicChestHighlight = false;
    @ColorProperty({
        name: "Mimic Chest Color",
        description: "Color used for Mimic Chest",
        category: "Dungeons",
        subcategory: "Mimic"
    })
    mimicChestColor = Color.RED;
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
        description: 'Click to open the list of sounds URL in your browser.',
        category: 'Dungeons',
        subcategory: 'Immunity Cooldown',
        placeholder: 'CLICK'
    })
    openSoundList() {
        java.awt.Desktop.getDesktop().browse(new java.net.URI("https://www.minecraftforum.net/forums/mapping-and-modding-java-edition/mapping-and-modding-tutorials/2213619-1-8-all-playsound-sound-arguments"));
        return;
    }
    @SwitchProperty({
        name: 'Mask/Pet Cooldown HUD',
        description: 'Show Mask/Pet cooldown on HUD',
        category: 'Dungeons',
        subcategory: 'Immunity Cooldown'
    })
    displayMaskCooldownHUD = false;

    // > Boss
    @SwitchProperty({
        name: "Fire Freeze Notifier",
        description: "Show when to use FireFreeze in M3.",
        category: "Dungeons",
        subcategory: "Boss"
    })
    fireFreezeNotifier = false;

    // > Dedicated to each floor
    @SwitchProperty({
        name: "Livid vuln Timer",
        description: "Display the timer until Ice Spray can be used on Livid.",
        category: "Dungeons",
        subcategory: "Dedicated to each floor"
    })
    lividVulnTimer = false;

    // ========== F7/M7 ==========

    // > P3
    @SwitchProperty({
        name: 'Display Terminal Number',
        description: 'Displays the terminal number in front of the terminal',
        category: 'F7/M7',
        subcategory: 'P3'
    })
    displayTermNumber = false;
    @SwitchProperty({
        name: "Display Terminal Class",
        description: 'Display each class name in front of terminal',
        category: 'F7/M7',
        subcategory: 'P3'
    })
    displayTermClass = false;
    @SwitchProperty({
        name: "Display Device",
        description: "Displays the location of the device",
        category: 'F7/M7',
        subcategory: 'P3'
    })
    displayDevice = false;
    @SliderProperty({
        name: 'Display Class Distance',
        description: 'Distance at which class name is displayed',
        category: 'F7/M7',
        subcategory: 'P3',
        min: 0,
        max: 15
    })
    displayClassDistance = 14;
    // > General
    @SwitchProperty({
        name: 'Wither Box',
        description: 'Highlight Boss Witherlords',
        category: 'F7/M7',
        subcategory: 'General'
    })
    witherBox = false;
    @ColorProperty({
        name: 'Wither Box Color',
        description: "Color uses wither box",
        category: "F7/M7",
        subcategory: "General"
    })
    colorWitherBox = Color.RED;

    // ========== Mining ==========

    // ========== Misc ==========

    @SwitchProperty({
        name: 'Shattap Watcher',
        description: 'Disable watcher music only',
        category: 'Misc'
    })
    shattapWatcher = false;
    @SwitchProperty({
        name: "World Age",
        description: "Display worldDisplays the number of days elapsed in the world",
        category: "Misc"
    })
    worldAge = false;

    // ========== Notification ==========

    @SwitchProperty({
        name: "Party Finder Notifier",
        description: 'Send party finder notifications (Windows Notification)',
        category: 'Notification',
    })
    partyFinderNotifier = false;
    @SwitchProperty({
        name: "Party Invite Notifier",
        description: "When you recieved party invite, send windows notification",
        category: "Notification",
    })
    partyInviteNotifier = false;

    // ========== Chat Commands ==========

    @ButtonProperty({
        name: "Open Chat Commands Config",
        description: "Open the Chat Commands GUI.",
        category: "Chat Commands"
    })
    openChatCommandsConfig() {
        chatCommandsConfig.openGUI();
    }

    constructor() {
        this.initialize(this);

        this.addDependency("Reminder Interval", "Crypt Reminder");
        this.addDependency("Send Missing Crypts", "Crypt Reminder");
        this.addDependency("Missing Crypts Title", "Crypt Reminder");
        this.addDependency("Mimic Chest Color", "Mimic Chest Highlight");

        this.addDependency("Select Cooldown Announce Sound", "Display Mask/Pet Cooldown Announce");
        this.addDependency("Custom Cooldown Announce Sound", "Display Mask/Pet Cooldown Announce");
        this.addDependency("List of Sounds", "Display Mask/Pet Cooldown Announce");
    }


}

export default new Config();
