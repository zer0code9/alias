const { bot, emojiType } = require('../config.js');
const { ApplicationCommandOptionType } = require('discord.js');
const AliasCancels = require("../helpers/cancels.js");
const AliasEmbeds = require("../helpers/embeds.js");
const AliasUtils = require("../helpers/utils.js");

module.exports = {
    name: "unmute",
    description: "Unmute a user in voice",
    type: "Moderation",
    botPerms: ["muteMembers"],
    memPerms: ["muteMembers"],
    args: [
        { name: "user", type: "user-mention|id", required: true },
    ],
    msgCommand: {
        exist: true,
        usage: bot.prefix + "unmute [user:us-me|id]",
    },
    intCommand: {
        exist: false,
        options: [
            {
                name: "user",
                description: "The user to unmute",
                type: ApplicationCommandOptionType.User,
                required: true,
            }
        ]
    },

    async msgRun(msg, args){
        const issuer = await msg.member;
        const user = await msg.guild.members.cache.get(args[0]) ?? await msg.guild.members.cache.get(msg.mentions.users.first()?.id);

        try {
            const Unmute = await this.Unmute(issuer, user);
            AliasUtils.sendEmbedAlias(msg, Unmute);
        } catch {
            AliasUtils.sendErrorAlias(msg, this.name);
        }
        msg.delete();
    },

    async intRun(int) {
        const issuer = await int.member;
        const user = await int.options.getUser('user');

        try {
            const Unmute = await this.Unmute(issuer, user);
            AliasUtils.sendEmbedAlias(int, Unmute);
        } catch {
            AliasUtils.sendErrorAlias(int, this.name);
        }
    },

    async Unmute(issuer, user) {
        if (!user) return AliasCancels.invalid('No User', `I need a user in order to unmute them \n(${this.args[0].type})`, this.msgCommand.usage);

        // await user.voice.setMute(false);
        const Unmute = AliasEmbeds.embedSuccess("UNMUTED USER", emojiType.user, "speaker", this.type, [
            { name: "Umuted Member", value: `\`\`\`${user.user.id}\`\`\`` },
            { name: `By`, value: `\`\`\`${issuer.user.id}\`\`\`` }
        ])
        return Unmute;
    }
}