const { prefix, by } = require("./../config.json");
const { MessageEmbed } = require("discord.js");
const { Invalid } = require('../errors');
const { timeDifference } = require('../functions');
async function channelInfo(msg, args, example) {
    const channel = msg.guild.channels.cache.get(args[0]) || msg.mentions.channels.first();

    if (!channel) return Invalid(msg, `No Channel`, `I need a channel in order to return info about it`, `${example}`);

    let parent = "";
    if (channel.type == "GUILD_CATEGORY") parent = "Is A Category";
    else if (channel.parent.name) parent = channel.parent.name;
    else parent = "None";

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
            { name: "Category", value: `\`\`\`${parent}\`\`\``, inline: true },
            { name: "Channel Topic", value: `\`\`\`${channel.topic || `No Topic`}\`\`\``, inline: true }
        ]
    )
    .setFooter(`${by} helps`)
    await msg.channel.send({ embeds: [Info] });
    msg.delete();
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