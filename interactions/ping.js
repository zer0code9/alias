module.exports = {
    name: "ping",
	async execute(interaction) {
		return interaction.reply('Pong!');
	},
};