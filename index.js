const { Client, Intents, MessageEmbed, Collection } = require("discord.js");
const fs = require('fs');
const CommandHandler = require("./src/CommandHandler");
const dotenv = require("dotenv").config();

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});
client.commands = new Collection();

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}.`);
});

const register = require('./src/utils/register');
register.registerCommands(client, '../commands');
register.registerEvents(client, '../events');

const handler = new CommandHandler({client, prefix: "!"});

// Abstract out the code that will be repeated.
handler.use("welcome", (message) => {
  message.channel.send("Welcome to the server!");
});

// help command - creates a help embed pushing the commands from the handler
handler.use("help", (message) => {
  const embed = {
    color: 0xfd79a8,
    title: "**Help**",
    description: "This is a list of commands.",
    fields: [],
    timestamp: new Date(),
	  footer: {
	  	text: 'More Commands coming soon!',
	  	icon_url: 'https://i.imgur.com/AfFp7pu.png',
	  },
  };
  handler.commands.forEach((command) => {
    embed.fields.push({
      name: `***${handler.prefix}${command}***`,
      value: `${command} command.`,
    });
  });
  
  message.channel.send({ embeds: [embed] });
});

client.login(process.env.TOKEN);
