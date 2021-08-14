const { prefix, by } = require("./../config.json");
const Discord = require("discord.js");
function channel(msg, args) {
    const channel = msg.mentions.channels.first();
    //let id;

    const noChannel = new Discord.MessageEmbed()
    .setColor("#ff0000")
    .setTitle(`:warning: CANCELED :warning:`)
    .addFields(
        { name: "No Channel", value: `I need a channel in order to return info about it`},
        { name: "Command", value: `Get info on a channel\n\`\`\`${prefix}channel [channel]\`\`\``}
    )
    .setFooter(`${by} helps`)
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

    var cre = channel.createdAt;
    var to;
    if (channel.topic == "null" || "undefined") {to = "No topic"} else {to = `${channel.topic}`}
    const Info = new Discord.MessageEmbed()
    .setColor("#00ff00")
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
    .setFooter(`${by} helps`)
    msg.channel.send(Info);
}

module.exports = {
    name: "channel",
    description: "Get info on a channel",
    example: prefix + "channel [channel]",
    type: "info",
    execute(msg, args) {
        channel(msg, args);
    }
}