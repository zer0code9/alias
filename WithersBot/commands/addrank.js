const { prefix } = require("/home/asorinus/workspace/myFirstProject/WithersWorld/WithersBot/config.json");
const Discord = require("discord.js");
function lala(msg, args) {
    const lolo = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle()
    .setDescription()
    .addFields(
        { name: "here", value: `here`}
    )
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