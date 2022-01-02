
class CommandHandler{
    constructor(obj) { 
        this.client = obj.client;
        this.prefix = obj.prefix;
        this.commands = [];
    }

    use(name, callback) {
        this.commands.push(name);
        this.client.on("messageCreate", (message) => {
            let command = message.content.toLocaleLowerCase();
            if (command === `${this.prefix}${name}`) {
                callback(message);
            }
        });
    }
    
}

module.exports = CommandHandler;