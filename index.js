const { Client, Intents } = require("discord.js");
const dotenv = require("dotenv");
dotenv.config();

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}.`);
});

client.on("messageCreate", (message) => {
  if (message.content == "ping") {
    message.channel.send("pong");
  }
});

client.login(process.env.TOKEN);
