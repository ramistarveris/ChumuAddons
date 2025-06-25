import config from "../../../config";
import { partyMsg } from "../../../utils/Functions";
const URL = Java.type("java.net.URL");
const Scanner = Java.type("java.util.Scanner");


export default {

    uuid(player, args) {
        if (!config.uuid) return; 
        if (args.length === 0) return;
        const targetName = args[0];

        new Thread(() => {
            try {
                const url = new URL("https://api.mojang.com/users/profiles/minecraft/" + targetName);
                const connection = url.openConnection();
                const scanner = new Scanner(connection.getInputStream());
                let response = "";

                while (scanner.hasNextLine()) {
                    response += scanner.nextLine();
                }
                scanner.close();

                const match = response.match(/"id"\s*:\s*"([a-fA-F0-9]+)"/);
                const uuid = match ? match[1] : null;

                if (uuid) {
                    partyMsg(`UUID for ${targetName}: ${uuid}`)
                } else {
                    partyMsg(`Failed to fetch UUID for "${targetName}"`)
                }
            } catch (e) {
                partyMsg(`Error fetching UUID: ${e.message}`)
            }
        }).start();
    },
    
    deux(player, argsRaw) {
        if (!config.deux) return;
        const matched = argsRaw.join(" ").match(/"[^"]+"|\S+/g);
        const args = matched ? matched.map(arg => arg.replace(/^"|"$/g, "")) : null;

        if (!args || args.length < 2) {
            ChatLib.chat("§cUsage: !deux <arg1> <arg2>");
            return;
        }

        const chosen = args[Math.floor(Math.random() * 2)];
        partyMsg(`Deux: ${chosen}`);
    },

    iq(player, args) {
        if (!config.iq) return; 
        const iq = Math.floor(Math.random() * 200);
        partyMsg(`${player}'s IQ: ${iq}`);
    },

    dice(player, args) {
        if (!config.dice) return; 
        const roll = Math.floor(Math.random() * 6) + 1;
        partyMsg(`${player} rolled a ${roll}`);
    },

        rnd(player, args) {
        if (!config.rnd) return; 
        const num = Math.floor(Math.random() * 1000);
        partyMsg(`${player}'s random number: ${num}`);
    },

    math(player, args) {
        if (!config.math) return; 
        try {
            const result = eval(args.join(" "));
            partyMsg(`Result: ${result}`);
        } catch (e) {
            partyMsg("Invalid expression.");
        }
    },

    wdr(player, args) {
        if (!config.watchdogreport) return; 
        if (args.length > 0) ChatLib.command(`watchdogreport ${args.join(" ")}`);        
    },
    watchdogreport(player, args) {
        if (!config.watchdogreport) return; 
        if (args.length > 0) ChatLib.command(`wdr ${args.join(" ")}`);
    },
    
};
