const { prefix } = require("/home/asorinus/workspace/myFirstProject/WithersWorld/WithersBot/config.json");
const Discord = require("discord.js");
function lala(msg, args) {
    if (args[1] == 0) {
    const lolo = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle("WithersBot Commands")
    .setDescription("Command: addrank")
    .addFields(
        { name: "", value: `here`}
    )
    .setFooter("WithersBot helps")
    }
}

module.exports = {
    name: "addrank",
    description: "create a new role",
    example: "zaddrank [name]",
    type: "rank",
    execute(msg, args) {
        lala(msg, args)
    }
}