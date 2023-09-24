const { bot, emojiType, colorEmbed } = require('../../config.js');
const { ApplicationCommandOptionType } = require('discord.js');
const AliasCancels = require("../../helpers/cancels");
const AliasEmbeds = require("../../helpers/embeds");
const AliasUtils = require("../../helpers/utils");

module.exports = {
    name: "warn",
    description: "Warn someone",
    type: "Moderation",
    botPerms: ["manageGuild"],
    memPerms: ["manageGuild"],
    args: [
        { name: "user", type: "user-mention|id", required: true },
        { name: "warning", type: "phrase", required: true },
    ],
    msgCommand: {
        exist: true,
        usage: bot.prefix + "warn [user:us-me|id] [warning:ph]"
    },
    intCommand: {
        exist: false,
        options: [
            {
                name: "user",
                description: "The user to warn",
                type: ApplicationCommandOptionType.User,
                required: true,
            },
            {
                name: "warning",
                description: "The warning",
                type: ApplicationCommandOptionType.String,
                required: true,
            }
        ]
    },

    async msgRun(msg, args, alias) {
        const issuer = await msg.member;
        const user = await msg.guild.members.cache.get(args[0]) ?? await msg.guild.members.cache.get(msg.mentions.users.first()?.id);
        const warning = await args.slice(1).join(" ");

        try {
            const Warn = await this.Warn(issuer, user, warning);
            AliasUtils.sendEmbedAlias(msg, Warn);

            if (Warn.toJSON().title.includes('WARNED USER')) AliasUtils.sendEmbedUser(alias, user, `warned`, warning);
        } catch (e) {
            console.log(e)
            AliasUtils.sendErrorAlias(msg, this.name);
        }
        msg.delete();
    },

    async intRun(int) {
        const issuer = await int.member;
        const user = await int.options.getUser('user');
        const warning = await int.options.getString('warning');

        try {
            const Warn = await this.Warn(issuer, user, warning);
            AliasUtils.sendEmbedAlias(int, Warn);

            if (Warn.toJSON().title.includes('WARNED USER')) AliasUtils.sendEmbedUser(alias, user, `warned`, warning);
        } catch {
            AliasUtils.sendErrorAlias(int, this.name);
        }
    },

    async Warn(issuer, user, warning) {
        if (!user) return AliasCancels.invalid(`No User`, `I need a user in order to ban someone \n(${this.args[0].type})`, this.msgCommand.usage);
        if (!warning) return AliasCancels.invalid(`No Warning`, `If there is no warning, then why warn them? \n(${this.args[1].type})`, this.msgCommand.usage);

        if (!AliasUtils.userInteract(issuer, user)) return AliasCancels.unabled(`Not Warnable`, `The user you are trying to warn cannot be warned by you`);

        const Warn = AliasEmbeds.embedSuccess("WARNED USER", emojiType.user, emojiType.warning, this.type, [
            { name: "Warned User", value: `\`\`\`${user.user.tag}\`\`\`` },
            { name: "Warning", value: `\`\`\`${warning}\`\`\`` },
            { name: "By", value: `\`\`\`${issuer.user.tag}\`\`\`` }
        ])
        return Warn;
    }
}