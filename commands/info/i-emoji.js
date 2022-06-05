const { prefix, by } = require("../../config.json")
const { MessageEmbed } = require("discord.js");
const { Invalid } = require('../../errors');
function emojiInfo(msg, args, example) {
    const emoji = msg.guild.emojis.cache.first();

    if (!emoji) return Invalid(msg, `No Emoji`, `I need an emoji in order to return info about it`, `${example}`);

    var cre = emoji.createdAt;
    var an;
    if (emoji.animated = false) { an = `${emoji.name} is not animated` } else { if (emoji.animated = true) { an = `${emoji.name} is an animated emoji` }}
    const Info = new MessageEmbed()
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
    .setFooter({ text: `${by} helps` })
    msg.channel.send({ embeds: [Info] });
}

module.exports = {
    name: "emoji",
    description: "Get info on an emoji",
    example: prefix + "emoji [emoji]",
    type: "info",
    execute(msg, args) {
        emojiInfo(msg, args, this.example);
    }
}