const { prefix } = require("/home/asorinus/workspace/myFirstProject/WithersWorld/WithersBot/config.json");
const Discord = require("discord.js");
function la(msg, args) {
    const channel = msg.mentions.channels.first();
    if (channel) {
            var cre = channel.createdAt;
            var to;
            if (channel.topic == "null" || "undefined") {to = "No topic"} else {to = `${channel.topic}`}
            const channelInfo = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle(":file_folder: CHANNEL INFO :file_folder:")
            .setDescription("Info")
            .addFields(
                [
                    { name: "Channel Name", value: `\`\`\`${channel.name}\`\`\``, inline: true},
                    { name: "Channel Id", value: `\`\`\`${channel.id}\`\`\``, inline: true },
                ],
                { name: "Created on", value: `\`\`\`${cre.toDateString()}\`\`\`` },
                [
                    { name: "Channel Type", value: `\`\`\`${channel.type}\`\`\``, inline: true},
                    { name: "Category", value: `\`\`\`${channel.parent.name}\`\`\``, inline: true },
                    { name: "Channel Topic", value: `\`\`\`${to}\`\`\``, inline: true }
                ]
                
            )
            .setFooter("WithersBot helps")
            msg.channel.send(channelInfo);
    } else {
        const id = args.join(" ");
        if (id) {
            const ID = msg.guild.channels.find(channel => channel.id === `${id}`);
            var cre = ID.createdAt;
            var to;
            if (ID.topic == "null" || "undefined") {to = "No topic"} else {to = `${ID.topic}`}
            const channelInfo = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle("WithersBot Commands")
            .setDescription("Command: channel")
            .addFields(
                { name: "Name", value: `${ID.name}` },
                { name: "Id", value: `${ID.id}` },
                { name: "Created on", value: `${cre.toDateString()}` },
                { name: "Type", value: `${ID.type}`},
                { name: "Category", value: `${ID.parent}` },
                { name: "Topic", value: `${to}` }
            )
            .setFooter("WithersBot helps")
            msg.channel.send(channelInfo);
        } else {
            const noChannel = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("WithersBot Commands")
        .setDescription("Command: channel")
        .addFields(
            { name: "No Channel", value: `I need a channel in order to return info about it`},
            { name: "Command", value: `Get info on a channel\n\`\`\`${prefix}channel [channel]\`\`\``}
        )
        .setFooter("WithersBot helps")
        msg.channel.send(noChannel);
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