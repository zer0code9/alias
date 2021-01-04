const { prefix } = require("/home/asorinus/workspace/myFirstProject/WithersWorld/WithersBot/config.json");
const Discord = require("discord.js");
function abc(msg, args) {
    if (!msg.member.permissions.has("MANAGE_CHANNELS")) {msg.channel.send(`You don't have the permission to manage channels, ${msg.author}`); return;} else {
    const channel = msg.mentions.channels.first();
    if (channel) {
        if (args[1] == 0 || args[1] == "undefined" || args[1] == "null") {
            const noCategory = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle("WithersBot Commands")
            .setDescription("Command: movechannel")
            .addFields(
                { name: "No Category", value: `I need a category in order to move the channel`},
                { name: "Command", value: `Move the channel to a different place\n\`\`\`${prefix}movechannel [channel] [category:id] [place]\`\`\``}
            )
            .setFooter("WithersBot helps")
            msg.channel.send(noCategory);
        } else {
            if (args[2] == 0 || args[2] == "undefined" || args[1] == "null") {
                const noCategory = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setTitle("WithersBot Commands")
                .setDescription("Command: movechannel")
                .addFields(
                    { name: "No Position", value: `I need a position in order to move the channel`},
                    { name: "Command", value: `Move the channel to a different place\n\`\`\`${prefix}movechannel [channel] [category:id] [place]\`\`\``}
                )
                .setFooter("WithersBot helps")
                msg.channel.send(noCategory);
            } else {
                channel.setParent(`${args[1]}`);
                channel.setPosition(`${args[2]}`);
                const yes = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setTitle("WithersBot Commands")
                .setDescription("Command: movechannel")
                .addFields(
                    { name: "New category", value: `${args[1]}`}
                )
                .setFooter("WithersBot helps")
                msg.channel.send(yes);
            }
        }
    } else {
            
        const noChannel = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("WithersBot Commands")
        .setDescription("Command: movechannel")
        .addFields(
            { name: "No Channel", value: `I need a channel in order to move it`},
            { name: "Command", value: `Move the channel to a different place\n\`\`\`${prefix}movechannel [channel] [category:id] [place]\`\`\``}
        )
        .setFooter("WithersBot helps")
        msg.channel.send(noChannel);
    }
}
}

module.exports = {
    name: "movechannel",
    description: "Move the channel to a different place",
    example: prefix + "movechannel [channel] [category:id] [place]",
    type: "channel",
    execute(msg, args) {
        abc(msg, args);
    }
}