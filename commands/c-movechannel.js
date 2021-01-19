const { prefix } = require("/home/asorinus/workspace/myFirstProject/WithersWorld/WithersBot/config.json");
const Discord = require("discord.js");
function abc(msg, args) {
    if (!msg.member.hasPermission("MANAGE_CHANNELS")) return msg.channel.send(`You don't have the permission to manage channels, ${msg.author}`)
    if(!msg.guild.me.hasPermission("MANAGE_CHANNELS")) return msg.channel.send(`I dont have the permissions to manage channels, ${msg.author}`)
    const channel = msg.mentions.channels.first();
    const category = args[1];
    const position = args[2];
    if (channel) {
        if (category) {
            if (position) {
                channel.setParent(`${category}`);
                channel.setPosition(`${position}`);
                const yes = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setTitle("MOVED CHANNEL :file_folder::arrow_heading_up:")
                .setDescription("Channel")
                .addFields(
                    { name: `The channel has changed places`, value: `\`\`\`Category: ${category} Position: ${position}\`\`\``}
                )
                .setFooter("WithersBot helps")
                msg.channel.send(yes);
            } else {
                const noPosition = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setTitle("WithersBot Commands")
                .setDescription("Command: movechannel")
                .addFields(
                    { name: "No Position", value: `I need a position in order to move the channel`},
                    { name: "Command", value: `Move the channel to a different place\n\`\`\`${prefix}movechannel [channel] [category:id] [place]\`\`\``}
                )
                .setFooter("WithersBot helps")
                msg.channel.send(noPosition);
            }
        } else {
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

module.exports = {
    name: "movechannel",
    description: "Move the channel to a different place",
    example: prefix + "movechannel [channel] [category:id] [place]",
    type: "channel",
    execute(msg, args) {
        abc(msg, args);
    }
}