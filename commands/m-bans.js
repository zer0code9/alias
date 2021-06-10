const { prefix, by } = require("./../config.json");
const Discord = require("discord.js");
function abc(msg, args) {
    if (!msg.member.hasPermission("BAN_MEMBERS")) return msg.channel.send(`You don't have the permission to see ban users, ${msg.author}`)
    if(!msg.guild.me.hasPermission("BAN_MEMBERS")) return msg.channel.send(`I dont have the permission to see ban users, ${msg.author}`)
    var num;
    var bans = msg.guild.fetchBans();
    if (!bans) {num = "0", bans = "Nobody was banned"}
    if (bans) return num = bans.length
    if (msg.member.hasPermission("BAN_MEMBERS")) {
        const banned = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`${by} Comamnds`)
        .setDescription("Command: bans")
        .addFields(
            { name: `Banned members (${num})`, value: `${bans}`}
        )
        .setFooter(`${by} helps`)
        msg.channel.send(banned);
    }
}

module.exports = {
    name: "bans",
    description: "Get a list of all the ban members",
    example: prefix + "bans",
    type: "info",
    execute(msg, args) {
        abc(msg, args);
    }
}