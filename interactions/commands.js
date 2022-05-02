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
        .setTitle(`Alias How To`)
        .setDescription(`**Alias has 2 ways of using commands**`)
        .addFields(
            { name: `z Commands`, value: `z[command] [parameters (spaced if more than 1]` },
            { name: `/ Commands`, value: `Type / then click Alias's icon to see all the possible commands\n/[command] [parameters]\nSome / Commands have subcommands!`}
        )
        .setFooter(`${by} helps`)
        await interaction.reply({ embeds: [HowTo] });
	},
};