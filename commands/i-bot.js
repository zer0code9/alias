const { prefix, by } = require("./../config.json");
const Discord = require("discord.js");
function botUser(msg, args) {
    if (args == 0) {
        const botInfo = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`${by} Commands`)
        .setDescription("Command: ")
        .addFields(
            { name: "Guilds on", value: `${bot.guilds}`}
        )
        .setFooter(`${by} helps`)
        msg.channel.send(botInfo);
    } 
}

module.exports = {
    name: "bot",
    description: "Get info on the bot",
    example: prefix + "bot",
    type: "info",
    execute(msg, args) {
        botUser(msg, args);
    }
}