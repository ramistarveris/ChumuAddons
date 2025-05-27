const File = Java.type("java.io.File");
const PrintWriter = Java.type("java.io.PrintWriter");
const Scanner = Java.type("java.util.Scanner");

module.exports = {
    read: (path) => {
        const file = new File(`config/ChatTriggers/modules/ChumuAddons/${path}`);
        if (!file.exists()) return "";
        const scanner = new Scanner(file);
        let data = "";
        while (scanner.hasNextLine()) data += scanner.nextLine() + "\n";
        scanner.close();
        return data;
    },

    write: (path, content) => {
        const file = new File(`config/ChatTriggers/modules/ChumuAddons/${path}`);
        const writer = new PrintWriter(file);
        writer.write(content);
        writer.close();
    }
}
