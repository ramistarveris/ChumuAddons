import config from "../../config";
import { BOLD, DARK_AQUA, GREEN, LIGHT_PURPLE, RED, YELLOW } from "../../utils/Constants";
import { partyMsg, modMsg } from "../../utils/Functions";
import { Render2D } from "../../../tska/rendering/Render2D";

function playCooldownSound() {
    if (!config.displayMaskCooldown) return;

    let selected = config.maskCooldownSound;
    if (selected === 0) return; // none
    if (selected === 1) {
        // Custom
        World.playSound(config.CustomMaskCooldownSound, 1, 1.5);
    } else {
        // Predefined options (index 2~)
        const sounds = [
            null,
            null,
            "note.pling",
            "note.bass",
            "note.bassattack",
            "note.bd",
            "note.harp",
            "note.hat",
            "note.snare"
        ];
        const soundToPlay = sounds[selected];
        if (soundToPlay) World.playSound(soundToPlay, 1, 1.5);
    }
}

function activate(cooldown, name, color) {
    // Display Mask/Pet Active
    if (config.displayMaskActive) {
        Render2D.showTitle(`${color}${name} ${GREEN}Activated!`, "", 1200);
    }

    // Send Active Party Message
    if (config.sendMaskActive) {
        partyMsg(`ChumuAddons ➸ ${name} Activated!`);
    }

    // Cooldown Announce
    if (config.displayMaskCooldown) {
        modMsg(`${color}${name} ${GREEN}Activated! ${DARK_AQUA}(CD: ${cooldown}s)`);
    }

    // 30s
    if (config.displayMaskCooldown && cooldown > 30) {
        setTimeout(() => {
            modMsg(`${color}${name} ${DARK_AQUA}will be ready in ${RED}${BOLD}30s`);
        }, (cooldown - 30) * 1000);
    }

    // 10s
    if (config.displayMaskCooldown && cooldown > 10) {
        setTimeout(() => {
            modMsg(`${color}${name} ${DARK_AQUA}will be ready in ${LIGHT_PURPLE}${BOLD}10s`);
        }, (cooldown - 10) * 1000);
    }

    // 5s
    if (config.displayMaskCooldown && cooldown > 5) {
        setTimeout(() => {
            modMsg(`${color}${name} ${DARK_AQUA}will be ready in ${YELLOW}${BOLD}5s`);
        }, (cooldown - 5) * 1000);
    }

    // Ready!
    if (config.displayMaskCooldown) {
        setTimeout(() => {
            modMsg(`${color}${name} ${DARK_AQUA}is ${GREEN}${BOLD}ready!`);
            playCooldownSound();
        }, cooldown * 1000);
    }
}

const getCooldown = () => {
    try {
        const helmet = Player.armor.getHelmet();
        if (!helmet || !helmet.getLore) return 0;

        const helmetLores = helmet.getLore();
        for (let i = 0; i < helmetLores.length; i++) {
            const line = helmetLores[i];
            if (line.includes("Cooldown: ")) {
                const numStr = line.slice(18, -1);
                const cooldown = parseInt(numStr);
                if (!isNaN(cooldown)) return cooldown;
            }
        }
    } catch (e) {
        modMsg(`&cFailed to get cooldown: ${e}`);
    }
    return 0;
};

// Phoenix Pet
register("chat", () => {
    activate(180, "Phoenix Pet", "&c");
}).setChatCriteria("Your Phoenix Pet saved you from certain death!").setContains();

// Spirit Mask
register("chat", () => {
    activate(30, "Spirit Mask", "&d");
}).setChatCriteria("Second Wind Activated! Your Spirit Mask saved your life!").setContains();

// Bonzo's Mask
register("chat", () => {
    let cooldown = getCooldown();
    activate(cooldown, "⚚ Bonzo's Mask", "&9");
}).setChatCriteria("Your ⚚ Bonzo's Mask saved your life!").setContains();

register("chat", () => {
    let cooldown = getCooldown();
    activate(cooldown, "Bonzo's Mask", "&9");
}).setChatCriteria("Your Bonzo's Mask saved your life!").setContains();
