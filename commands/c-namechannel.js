const { prefix } = require("/home/asorinus/workspace/myFirstProject/WithersWorld/WithersBot/config.json");
const Discord = require("discord.js");
function lala(msg, args) {
    if (!msg.member.hasPermission("MANAGE_CHANNELS")) return msg.channel.send(`You don't have the permission to manage channels, ${msg.author}`)
    if(!msg.guild.me.hasPermission("MANAGE_CHANNELS")) return msg.channel.send(`I dont have the permissions to manage channels, ${msg.author}`)
    const channel = msg.mentions.channels.first();
    const name = args.slice(1).join(" ");
    if (channel) {
        if (name) {
            channel.setName(`${name}`)
            const change = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle("WithersBot Commands")
            .setDescription("Command: namechannel")
            .addFields(
                { name: `The name of the channel ${channel.name} has changed`, value: `The new name: ${name}`}
            )
            .setFooter("WithersBot helps")
            msg.channel.send(change);
        } else {
            const noName = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle("WithersBot Commands")
            .setDescription("Command: namechannel")
            .addFields(
                { name: "No name", value: `I need a name in order to rename the channel`},
                { name: "Command:", value: `Change the name of a channel\n\`\`\`${prefix}namechannel [channel] [name]\`\`\``}
            )
            .setFooter("WithersBot helps")
            msg.channel.send(noName);
        }
} else {
    const noRole = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle("WithersBot Commands")
    .setDescription("Command: namechannel")
    .addFields(
        { name: `No channel`, value: `I need a channel in order to rename it`},
        { name: "Command:", value: `Change the name of a channel\n\`\`\`${prefix}namechannel [channel] [name]\`\`\`` }
    )
    .setFooter("WithersBot helps")
    msg.channel.send(noRole);
}
}

module.exports = {
    name: "namechannel",
    description: "Change the name of a channel",
    example: prefix + "namechannel [channel] [name]",
    type: "channel",
    execute(msg, args) {
        lala(msg, args)
    }
}