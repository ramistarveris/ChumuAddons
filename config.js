import { LIGHT_PURPLE, RED } from "./utils/Constants";
import { 
    @Vigilant, 
    @SwitchProperty, 
    @TextProperty, 
    @SliderProperty, 
    @ButtonProperty, 
    @SelectorProperty } from "Vigilance";

@Vigilant("ChumuAddons", "§l§bChumu§9Addons", {
    getCategoryComparator: () => (a, b) => {
        const order = ["General", "Chat Commands", "Dungeons", "F7/M7", "HUD"];
        return order.indexOf(a.name) - order.indexOf(b.name);
    },
})

class Config {

  /* ========== General ========== */

  // Custom Chat Message
  @TextProperty({
    name: "Custom Message",
    description: "Message to send when triggered",
    category: "General",
    subcategory: "Custom Chat",
  })
  customMessage = "what the test message";

  @SelectorProperty({
    name: "Chat Channel",
    description: "Channel to send the message to",
    category: "General",
    subcategory: "Custom Chat",
    options: ["All Chat", "Party Chat", "Guild Chat"],
  })
  chatChannel = 0;

  @ButtonProperty({
    name: "Send Custom Message",
    description: "Send the message manually",
    category: "General",
    subcategory: "Custom Chat",
  })
  sendNowButton() {
    this.shouldSend = true;
  }
  
  // Notifications
  @SwitchProperty({
    name: "Autopet Display",
    description: "Show title when autopet rule is triggered",
    category: "General",
    subcategory: "Notifications",
  })
  autopetDisplay = false;

  // HUD(GUIs)
  @SwitchProperty({
    name: "Legion Counter",
    description: "Enable Legion overlay (players nearby)",
    category: "General",
    subcategory: "HUD",
  })
  legionCounter = false;

  /* ========= Dungeons ========== */

  // *** Crypt Reminder ***
  // Toggle Crypt Reminder
  @SwitchProperty({
    name: "Crypt Reminder",
    description: "Enable the crypt reminder feature in dungeons.",
    category: "Dungeons",
    subcategory: "Crypt Reminder"
  })
  cryptReminder = false;

  // Remind Time
  @SliderProperty({
    name: "Reminder Interval",
    description: "How often (in seconds) to remind if crypts are missing",
    category: "Dungeons",
    subcategory: "Crypt Reminder",
    min: 15,
    max: 120,
  })
  cryptReminderInterval = 60;

  // Display Missing Crypt Amount
  @SwitchProperty({
    name: "Missing Crypts Title",
    description: "Show a title with the amount of missing crypts.",
    category: "Dungeons",
    subcategory: "Crypt Reminder",
  })
  cryptReminderTitle = true;

  // Send Missing Crypts
  @SwitchProperty({
    name: "Send Missing Crypts",
    description: "Announce the amount of missing crypts in party chat.",
    category: "Dungeons",
    subcategory: "Crypt Reminder",
  })
  sendMissingCrypts = true;

  // *** Crypt Done ***
  // Display Crypt Done
  @SwitchProperty({
    name: "Crypt Done",
    description: "Display message when Crypt reaches 5",
    category: "Dungeons",
    subcategory: "Crypt Reminder",
  })
  cryptDoneTitle = true;

  // Send Crypt Done
  @SwitchProperty({
    name: "Send Crypt Done",
    description: "Send party message when Crypt reaches 5",
    category: "Dungeons",
    subcategory: "Crypt Reminder",
  })
  sendCryptDone = true;

  // *** Leap Annouce ***
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

  // Mimic
  @SwitchProperty({
    name: 'Hightlight Mimic Chest',
    description: `Change the color of the trap(Mimic) chest \n ${LIGHT_PURPLE}[WIP] ${RED}Does not work!`,
    category: 'Dungeons',
    subcategory: 'Mimic'
  })
  mimicChest = false;

  @SwitchProperty({
    name: 'Send Mimic Dead Message',
    description: `Send Mimic Dead! on detected mimic killed.\n ※ Forge mod specs recommended! \n${LIGHT_PURPLE}[WIP] ${RED}Does not work!`,
    category: 'Dungeons',
    subcategory: 'Mimic'
  })
  mimicDead = false;

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


  // ===== F7/M7 ======
  @SwitchProperty({
    name: 'Terminal Number Label',
    description: 'Shows terminal number that belongs to the terminal',
    category: 'F7\/M7',
    subcategory: 'P3'
  })
  showTerm = false;

  @SwitchProperty({
    name: "Terminal Class Label",
    description: 'Displays the class on each terminal',
    category: 'F7\/M7',
    subcategory: 'P3'
  })
  termLabel = false

  @SliderProperty({
    name: 'Label class distance',
    description: 'Distance at which the class label will be shown',
    category: 'F7\/M7',
    subcategory: 'P3',
    min: 0,
    max: 15
  })
  termLabelClassDistance = 14;


  // Misc
  @SwitchProperty({
    name: 'Bat Dead Title',
    description: 'Display Bat Dead when bat dead.',
    category: 'Dungeons',
    subcategory: 'Misc'
  })
  batDead = false;
  
  /* ===== HUD ===== */
  @ButtonProperty({
    name: "Move HUD",
    description: "Open the Chumu HUD editor",
    category: "HUD"
  })
  chumumovehud() {
    ChatLib.command("chumuhud");
  }

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
  // name: 'Black List',
  // description: '/ca bl (add/remove)',
  // category: 'Chat Commands'
  // })
  // blacklist = false;
   
  // @SwitchProperty({
  //   name: 'White List',
  //   description: '/ca wl (add/remove)',
  //   category: 'Chat Commands'
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
    name: 'kick', // /p kick <mcid>
    description: '!kick <mcid> (/p kick <mcid>)',
    category: 'Chat Commands',
    subcategory: 'Party'
  })
  kick = true;

  @SwitchProperty({
    name: 'db', // /p disband
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
  }
}


export default new Config(); 