const { bot, emojiType } = require('../config.js');
const { ApplicationCommandOptionType } = require('discord.js');
const AliasCancels = require("../helpers/cancels.js");
const AliasEmbeds = require("../helpers/embeds.js");
const AliasUtils = require("../helpers/utils.js");

module.exports = {
    name: "timeout",
    id: "963393912460",
    description: "Timeout a user",
    type: "Moderation",
    botPerms: ["muteMembers"],
    memPerms: ["muteMembers"],
    args: [
        { name: "user", type: "user-mention|id", required: true },
        { name: "time", type: "seconds", required: true },
        { name: "reason", type: "phrase", required: true },
    ],
    msgCommand: {
        exist: true,
        usage: bot.prefix + "timeout [user:us-me|id] [time:se] [reason:ph]",
    },
    intCommand: {
        exist: false,
        options: [
            {
                name: "user",
                description: "The user to timeout",
                type: ApplicationCommandOptionType.User,
                required: true,
            },
            {
                name: "time",
                description: "The time for timeout in seconds",
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
            {
                name: "reason",
                description: "The reason to timeout",
                type: ApplicationCommandOptionType.String,
                required: true,
            }
        ]
    },

    async msgRun(msg, args){
        const issuer = await msg.member;
        const user = await msg.guild.members.cache.get(args[0]) ?? await msg.guild.members.cache.get(msg.mentions.users.first()?.id);
        const time = await args[1];
        const reason = await args.slice(1).join(" ");

        try {
            const Timeout = await this.Timemout(issuer, user, time, reason);
            AliasUtils.sendEmbedAlias(msg, Timeout);

            if (Ban.toJSON().title.includes('TIMED OUT USER')) AliasUtils.sendEmbedUser(alias, user, `timed out`, reason);
        } catch {
            AliasUtils.sendErrorAlias(msg, this.name);
        }
        msg.delete();
    },

    async intRun(int) {
        const issuer = await int.member;
        const user = await int.options.getUser('user');
        const time = await int.options.getNumber('time');
        const reason = await int.options.getString('reason');

        try {
            const Timeout = await this.Timemout(issuer, user, time, reason);
            AliasUtils.sendEmbedAlias(int, Timeout);

            if (Timeout.toJSON().title.includes('TIMED OUT USER')) AliasUtils.sendEmbedUser(alias, user, `timed out`, reason);
        } catch {
            AliasUtils.sendErrorAlias(int, this.name);
        }
    },

    async Timemout(issuer, user, time, reason) {
        if (!user) return AliasCancels.invalid(`No User`, `I need a user in order to timeout them \n(${this.args[0].type})`, this.msgCommand.usage);
        if (!time) return AliasCancels.invalid(`No time`, `I need a time to timeout the user \n(${this.args[1].type})`, this.msgCommand.usage);
        if (!reason) return AliasCancels.invalid(`No Reason`, `You must have a reason to timeout them \n(${this.args[2].type})`, this.msgCommand.usage);

        if (!userInteract(issuer, user)) return AliasCancels.unabled(`Not Manageable`, `The user you are trying to timeout cannot be timed out by you`);

        //await user.timeout(time * 1000, reason);
        const Timeout = AliasEmbeds.embedSuccess("TIMED OUT USER", emojiType.user, "no_bell", this.type, [
            { name: "Timed out User", value: `\`\`\`${user.user.id}\`\`\`` },
            { name: "For", value: `\`\`\`${time * 1000} seconds\`\`\`` },
            { name: "Reason", value: `\`\`\`${reason}\`\`\`` },
            { name: `By`, value: `\`\`\`${issuer.user.id}\`\`\`` }
        ])
        return Timeout;
    }
}