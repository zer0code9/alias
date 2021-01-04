const { prefix } = require("/home/asorinus/workspace/myFirstProject/WithersWorld/WithersBot/config.json");
const Discord = require("discord.js");
function lala(msg, args) {
    if (!msg.member.permissions.has("MANAGE_CHANNELS")) {msg.channel.send(`You don't have the permission to manage channels, ${msg.author}`); return;} else {
    const channel = msg.mentions.channels.first();
    if (args == 0) {
    const noName = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle("WithersBot Commands")
    .setDescription("Command: movechannel")
    .addFields(
        { name: "Command:", value: `Change the topic of a channel\n\`\`\`${prefix}topicchannel [channel] [topic]\`\`\``}
    )
    .setFooter("WithersBot helps")
    msg.channel.send(noName);
    } else {
        if (args != 0) {
        const string = args.slice(1).join(" ");
        channel.setTopic(`${string}`)
        const name = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("WithersBot Commands")
        .setDescription("Command: topicchannel")
        .addFields(
            { name: `The topic of the channel ${channel.name} has changed`, value: `The new topic: ${string}`}
        )
        .setFooter("WithersBot helps")
        msg.channel.send(name);
        }
    }
}
}

module.exports = {
    name: "topicchannel",
    description: "Change the topic of a channel",
    example: prefix + "topicchannel [channel] [topic]",
    type: "channel",
    execute(msg, args) {
        lala(msg, args)
    }
}