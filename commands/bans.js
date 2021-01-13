const { prefix } = require("/home/asorinus/workspace/myFirstProject/WithersWorld/WithersBot/config.json");
const Discord = require("discord.js");
function abc(msg, args) {
    var num;
    var bans = msg.guild.fetchBans();
    if (bans == "[object Promise]" || 0) {num = "0"}
    if (args == 0) {
        const banned = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("WithersBot Commands")
        .setDescription("Command: bans")
        .addFields(
            { name: `Banned members (${bans})`, value: `here`}
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