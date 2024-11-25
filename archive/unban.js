const { bot, emojiType } = require('../config.js');
const { ApplicationCommandOptionType } = require('discord.js');
const AliasCancels = require("../helpers/cancels.js");
const AliasEmbeds = require("../helpers/embeds.js");
const AliasUtils = require("../helpers/utils.js");

module.exports = {
    name: "unban",
    description: "Unban someone",
    type: "Moderation",
    botPerms: ["banMembers"],
    memPerms: ["banMembers"],
    args: [
        { name: "user", type: "user-id", required: true },
        { name: "reason", type: "phrase", required: true },
    ],
    msgCommand: {
        exist: true,
        usage: bot.prefix + "unban [user:us-id] [reason:ph]"
    },
    intCommand: {
        exist: false,
        options: [
            {
                name: "user",
                description: "The user to unban",
                type: ApplicationCommandOptionType.User,
                required: true,
            },
            {
                name: "reason",
                description: "The reason to unban",
                type: ApplicationCommandOptionType.String,
                required: true,
            }
        ]
    },

    async msgRun(msg, args){
        const issuer = await msg.member;
        const user = await msg.guild.members.cache.get(args[0]);
        const reason = await args.slice(1).join(" ");
    
        try {
            const Unban = await this.Unban(issuer, user, reason);
            AliasUtils.sendEmbedAlias(msg, Unban);
        } catch {
            AliasUtils.sendErrorAlias(msg, this.name);
        }
        msg.delete();
    },

    async intRun(int) {
        const issuer = await int.member;
        const user = await int.options.getUser('user');
        const reason = await int.options.getString('reason');

        try {
            const Unban = await this.Unban(issuer, user, reason);
            AliasUtils.sendEmbedAlias(int, Unban);
        } catch {
            AliasUtils.sendErrorAlias(int, this.name);
        }
    },

    async Unban(issuer, user, reason) {
        if (!user) return AliasCancels.invalid(`No Id`, `I need a valid id in order to unban someone \n(${this.args[0].type})`, this.msgCommand.usage);
        if (!reason) return AliasCancels.invalid(`No Reason`, `You must have a reason to unban them \n(${this.args[1].type})`, this.msgCommand.usage);

        //await issuer.guild.bans.remove(target, reason);
        const Unban = AliasEmbeds.embedSuccess("UNBANNED USER", emojiType.user, "o", this.type, [
            { name: "Unbanned User", value: `\`\`\`${user.user.tag}\`\`\`` },
            { name: "Reason", value: `\`\`\`${reason}\`\`\`` },
            { name: "By", value: `\`\`\`${issuer.user.tag}\`\`\`` }
        ])
        return Unban;
    }
}