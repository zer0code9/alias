const { prefix, by } = require("../../config.json");
const { MessageEmbed } = require("discord.js");
const { Invalid } = require('../../errors');
const { timeDifference } = require('../../functions');
async function channelInfo(msg, args, example) {
    const channel = await msg.guild.channels.cache.get(args[0]) || msg.mentions.channels.first();

    const guildTypes = {
        GUILD_TEXT: "Text",
        GUILD_VOICE: "Voice",
        GUILD_NEWS: "News",
        GUILD_CATEGORY: "Category",
        GUILD_NEWS_THREAD: "News Thread",
        GUILD_PUBLIC_THREAD: "Public Thread",
        GUILD_PRIVATE_THREAD: "Private Thread",
        GUILD_STAGE_VOICE: "Stage Voice",
        GUILD_DIRECTORY: "Hub"
    }

    if (!channel) return Invalid(msg, `No Channel`, `I need a channel in order to return info about it \n(mention:channel or channel:id)`, `${example}`);

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
            { name: "Channel Type", value: `\`\`\`${guildTypes[channel.type]}\`\`\``, inline: true},
            { name: "Category", value: `\`\`\`${parent}\`\`\``, inline: true },
            { name: "Channel Topic", value: `\`\`\`${channel.topic || `No Topic`}\`\`\``, inline: true }
        ]
    )
    .setFooter({ text: `${by} helps` })
    await msg.channel.send({ embeds: [Info] });
    msg.delete();
}

module.exports = {
    name: "channel",
    description: "Get info on a channel",
    example: prefix + "channel [channel:ch|id]",
    type: "info",
    execute(msg, args) {
        channelInfo(msg, args, this.example);
    }
}