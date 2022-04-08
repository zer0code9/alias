const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { by } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName("commands")
		.setDescription("Alias How To"),
	async execute(interaction) {
        const HowTo = new MessageEmbed()
        .setColor("#ff0000")
        .setTitle(`test`)
        .addFields(
            { name: `test`, value: `working?` }
        )
        .setFooter(`${by} helps`)
        await interaction.reply({ embeds: [HowTo] });
	},
};