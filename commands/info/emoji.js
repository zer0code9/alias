const { bot, emojiType } = require('../../config.js');
const { ApplicationCommandOptionType } = require('discord.js');
const AliasCancels = require("../../helpers/cancels");
const AliasEmbeds = require("../../helpers/embeds");
const AliasUtils = require("../../helpers/utils");
const AliasTemps = require('../../helpers/temps');

module.exports = {
    name: "emoji",
    description: "Get info on an emoji",
    type: "Info",
    botPerms: [],
    memPerms: [],
    args: [
        { name: "emoji", type: "emoji-id", required: true }
    ],
    msgCommand: {
        exist: true,
        usage: bot.prefix + "emoji [emoji:em-id]",
    },
    intCommand: {
        exist: true,
        options: [
            {
                name: "emoji",
                description: "The emojo's id",
                type: ApplicationCommandOptionType.String,
                required: true,
            }
        ]
    },

    async msgRun(msg, args) {
        const emoji = await msg.guild.emojis.cache.get(args[0]);
    
        try {
            const Info = await this.Emoji(emoji);
            AliasUtils.sendEmbed(msg, Info);
        } catch {
            AliasUtils.sendError(msg, this.name);
        }
        msg.delete();
    },

    async intRun(int) {
        const emoji = int.guild.emojis.cache.get(int.options.getChannel('emoji'));

        try {
            const Info = await this.Emoji(emoji);
            AliasUtils.sendEmbed(int, Info);
        } catch {
            AliasUtils.sendError(int, this.name);
        }
    },

    async Emoji(emoji) {
        if (!emoji) return AliasCancels.invalid(`No Emoji`, `I need an emoji in order to return info about it \n(${this.args[0].type})`, this.msgCommand.usage);

        const Info = AliasEmbeds.embedInfo("EMOJI INFO", emojiType.emoji,
        [
                { name: "Username", value: `\`\`\`${emoji.name}\`\`\``, inline: true },
                { name: "Id", value: `\`\`\`${emoji.id}\`\`\``, inline: true },
            { name: "Created on", value: `\`\`\`${emoji.createdAt.toDateString()} (${AliasTemps.timeDifference(emoji.createdTimestamp)})\`\`\`` },
            { name: "Identifier", value: `\`\`\`${emoji.identifier}\`\`\`` },
            { name: "Is Animated", value: `\`\`\`${emoji.animated ? `Yes` : `No`}\`\`\`` },
            { name: "URL", value: `\`\`\`${emoji.url}\`\`\`` }
        ])
        return Info;
    }
}