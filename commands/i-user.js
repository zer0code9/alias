const { prefix, by } = require("./../config.json");
const Discord = require("discord.js");
function userInfo(msg, args) {
    const user = msg.mentions.users.first();

    const member = msg.guild.member(user);

    const noMember = new Discord.MessageEmbed()
    .setColor("#ff0000")
    .setTitle(`:warning: CANCELED :warning:`)
    .addFields(
      { name: "No Member", value: `I don't know that member` },
      { name: "Command", value: `Get info on a user\n\`\`\`${prefix}user [member]\`\`\``}
    )
    .setFooter(`${by} helps`)
    if (!member) return msg.channel.send(noMember);

    var bo;
    var ni;
    const author = msg.author;
    var cre = author.createdAt;
    const uUser = new Discord.MessageEmbed()
    .setColor("#00ff00")
    .setTitle(":bust_in_silhouette: USER INFO :bust_in_silhouette:")
    .setDescription("Info")
    .addFields(
        { name: "Username", value: `\`\`\`${author.username}\`\`\``},
        { name : "Id", value: `\`\`\`${author.id}\`\`\``},
        { name: "Created on", value: `\`\`\`${cre.toDateString()}\`\`\``},
        { name: "Tag", value: `\`\`\`${author.tag}\`\`\``},
        { name: "Bot?", value: `Not a bot`}
    )
    .setFooter(`${by} helps`)
    if (args == 0) return msg.channel.send(uUser);

    var cre = user.createdAt;
    if (user.bot = false) { bo = `${user.username} is not a bot` } else { if (user.bot = true) { bo = `${user.username} is a bot` }}
    if (user.nickname == "undifined" || "null") { ni = `No nickname`} else { ni = `${user.nickname}`}
    const Info = new Discord.MessageEmbed()
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
    msg.channel.send(Info);
}

module.exports = {
    name: "user",
    description: "Get info on a user",
    example: prefix + "user [user]",
    type: "info",
    execute(msg, args) {
        userInfo(msg, args);
    }
}