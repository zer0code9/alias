const { prefix, by } = require("../../config.json");
const { MessageEmbed } = require("discord.js");
const { Invalid } = require('../../errors');
const { timeDifference } = require('../../functions');
async function userInfo(msg, args, example) {
    let user = await msg.guild.members.cache.get(args[0]) || msg.mentions.users.first();
    if (args == 0) user = await msg.author;

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
    await msg.channel.send({ embeds: [Info] });
    msg.delete();
}

module.exports = {
    name: "user",
    description: "Get info on a user",
    example: prefix + "user [user:us|id]",
    type: "info",
    execute(msg, args) {
        userInfo(msg, args, this.example);
    }
}