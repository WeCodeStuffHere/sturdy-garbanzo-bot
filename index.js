const { Client, Intents, MessageEmbed, Collection } = require("discord.js");
const fs = require('fs');
const CommandHandler = require("./src/CommandHandler");
const dotenv = require("dotenv").config();

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}.`);
});

/* Read command files and save them on Collection */
client.commands = new Collection();
const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./src/commands/${file}`);
  client.commands.set(command.data.name, command);
}

client.on('interactionCreate', async interaction => {
  /* Ignore if it's not a command */
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

  /* Ignore if command does not exist */
  if(!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
  }
});

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
