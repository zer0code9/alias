const { bot, emojiType } = require('../config.js');
const { ApplicationCommandOptionType } = require('discord.js');
const AliasEmbeds = require("../helpers/embeds.js");
const AliasUtils = require("../helpers/utils.js");
const AliasTemps = require('../helpers/temps.js');

module.exports = {
    name: "user",
    description: "Get info on a user",
    type: "Info",
    botPerms: [],
    memPerms: [],
    args: [
        { name: "user", type: "user-mention|id", required: false }
    ],
    msgCommand: {
        exist: true,
        usage: bot.prefix + "user [user:us-me|id?]",
    },
    intCommand: {
        exist: true,
        options: [
            {
                name: "user",
                description: "The user to get info on",
                type: ApplicationCommandOptionType.User,
                required: false,
            }
        ]
    },

    async msgRun(msg, args) {
        const user = await msg.guild.members.cache.get(args[0]) ?? await msg.guild.members.cache.get(msg.mentions.users.first()?.id);
        
        try {
            const Info = await this.User(msg, user);
            AliasUtils.sendEmbed(msg, Info);
        } catch {
            AliasUtils.sendError(msg, this.name);
        }
        msg.delete();
    },

    async intRun(int) {
        let user = int.options.getUser('user');

        try {
            const Info = await this.User(int, user);
            AliasUtils.sendEmbed(int, Info);
        } catch {
            AliasUtils.sendError(int, this.name);
        }
    },

    async User(type, user) {
        if (!user) user = await type.member;

        const Info = AliasEmbeds.embedInfo("USER INFO", emojiType.user,
        [
                { name: "Name", value: `\`\`\`${user.user.tag}\`\`\``, inline: true },
                { name: "Id", value: `\`\`\`${user.user.id}\`\`\``, inline: true },
            { name: "Created on", value: `\`\`\`${user.user.createdAt.toDateString()} (${AliasTemps.timeDifference(user.user.createdTimestamp)})\`\`\`` },
            { name: "Joined on", value: `\`\`\`${user.joinedAt.toDateString()} (${AliasTemps.timeDifference(user.joinedTimestamp)})\`\`\`` },
                { name: "Nickname", value: `\`\`\`${user.nickname ?? `No nickname`}\`\`\``, inline: true },
                { name: "Is Bot", value: `\`\`\`${user.user.bot ? `Yes` : `No`}\`\`\``, inline: true },
        ])
        return Info;
    }
}