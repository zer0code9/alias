const { bot, emojiType } = require('../../config.js');
const { ApplicationCommandOptionType } = require('discord.js');
const AliasCancels = require("../../helpers/cancels");
const AliasEmbeds = require("../../helpers/embeds");
const AliasUtils = require("../../helpers/utils");

module.exports = {
    name: "kick",
    id: "308795241268",
    description: "Kick a user",
    type: "Moderation",
    botPerms: ["kickMembers"],
    memPerms: ["kickMembers"],
    args: [
        { name: "user", type: "user-mention|id", required: true },
        { name: "reason", type: "phrase", required: true },
    ],
    msgCommand: { exist: true },
    intCommand: { exist: true },
    settings: {
        existMsg: true,
        existInt: true,
        sub: false,
        options: [
            {
                name: "user",
                description: "The user to kick [user]",
                type: ApplicationCommandOptionType.User,
                specific: "user",
                options: [],
                required: true,
            },
            {
                name: "reason",
                description: "The reason to kick [phrase]",
                type: ApplicationCommandOptionType.String,
                specific: "phrase",
                options: [],
                required: true,
            }
        ]
    },

    async msgRun(msg, args) {
        const issuer = await msg.member;
        const user = await msg.guild.members.cache.get(args[0]) ?? await msg.guild.members.cache.get(msg.mentions.users.first()?.id);
        const reason = await args.slice(1).join(" ");
    
        try {
            const Kick = await this.Kick(issuer, user, reason);
            AliasUtils.sendEmbedAlias(msg, Kick);
            if (Kick.toJSON().title.includes('KICKED USER')) AliasUtils.sendEmbedUser(alias, user, `kicked`, reason);
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
        const settings = this.settings;
        if (!user)
return AliasCancels.invalid(`No User`, `I need a user in order to kick them \n(${settings.options[0].specific})`, AliasUtils.getUsage(this));
        if (!reason)
return AliasCancels.invalid(`No Reason`, `I need a reason in order to kick someone \n(${settings.options[1].specific})`, AliasUtils.getUsage(this));

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