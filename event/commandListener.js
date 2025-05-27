const listeners = [];

register("command", (command, ...args) => {
    const result = listeners.find(listener => listener[0] === command);
    if (!args) args = [];
    if (result) result[1](...args);
}).setName("chumuaddons").setAliases("ca");

export function addListener(name, handler) {
    listeners.push([name, handler]);
}

export function removeListener(name) {
    const index = listeners.findIndex(listener => listener[0] === name);
    if (index === -1) return false;
    listeners.splice(index, 1);
    return true;
}

export default {
    addListener,
    removeListener
};
