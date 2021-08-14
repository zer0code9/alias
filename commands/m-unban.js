const { prefix, by } = require("./../config.json");
const Discord = require("discord.js");
function unbanUser(msg, args) {
    if (!msg.member.hasPermission("BAN_MEMBERS")) return msg.channel.send(`You don't have the permission to unban someone, ${msg.author}`)
    if (!msg.guild.me.hasPermission("BAN_MEMBERS")) return msg.channel.send(`I dont have the permission to unban someone, ${msg.author}`)
    const user = args[0];
    const reason = args.slice(1).join(" ");

    const noId = new Discord.MessageEmbed()
    .setColor("#ff0000")
    .setTitle(`:warning: CANCELED :warning:`)
    .addFields(
        { name: "No Id", value: `I need a valid id in order to unban someone.` },
        { name: "Command:", value: `\`${prefix}unban [id] [reason]\``}
    )
    .setFooter(`${by} helps`)
    if (!user) return msg.channel.send(noId);

    const noReason = new Discord.MessageEmbed()
    .setColor("#ff0000")
    .setTitle(`:warning: CANCELED :warning:`)
    .addFields(
        { name: "No Reason", value: `I need a reason in order to ban someone`},
        { name: "Command:", value: `\`${prefix}ban [id] [reason]\``}
    )
    .setFooter(`${by} helps`)
    if (!reason) return msg.channel.send(noReason);

    //msg.guild.members.unban(user, `${reason}`)
    const Unban = new Discord.MessageEmbed()
    .setColor("#00ff00")
    .setTitle(`:white_check_mark: UNBANNED MEMBER :bust_in_silhouette::o:`)
    .setDescription("Moderation")
    .addFields(
        { name: "Unbanned Member", value: `\`\`\`${user.tag}\`\`\`` },
        { name: "Reason", value: `\`\`\`${reason}\`\`\``},
        { name: "By", value: `\`\`\`${msg.author.username}\`\`\``}
    )
    .setFooter(`${by} helps`)
    msg.channel.send(Unban);
}

module.exports = {
    name: "unban",
    description: "Unban someone",
    example: prefix + "unban [id] [reason]",
    type: "moderation",
    execute(msg, args){
        unbanUser(msg, args);
    }
}