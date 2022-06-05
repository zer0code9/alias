const { SlashCommandBuilder } = require('@discordjs/builders');
const { by } = require('../config.json');
const { MessageEmbed } = require('discord.js');
const { Invalid } = require('../errors');
const { timeDifference } = require('../functions');

module.exports = {
	data: new SlashCommandBuilder()
		.setName("info")
		.setDescription("Infos on server")
        .addSubcommand(sub => sub
            .setName("user")
            .setDescription("Get info on a user"))
            .addUserOption(option => option.setName('theuser').setDescription('The targeted user'))
        .addSubcommand(sub => sub
            .setName("channel")
            .setDescription("Get info on a channel"))
            .addChannelOption(option => option.setName('thechannel').setDescription('The targeted channel'))
        .addSubcommand(role => role
            .setName("role")
            .setDescription("Get info on a role"))
            .addRoleOption(option => option.setName('therole').setDescription('the targeted role'))
        .addSubcommand(server => server
            .setName("server")
            .setDescription("Get info on the server")),
	async execute(interaction) {
        if (interaction.options.getSubcommand() === 'user') {
            const user = interaction.options.getUser('theuser') ? interaction.options.getUser('theuser') : interaction.user;
            const Info = new MessageEmbed()
                .setColor("#00ff00")
                .setTitle(":bust_in_silhouette: USER INFO :bust_in_silhouette:")
                .setThumbnail(`${user.avatarURL()}`)
                .setDescription("Info")
                .addFields(
                    [
                        { name: "Username", value: `\`\`\`${user.tag}\`\`\``, inline: true},
                        { name: "User Id", value: `\`\`\`${user.id}\`\`\``, inline: true},
                    ],
                    { name: "Created on", value: `\`\`\`${user.createdAt.toDateString()} (${timeDifference(user.createdTimestamp)})\`\`\``},
                    [
                        { name: "User Nickname", value: `\`\`\`${user.nickname || `No nickname`}\`\`\``, inline: true},
                        { name: "Bot?", value: `\`\`\`${user.bot || `false`}\`\`\``, inline: true},
                    ]
                    )
                .setFooter({ text: `${by} helps` })
                await interaction.reply({ embeds: [Info] });
        } else if (interaction.options.getSubcommand() === 'channel') {
            const channel = interaction.options.getUser('thechannel');
            if (!channel) return Invalid(msg, `No Channel`, `I need a channel in order to return info about it`, `${example}`);
        } else if (interaction.options.getSubcommand() === 'role') {
            const role = interaction.options.getUser('therole');
            if (!channel) return Invalid(msg, `No Channel`, `I need a channel in order to return info about it`, `${example}`);
        } else if (interaction.options.getSubcommand() === 'server') {
            if (!channel) return Invalid(msg, `No Channel`, `I need a channel in order to return info about it`, `${example}`);
        }
	},
};