const { prefix } = require("/home/asorinus/workspace/myFirstProject/WithersWorld/WithersBot/config.json");
const Discord = require("discord.js");
function la(msg, args) {
    if (args == 0) {
        const noChannel = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("WithersBot Commands")
        .setDescription("Command: channel")
        .addFields(
            { name: "Command", value: `here\n\`\`\`${prefix}channel [channel]\`\`\``}
        )
        .setFooter("WithersBot helps")
        msg.channel.send(noChannel);
    } else {
        if (args !=0) {
            const channel = msg.mentions.channels.first();
            const channelInfo = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle("WithersBot Commands")
            .setDescription("Command: channel")
            .addFields(
                { name: "Name", value: `${channel.name}` },
                { name: "Id", value: `${channel.id}` },
                { name: "Created on", value: `${channel.createdAt}` },
                { name: "Type", value: `${channel.type}`},
                { name: "Category", value: `${channel.parent}` },
                { name: "Topic", value: `${channel.topic}` }
            )
            .setFooter("WithersBot helps")
            msg.channel.send(channelInfo);
        }
    }
}

module.exports = {
    name: "channel",
    description: "Get info on a channel",
    example: prefix + "channel [channel]",
    type: "info",
    execute(msg, args) {
        la(msg, args);
    }
}