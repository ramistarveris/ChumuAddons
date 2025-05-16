import SwitchElement from "../DocGuiLib/elements/Switch";
import { 
  @Vigilant, 
  @SwitchProperty, 
  @TextProperty, 
  @SliderProperty, 
  @ButtonProperty, 
  @SelectorProperty } from "Vigilance";

@Vigilant("ChumuAddons", "§l§bChumu§9Addons", {
    getCategoryComparator: () => (a, b) => {
        const order = ["General", "HUD", "Dungeons", "F7/M7"];
        return order.indexOf(a.name) - order.indexOf(b.name);
    },
})

class Config {

  /* ========== General ========== */

  // test
  @SwitchProperty({
    name: "test",
    description: "test",
    category: "General"
  })
  testSwitch = false;
  
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

  // Crypt Reminder
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
    min: 5,
    max: 120,
  })
  cryptReminderInterval = 60;

  @SwitchProperty({
    name: "Announce Crypts",
    description: "Announce the amount of missing crypts in party chat.",
    category: "Dungeons",
    subcategory: "Crypt Reminder",
  })
  cryptReminderAnnounce = true;

  @SwitchProperty({
    name: "Missing Crypts Title",
    description: "Show a title with the amount of missing crypts.",
    category: "Dungeons",
    subcategory: "Crypt Reminder",
  })
  cryptReminderPopup = true;

  // Leap Annouce
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
    description: 'Change the color of the trap(Mimic) chest',
    category: 'Dungeons',
    subcategory: 'Mimic'
  })
  mimicChest = false;

  @SwitchProperty({
    name: 'Send Mimic Dead Message',
    description: 'Send Mimic Dead! on detected mimic killed.',
    category: 'Dungeons',
    subcategory: 'Mimic'
  })
  mimicDead = false;

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

  constructor() {
    this.initialize(this);

    this.addDependency("Reminder Interval", "Crypt Reminder");
    this.addDependency("Announce Crypts", "Crypt Reminder");
    this.addDependency("Missing Crypts Title", "Crypt Reminder");
  }
}

export default new Config();  