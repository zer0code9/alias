const { prefix, by } = require("./../config.json");
const { MessageEmbed } = require("discord.js");
const { Invalid } = require('../errors');
const { timeDifference } = require('../functions');
function channelInfo(msg, args, example) {
    const channel = msg.mentions.channels.first();
    //let id;

    if (!channel) return Invalid(msg, `No Channel`, `I need a channel in order to return info about it`, `${example}`);
    //if (!channel) id = args.join(" ");    

    /*
    const ID = id;
    var cre = ID.createdAt;
    var to;
    if (ID.topic == "null" || "undefined") {to = "No topic"} else {to = `${ID.topic}`}
    const ChannelID = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle(`${by} Commands`)
    .setDescription("Command: channel")
    .addFields(
        { name: "Name", value: `${ID.name}` },
        { name: "Id", value: `${ID.id}` },
        { name: "Created on", value: `${cre.toDateString()}` },
        { name: "Type", value: `${ID.type}`},
        { name: "Category", value: `${ID.parent}` },
        { name: "Topic", value: `${to}` }
    )
    .setFooter(`${by} helps`)
    if (id) return msg.channel.send(ChannelID);
    if (!id) return msg.channel.send(noChannel);
    */

    const Info = new MessageEmbed()
    .setColor("#00ff00")
    .setTitle(":file_folder: CHANNEL INFO :file_folder:")
    .setDescription("Info")
    .addFields(
        [
            { name: "Channel Name", value: `\`\`\`${channel.name}\`\`\``, inline: true},
            { name: "Channel Id", value: `\`\`\`${channel.id}\`\`\``, inline: true },
        ],
        { name: "Created on", value: `\`\`\`${channel.createdAt.toDateString()} (${timeDifference(channel.createdTimestamp)})\`\`\`` },
        [
            { name: "Channel Type", value: `\`\`\`${channel.type}\`\`\``, inline: true},
            { name: "Category", value: `\`\`\`${channel.parent.name}\`\`\``, inline: true },
            { name: "Channel Topic", value: `\`\`\`${channel.topic || `No Topic`}\`\`\``, inline: true }
        ]
    )
    .setFooter(`${by} helps`)
    msg.channel.send({ embeds: [Info] });
}

module.exports = {
    name: "channel",
    description: "Get info on a channel",
    example: prefix + "channel [channel]",
    type: "info",
    execute(msg, args) {
        channelInfo(msg, args, this.example);
    }
}