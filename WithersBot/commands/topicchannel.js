const { prefix } = require("/home/asorinus/workspace/myFirstProject/WithersWorld/WithersBot/config.json");
const Discord = require("discord.js");
function lala(msg, args) {
    if (!msg.member.permissions.has("MANAGE_CHANNELS")) {msg.channel.send(`You don't have the permission to manage channels, ${msg.author}`); return;} else {
    const channel = msg.mentions.channels.first();
    const topic = args.slice(1).join(" ");
    if (channel) {
        if (topic == 0 || topic == "undefined" || topic == "null") {
            const noTopic = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle("WithersBot Commands")
            .setDescription("Command: movechannel")
            .addFields(
                { name: "No topic", value: `I need a topic in order to change the topic of the channel`},
                { name: "Command:", value: `Change the topic of a channel\n\`\`\`${prefix}topicchannel [channel] [topic]\`\`\``}
            )
            .setFooter("WithersBot helps")
            msg.channel.send(noTopic);
        } else {
            channel.setTopic(`${topic}`)
            const change = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle("WithersBot Commands")
            .setDescription("Command: topicchannel")
            .addFields(
                { name: `The topic of the channel ${channel.name} has changed`, value: `The new topic: ${string}`}
            )
            .setFooter("WithersBot helps")
            msg.channel.send(change);
        }
    } else {

        const noChannel = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("WithersBot Commands")
        .setDescription("Command: topicchannel")
        .addFields(
            { name: "No channel", value: `I need a channel in order to change its topic`},
            { name: "Command:", value: `Change the topic of a channel\n\`\`\`${prefix}topicchannel [channel] [topic]\`\`\``}
        )
        .setFooter("WithersBot helps")
        msg.channel.send(noChannel);
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