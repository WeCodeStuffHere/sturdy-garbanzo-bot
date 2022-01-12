module.exports = {

	data: {
		name: 'interactionCreate'
	},
	
	async execute(interaction) {

		/* Ignore if it's not a command */
		if (!interaction.isCommand()) return;

		/* Get the command from the command collection */
		const command = interaction.client.commands.get(interaction.commandName);

		/* Ignore if command does not exist, ie, command is null */
		if(!command) return;

		/* Try to execute the command */
		try { await command.execute(interaction); }
		catch (error) { await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true }); }
	}
};