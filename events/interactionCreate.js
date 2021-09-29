const CONFIG = require('../config.json');

module.exports = async (bot, interaction) => {
    if (!interaction.isCommand()) return;
	const command = bot.botInteractions.get(interaction.commandName);
	if (!command) return;
	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
}