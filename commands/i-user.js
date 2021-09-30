const { prefix, by } = require("./../config.json");
const { MessageEmbed } = require("discord.js");
const { Invalid } = require('../errors');
function userInfo(msg, args, example) {
    const user = msg.mentions.users.first();

    var bo;
    var ni;
    const author = msg.author;
    var cre = author.createdAt;
    if (!author.bot) { bo = `${author.nickname|| author.username} is not a bot` } else { if (author.bot) { bo = `${author.nickname || author.username} is a bot` }}
    if (!author.nickname) { ni = `No nickname`} else { ni = `${author.nickname}`}
    const meInfo = new MessageEmbed()
    .setColor("#00ff00")
    .setTitle(":bust_in_silhouette: USER INFO :bust_in_silhouette:")
    .setDescription("Info")
    .addFields(
        [
            { name: "Username", value: `\`\`\`${author.tag}\`\`\``, inline: true},
            { name: "User Id", value: `\`\`\`${author.id}\`\`\``, inline: true},
        ],
        { name: "Created on", value: `\`\`\`${cre.toDateString()}\`\`\``},
        [
            { name: "User Nickname", value: `\`\`\`${ni}\`\`\``, inline: true},
            { name: "Bot?", value: `\`\`\`${bo}\`\`\``, inline: true},
            { name: "Number of roles", value: `\`\`\`${author.roles}\`\`\``, inline: true}
        ]
    )
    .setFooter(`${by} helps`)
    if (args == 0) return msg.channel.send({ embeds: [meInfo] });

    const member = msg.guild.members.cache.get(user.id);
    if (!member) return Invalid(msg, `No Member`, `I don't know that member`, `${example}`);

    var cre = user.createdAt;
    if (!user.bot) { bo = `${user.nickname|| user.username} is not a bot` } else { if (user.bot) { bo = `${user.nickname || user.username} is a bot` }}
    if (!user.nickname) { ni = `No nickname`} else { ni = `${user.nickname}`}
    const Info = new MessageEmbed()
    .setColor("#00ff00")
    .setTitle(":bust_in_silhouette: USER INFO :bust_in_silhouette:")
    .setDescription("Info")
    .addFields(
        [
            { name: "Username", value: `\`\`\`${user.tag}\`\`\``, inline: true},
            { name: "User Id", value: `\`\`\`${user.id}\`\`\``, inline: true},
        ],
        { name: "Created on", value: `\`\`\`${cre.toDateString()}\`\`\``},
        [
            { name: "User Nickname", value: `\`\`\`${ni}\`\`\``, inline: true},
            { name: "Bot?", value: `\`\`\`${bo}\`\`\``, inline: true},
            { name: "Number of roles", value: `\`\`\`${user.roles}\`\`\``, inline: true}
        ]
    )
    .setFooter(`${by} helps`)
    msg.channel.send({ embeds: [Info] });
}

module.exports = {
    name: "user",
    description: "Get info on a user",
    example: prefix + "user [user]",
    type: "info",
    execute(msg, args) {
        userInfo(msg, args, this.example);
    }
}