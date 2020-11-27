const { prefix } = require("/home/asorinus/workspace/myFirstProject/WithersWorld/WithersBot/config.json");
const Discord = require("discord.js");
function la(msg, args) {
    const lo = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle()
    .setDescription()
    .addFields(
        { name: "here", value: `here`}
    )
    .setFooter("WithersBot helps")
msg.channel.send(lo)
}

module.exports = {
    name: "delrank",
    description: "Delete a role",
    example: prefix + "delrank [role]",
    type: "rank",
    execute(msg, args) {
        la(msg, args)
    }
}