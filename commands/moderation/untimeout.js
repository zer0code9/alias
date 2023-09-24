const { bot, emojiType } = require('../../config.js');
const { ApplicationCommandOptionType } = require('discord.js');
const AliasCancels = require("../../helpers/cancels");
const AliasEmbeds = require("../../helpers/embeds");
const AliasUtils = require("../../helpers/utils");

module.exports = {
    name: "untimeout",
    description: "Revoke a timeout for a user",
    type: "Moderation",
    botPerms: ["muteMembers"],
    memPerms: ["muteMembers"],
    args: [
        { name: "user", type: "user-mention|id", required: true },
    ],
    msgCommand: {
        exist: true,
        usage: bot.prefix + "untimeout [user:us-me|id]"
    },
    intCommand: {
        exist: false,
        options: [
            {
                name: "user",
                description: "The user to timeout",
                type: ApplicationCommandOptionType.User,
                required: true,
            }
        ]
    },

    async msgRun(msg, args){
        const issuer = await msg.member;
        const user = await msg.guild.members.cache.get(args[0]) ?? await msg.guild.members.cache.get(msg.mentions.users.first()?.id);

        try {
            const Untimeout = await this.Untimemout(issuer, user);
            AliasUtils.sendEmbedAlias(msg, Untimeout);
        } catch {
            AliasUtils.sendErrorAlias(msg, this.name);
        }
        msg.delete();
    },

    async intRun(int) {
        const issuer = await int.member;
        const user = await int.options.getUser('user');

        try {
            const Untimeout = await this.Untimemout(issuer, user);
            AliasUtils.sendEmbedAlias(int, Untimeout);
        } catch {
            AliasUtils.sendErrorAlias(int, this.name);
        }
    },

    async Untimeout(issuer, user) {
        if (!user) return AliasCancels.invalid(`No User`, `I need a user in order to timeout them \n(${this.args[0].type})`, this.msgCommand.usage);

        //await user.timeout(0);
        const Untimeout = AliasEmbeds.embedSuccess("UNTIMED OUT USER", emojiType.user, "bell", this.type, [
            { name: "Timed out User", value: `\`\`\`${user.user.id}\`\`\`` },
            { name: `By`, value: `\`\`\`${issuer.user.id}\`\`\`` }
        ])
        return Untimeout;
    }
}