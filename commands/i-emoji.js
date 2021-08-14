const { prefix, by } = require("./../config.json")
const Discord = require("discord.js");
function emojiInfo(msg, args) {
    const emoji = msg.guild.emojis.cache.first();

    const noEmoji = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle(`${by} Commands`)
    .setDescription("Command: emoji")
    .addFields(
        { name: "Command", value: `Get info on an emoji\n\`\`\`${prefix}emoji [emoji]\`\`\``}
    )
    .setFooter(`${by} helps`)
    if (!emoji) return msg.channel.send(noEmoji);

    var cre = emoji.createdAt;
    var an;
    if (emoji.animated = false) { an = `${emoji.name} is not animated` } else { if (emoji.animated = true) { an = `${emoji.name} is an animated emoji` }}
    const Emoji = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle(`${by} Comamnds`)
    .setDescription("Command: emoji")
    .addFields(
        [
            { name: "Username", value: `\`\`\`${emoji.name}\`\`\``, inline: true},
            { name: "Id", value: `\`\`\`${emoji.id}\`\`\``, inline: true},
        ],
        { name: "Created on", value: `${cre.toDateString()}`},
        { name: "Author", value: `${emoji.author}`},
        { name: "Identifier", value: `${emoji.identifier}`},
        { name: "Animated?", value: `${an}`},
        { name: "URL", value: `${emoji.url}`}
    )
    .setFooter(`${by} helps`)
    msg.channel.send(Emoji);
}

module.exports = {
    name: "emoji",
    description: "Get info on an emoji",
    example: prefix + "emoji [emoji]",
    type: "info",
    execute(msg, args) {
        emojiInfo(msg, args);
    }
}