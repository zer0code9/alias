const { prefix } = require("/home/asorinus/workspace/myFirstProject/WithersWorld/WithersBot/config.json");
const Discord = require("discord.js");
function lala(msg, args) {
    const channel = msg.mentions.channels.first();
    if (args == 0) {
    const noName = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle("WithersBot Commands")
    .setDescription("Command: namechannel")
    .addFields(
        { name: "Command:", value: `Change the name of a role\n\`\`\`${prefix}namechannel [channel] [name]\`\`\``}
    )
    .setFooter("WithersBot helps")
    msg.channel.send(noName);
    } else {
        if (args != 0) {
        channel.edit({ name: `${args[1]}` })
        const name = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("WithersBot Commands")
        .setDescription("Command: namechannel")
        .addFields(
            { name: `The name of the channel ${channel.name}`, value: `The new name: ${args[1]}`}
        )
        .setFooter("WithersBot helps")
        msg.channel.send(name);
        }
    }
}

module.exports = {
    name: "namechannel",
    description: "Change the name of a channel",
    example: prefix + "namechannel [role] [name]",
    type: "channel",
    execute(msg, args) {
        lala(msg, args)
    }
}