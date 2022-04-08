const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { by } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName("info")
		.setDescription("Infos on server")
        .addSubcommand(user => user
            .setName("user")
            .setDescription("Get info on a user"))
            .addUserOption(option => option.setName('user').setDescription('The targeted user'))
        .addSubcommand(channel => channel
            .setName("channel")
            .setDescription("Get info on a channel"))
        .addSubcommand(role => role
            .setName("role")
            .setDescription("Get info on a role"))
        .addSubcommand(server => server
            .setName("server")
            .setDescription("Get info on the server")),
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