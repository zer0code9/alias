const { bot, emojiType } = require('../config.js');
const { ApplicationCommandOptionType } = require('discord.js');
const AliasCancels = require("../helpers/cancels.js");
const AliasEmbeds = require("../helpers/embeds.js");
const AliasUtils = require("../helpers/utils.js");
const AliasTemps = require('../helpers/temps.js');

module.exports = {
    name: "channel",
    description: "Get info on a channel",
    type: "Info",
    botPerms: [],
    memPerms: [],
    args: [
        { name: "channel", type: "channel-mention|id", required: true }
    ],
    msgCommand: {
        exist: true,
        usage: bot.prefix + "channel [channel:ch-me|id]",
    },
    intCommand: {
        exist: true,
        options: [
            {
                name: "channel",
                description: "The channel to get info on",
                type: ApplicationCommandOptionType.Channel,
                required: true,
            }
        ]
    },
    
    async msgRun(msg, args) {
        const channel = await msg.guild.channels.cache.get(args[0]) ?? msg.guild.channels.cache.get(msg.mentions.channels.first()?.id);

        try {
            const Info = await this.Channel(msg, channel);
            AliasUtils.sendEmbed(msg, Info);
        } catch {
            AliasUtils.sendError(msg, this.name);
        }

        msg.delete();
    },

    async intRun(int) {
        const channel = int.options.getChannel('channel');

        try {
            const Info = await this.Channel(int, channel);
            AliasUtils.sendEmbed(int, Info);
        } catch {
            AliasUtils.sendError(int, this.name);
        }
    },

    async Channel(type, channel) {
        if (!channel) return AliasCancels.invalid(`No Channel`, `I need a channel in order to return info about it \n(${this.args[0].type})`, this.msgCommand.usage);

        const guildTypes = {
            0: "Text",
            1: "DM",
            2: "Voice",
            3: "Group DM",
            4: "Category",
            5: "Announcement/News",
            10: "News Thread",
            11: "Public Thread",
            12: "Private Thread",
            13: "Stage",
            14: "Directory",
            15: "Forum",
        }
    
        const Info = AliasEmbeds.embedInfo("CHANNEL INFO", emojiType.channel,
        [
                { name: "Name", value: `\`\`\`${channel.name}\`\`\``, inline: true },
                { name: "Id", value: `\`\`\`${channel.id}\`\`\``, inline: true },
            { name: "Created on", value: `\`\`\`${channel.createdAt.toDateString()} (${AliasTemps.timeDifference(channel.createdTimestamp)})\`\`\`` },
                { name: "Type", value: `\`\`\`${guildTypes[channel.type] ?? channel.type}\`\`\``, inline: true},
                { name: "Parent", value: `\`\`\`${type.guild.channels.cache.get(channel.parentId)?.name ?? `No Parent`}\`\`\``, inline: true },
                { name: "Topic", value: `\`\`\`${channel.topic ?? `No Topic`}\`\`\``, inline: true },
                { name: "Is NSFW", value: `\`\`\`${channel.nsfw ? `Yes` : `No`}\`\`\``, inline: true }
        ])
        return Info;
    }
}