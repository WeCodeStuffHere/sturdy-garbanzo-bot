
class CommandHandler{
    constructor(obj) { 
        this.client = obj.client;
        this.prefix = obj.prefix;
    }

    use(name, callback) {
        this.client.on("messageCreate", (message) => {
            if (message.content.toLocaleLowerCase() == `${this.prefix}${name}`) {
                callback(message);
            }
        });
    }
}

module.exports = CommandHandler;