const { bot, emojiType } = require('../../config.js');
const { ApplicationCommandOptionType } = require('discord.js');
const AliasCancels = require("../../helpers/cancels");
const AliasEmbeds = require("../../helpers/embeds");
const AliasUtils = require("../../helpers/utils");

module.exports = {
    name: "kick",
    description: "Kick a user",
    type: "Moderation",
    botPerms: ["kickMembers"],
    memPerms: ["kickMembers"],
    args: [
        { name: "user", type: "user-mention|id", required: true },
        { name: "reason", type: "phrase", required: true },
    ],
    msgCommand: {
        exist: true,
        usage: bot.prefix + "kick [user:us-me|id] [reason:ph]",
    },
    intCommand: {
        exist: false,
        options: [
            {
                name: "user",
                description: "The user to kick",
                type: ApplicationCommandOptionType.User,
                required: true,
            },
            {
                name: "reason",
                description: "The reason to kick",
                type: ApplicationCommandOptionType.String,
                required: true,
            }
        ]
    },

    async msgRun(msg, args){
        const issuer = await msg.member;
        const user = await msg.guild.members.cache.get(args[0]) ?? await msg.guild.members.cache.get(msg.mentions.users.first()?.id);
        const reason = await args.slice(1).join(" ");
    
        try {
            const Kick = await this.Kick(issuer, user, reason);
            AliasUtils.sendEmbedAlias(msg, Kick);

            if (Ban.toJSON().title.includes('KICKED USER')) AliasUtils.sendEmbedUser(alias, user, `kicked`, reason);
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
            const Kick = await this.Kick(issuer, user, reason);
            AliasUtils.sendEmbedAlias(int, Kick);

            if (Kick.toJSON().title.includes('KICKED USER')) AliasUtils.sendEmbedUser(alias, user, `kicked`, reason);
        } catch {
            AliasUtils.sendErrorAlias(int, this.name);
        }
    },

    async Kick(issuer, user, reason) {
        if (!user) return AliasCancels.invalid(`No User`, `I need a user in order to kick them \n(${this.args[0].type})`, this.msgCommand.usage);
        if (!reason) return AliasCancels.invalid(`No Reason`, `I need a reason in order to kick someone \n(${this.args[1].type})`, this.msgCommand.usage);

        if (!userInteract(issuer, user)) return AliasCancels.unabled(`Not Kickable`, `The user you are trying to kick cannot be kicked by you`);

        //await user.kick(reason);
        const Kick = AliasEmbeds.embedSuccess("KICKED USER", emojiType.user, "outbox_tray", this.type, [
            { name: "Kicked Member", value: `\`\`\`${user.user.tag}\`\`\`` },
            { name: "Reason", value: `\`\`\`${reason}\`\`\``},
            { name: "By", value: `\`\`\`${issuer.user.tag}\`\`\``}
        ])
        return Kick;
    }
}