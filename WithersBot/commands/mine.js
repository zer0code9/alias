const { prefix } = require("/home/asorinus/workspace/myFirstProject/WithersWorld/WithersBot/config.json");
const Discord = require("discord.js");
function abc(msg, args) {
    if (args == 0) {
        var num = Math.floor(Math.random() * 10) + 1;
        const mined = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("WithersBot Commands")
        .setDescription("Command: mine")
        .addFields(
            { name: "Mined", value: `You got ${num} coins`},
            { name: "Total", value: `You have a total of coins`}
        )
        .setFooter("WithersBot helps")
        msg.channel.send(mined);
    }
}

module.exports = {
    name: "mine",
    description: "Mine for gold and win coins!",
    example: prefix + "mine",
    type: "fun",
    execute(msg, args) {
        abc(msg, args);
    }
}