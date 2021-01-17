const { prefix } = require("/home/asorinus/workspace/myFirstProject/WithersWorld/WithersBot/config.json");
const Discord = require("discord.js");
function abc(msg, args) {
    if (!msg.member.hasPermission("BAN_MEMBERS")) return msg.channel.send(`You don't have the permission to see ban users, ${msg.author}`)
    if(!msg.guild.me.hasPermission("BAN_MEMBERS")) return msg.channel.send(`I dont have the permission to see ban users, ${msg.author}`)
    var num;
    var bans = msg.guild.fetchBans();
    if (bans == "[object Promise]" || 0) {num = "0", bans = "Nobody was banned"}
    if (msg.member.hasPermission("BAN_MEMBERS")) {
        const banned = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("WithersBot Commands")
        .setDescription("Command: bans")
        .addFields(
            { name: `Banned members (${num})`, value: `${bans}`}
        )
        .setFooter("WithersBot helps")
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