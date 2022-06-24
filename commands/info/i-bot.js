const { prefix, by, version, versiondescription } = require("../../config.json");
const { MessageEmbed } = require("discord.js");
const { timeDifference } = require('../../functions');
const package = require("./../../package.json");
function botUser(msg, args, bot) {
    const client = bot.user;

    const botInfo = new MessageEmbed()
    .setColor(`#00ff00`)
    .setTitle(":robot: BOT INFO :robot:")
    .setDescription("Info")
    .addFields(
        [
            { name: "Username", value: `\`\`\`${client.tag}\`\`\``, inline: true},
            { name: "User Id", value: `\`\`\`${client.id}\`\`\``, inline: true},
        ],
        { name: "Create on", value: `\`\`\`${client.createdAt.toDateString()} (${timeDifference(client.createdTimestamp)})\`\`\`` },
        { name: "Last Ready on", value: `\`\`\`${bot.readyAt.toDateString()} (${timeDifference(client.readyTimestamp)})\`\`\`` },
        [
            { name: "Version", value: `\`\`\`${version}\`\`\``, inline: true },
            { name: "Version Description", value: `\`\`\`${versiondescription}\`\`\``, inline: true },
            { name: "Discord.JS Version", value: `\`\`\`${package.dependencies["discord.js"]}\`\`\`` }
        ],
        { name: "Application", value: `\`\`\`${bot.application}\`\`\`` },
        [
            { name: "On", value: `\`\`\`Guilds: ${bot.guilds.cache.size} | Channels: ${bot.channels.cache.size}\`\`\`` },
            { name: "Has", value: `\`\`\`Users: ${bot.users.cache.size} | Emojis: ${bot.emojis.cache.size}\`\`\`` }
        ]
    )
    .setFooter({ text: `${by} helps` })
    msg.channel.send({ embeds: [botInfo] });
}

module.exports = {
    name: "bot",
    description: "Get info on the bot",
    example: prefix + "bot",
    type: "info",
    execute(msg, args, bot) {
        botUser(msg, args, bot);
    }
}