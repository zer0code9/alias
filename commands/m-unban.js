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
        { name: "Command", value: `Unban someone\n\`\`\`${prefix}unban [id]\`\`\``}
    )
    .setFooter(`${by} helps`)
    if (!user) return msg.channel.send(noId);

    const noReason = new Discord.MessageEmbed()
    .setColor("#ff0000")
    .setTitle(`:warning: CANCELED :warning:`)
    .addFields(
        { name: "No Reason", value: `I need a reason in order to ban someone`},
        { name: "Command:", value: `\`${prefix}ban [member] [days] [reason]\``}
    )
    .setFooter(`${by} helps`)
    if (!reason) return msg.channel.send(noReason);

    //msg.guild.members.unban(user, `${reason}`)
    const unban = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle(`${by} Commands`)
    .setDescription("Command: ban")
    .addFields(
        { name: "Unbanned Member", value: `\`\`\`${user.tag}\`\`\`` },
        { name: "Reason", value: `\`\`\`${reason}\`\`\``},
        { name: "By", value: `\`\`\`${msg.author}\`\`\``}
    )
    .setFooter(`${by} helps`)
    msg.channel.send(unban);
}

module.exports = {
    name: "unban",
    description: "Unban someone",
    example: prefix + "unban [id]",
    type: "moderation",
    execute(msg, args){
        unbanUser(msg, args);
    }
}