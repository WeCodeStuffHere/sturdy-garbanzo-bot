const { Client, Intents } = require("discord.js");
const CommandHandler = require("./src/CommandHandler");

const dotenv = require("dotenv");
dotenv.config();

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

const handler = new CommandHandler({client, prefix: "!"});

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}.`);
});

client.on("messageCreate", (message) => {
  if (message.content.toLocaleLowerCase() == "ping") {
    message.channel.send("pong");
  }
});

handler.use("welcome", (message) => {
  message.channel.send("Welcome to the server!");    
})

client.login(process.env.TOKEN);
