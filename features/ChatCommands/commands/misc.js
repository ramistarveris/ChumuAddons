import { partyMsg } from "../../../utils/Functions.js";
import chatCommandsConfig from "../config.js";

const case8ball = [
    // Credits: Odin
    "It is certain", "It is decidedly so", "Without a doubt",
    "Yes definitely", "You may rely on it", "As I see it, yes",
    "Most likely", "Outlook good", "Yes", "Signs point to yes",
    "Reply hazy try again", "Ask again later", "Better not tell you now",
    "Cannot predict now", "Concentrate and ask again", "Don't count on it",
    "My reply is no", "My sources say no", "Outlook not so good", "Very doubtful"
];

function getIssiEval(amount) {
    if (amount <= 50) return "noob!";
    else if (amount <= 250) return "destroy more!";
    else if (amount <= 500) return "nice crasher!";
    else if (amount <= 1000) return "it's explosive!";
    else if (amount <= 1500) return "Certified ISSI Warlord";
    else if (amount <= 1750) return "Certified ISSI Master";
    else if (amount <= 2000) return "You are the issi session's nightmare!";
    else if (amount <= 3000) return "You nuked the lobby";
    else if (amount <= 4000) return "It's just like diarrhea";
    else if (amount <= 5000) return "Mayhem incarnate";
    else if (amount <= 6000) return "The server is beyond repair";
    else if (amount <= 7000) return "Rockstar is watching you";
    else if (amount <= 8000) return "Humanity wasn't ready for this";
    else if (amount <= 9000) return "You ascended into ISSI godhood";
    else if (amount <= 9250) return "Lake Ikeda is already full";
    else if (amount <= 9500) return "He was born to crash";
    else if (amount <= 9750) return "This is impossible unless you crush it with your hip";
    else if (amount <= 9998) return "RARE DROP! ISSI DYE (+225% 🚗 Scrap Find!)";
    else return "How did you get here?!";
}

function sendISSI() {
    const amount = Math.floor(Math.random() * 10000);
    const evaluation = getIssiEval(amount);
    return `You crashed ${amount} oissis, ${evaluation}`;
}

export default function (player, command, args) {
    ChatLib.chat(`[DEBUG] misc.js: command=${command}, args=${args.join(" ")}`);
    switch (command) {
        case "coinflip":
        case "cf":
            if (!chatCommandsConfig.coinflip) return true;
            const result = Math.random() < 0.5 ? "Heads" : "Tails";
            partyMsg(result);
            return true;

        case "8ball":
            if (!chatCommandsConfig.eightball) return true;
            const res = case8ball[Math.floor(Math.random() * case8ball.length)];
            partyMsg(res);
            return true;

        case "dice":
            if (!chatCommandsConfig.dice) return true;
            const num = Math.floor(Math.random() * 6) + 1;
            partyMsg(num);
            return true;

        case "racism":
            if (!chatCommandsConfig.racism) return true;
            const percent = Math.floor(Math.random() * 100) + 1;
            partyMsg(`${player} is ${percent}% racist. Racism is not allowed?`);
            return true;

        case "iq":
            if (!chatCommandsConfig.iq) return true;
            const iq = Math.floor(Math.random() * 151);
            partyMsg(`${player}'s IQ: ${iq}`);
            return true;

        case "issi":
            if (!chatCommandsConfig.issi) return true;
            partyMsg(sendISSI());
            return true;
    }
    return false;
}
