const { bot, emojiType } = require('../../config.js');
const { ApplicationCommandOptionType } = require('discord.js');
const AliasCancels = require("../../helpers/cancels");
const AliasEmbeds = require("../../helpers/embeds");
const AliasUtils = require("../../helpers/utils");

module.exports = {
    name: "ban",
    description: "Ban a user",
    type: "Moderation",
    botPerms: ["banMembers"],
    memPerms: ["banMembers"],
    args: [
        { name: "option", type: "soft|harsh", required: true },
        { name: "user", type: "user-mention|id", required: true },
        { name: "reason", type: "phrase", required: true },
    ],
    msgCommand: {
        exist: true,
        usage: bot.prefix + "ban [option:(soft/harsh)] [user:us-me|id] [reason:ph]"
    },
    intCommand: {
        exist: false,
        options: [
            {
                name: "option",
                description: "Choose soft or harsh",
                type: ApplicationCommandOptionType.String,
                required: true,
            },
            {
                name: "user",
                description: "The user to ban",
                type: ApplicationCommandOptionType.User,
                required: true,
            },
            {
                name: "reason",
                description: "The reason to ban",
                type: ApplicationCommandOptionType.String,
                required: true,
            }
        ]
    },

    async msgRun(msg, args, alias) {
        const option = await args[0];
        const issuer = await msg.member;
        const user = await msg.guild.members.cache.get(args[1]) ?? await msg.guild.members.cache.get(msg.mentions.users.first()?.id);
        let reason = await args.slice(2).join(" ");

        try {
            const Ban = await this.Ban(option, issuer, user, reason);
            AliasUtils.sendEmbedAlias(msg, Ban);

            if (Ban.toJSON().title.includes('BANNED USER')) AliasUtils.sendEmbedUser(alias, user, `banned`, reason);
        } catch {
            AliasUtils.sendErrorAlias(msg, this.name);
        }
        msg.delete();
    },

    async intRun(int) {
        const option = await int.options.getString('option');
        const issuer = await int.member;
        const user = await int.options.getUser('user');

        try {
            const Ban = await this.Ban(option, issuer, user, reason);
            AliasUtils.sendEmbedAlias(int, Ban);

            if (Ban.toJSON().title.includes('BANNED USER')) AliasUtils.sendEmbedUser(alias, user, `banned`, reason);
        } catch {
            AliasUtils.sendErrorAlias(int, this.name);
        }
    },

    async Ban(option, issuer, user, reason) {
        if (!option) return AliasCancels.invalid(`No Option`, `I need to know whether to soft or harsh ban \n(option (soft/harsh))`, this.msgCommand.usage);
        if (option != `soft` && option != `harsh`) return AliasCancels.unabled(`Need a valid option`, `The options are either soft or harsh \n Soft: only bans | Harsh: bans and deletes messages`);
        if (!user) return AliasCancels.invalid(`No User`, `I need a user in order to ban someone \n(${this.args[1].type})`, this.msgCommand.usage);
        if (!reason) return AliasCancels.invalid(`No Reason`, `You must have a reason to ban them \n(${this.args[2].type})`, this.msgCommand.usage);

        if (!AliasUtils.userInteract(issuer, user)) return AliasCancels.unabled(`Not Bannable`, `The user you are trying to ban cannot be banned by you`);

        if (option == `soft`) {
            console.log(`soft`)
            //await user.ban({ reason: reason });
        } else if (option == `harsh`) {
            console.log(`harsh`)
            //await user.ban({ deleteMessageSeconds: 60 * 60 * 24 * 7, reason: reason });
        }
        const Ban = AliasEmbeds.embedSuccess("BANNED USER", emojiType.user, emojiType.no, this.type, [
            { name: "Banned User", value: `\`\`\`${user.user.tag}\`\`\`` },
            { name: "Reason", value: `\`\`\`${reason}\`\`\`` },
            { name: "By", value: `\`\`\`${issuer.user.tag}\`\`\`` }
        ])
        return Ban;
    }
}