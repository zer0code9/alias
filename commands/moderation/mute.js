const { bot, emojiType } = require('../../config.js');
const { ApplicationCommandOptionType } = require('discord.js');
const AliasCancels = require("../../helpers/cancels");
const AliasEmbeds = require("../../helpers/embeds");
const AliasUtils = require("../../helpers/utils");

module.exports = {
    name: "mute",
    description: "Mute a user in a voice channel",
    type: "Moderation",
    botPerms: ["muteMembers"],
    memPerms: ["muteMembers"],
    args: [
        { name: "user", type: "user-mention|id", required: true },
        { name: "reason", type: "phrase", required: true },
    ],
    msgCommand: {
        exist: true,
        usage: bot.prefix + "mute [user:us-me|id] [reason:ph]",
    },
    intCommand: {
        exist: false,
        options: [
            {
                name: "user",
                description: "The user to mute",
                type: ApplicationCommandOptionType.User,
                required: true,
            },
            {
                name: "reason",
                description: "The reason to mute",
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
            const Mute = await this.Mute(issuer, user, reason);
            AliasUtils.sendEmbedAlias(msg, Mute);

            if (Ban.toJSON().title.includes('MUTED USER')) AliasUtils.sendEmbedUser(alias, user, `muted`, reason);
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
            const Mute = await this.Mute(issuer, user, reason);
            AliasUtils.sendEmbedAlias(int, Mute);

            if (Mute.toJSON().title.includes('MUTED USER')) AliasUtils.sendEmbedUser(alias, user, `muted`, reason);
        } catch {
            AliasUtils.sendErrorAlias(int, this.name);
        }
    },

    async Mute(issuer, user, reason) {
        if (!user) return AliasCancels.invalid('No User', `I need a user in order to mute them \n(${this.args[0].type})`, this.msgCommand.usage);
        if (!reason) return AliasCancels.invalid('No Reason', `You must have a reason to mute them \n(${this.args[1].type})`, this.msgCommand.usage);

        if (!AliasUtils.userInteract(issuer, user)) return AliasCancels.unabled(`Not Mutable`, `The user you are trying to mute cannot be muted by you`);
        if (user.voice.serverMute) return AliasCancels.unabled(`Already Muted`, `The user is already muted`);

        //await user.voice.setMute(true, reason);
        const Mute = AliasEmbeds.embedSuccess("MUTED USER", emojiType.user, "mute", this.type, [
            { name: "Muted User", value: `\`\`\`${user.user.id}\`\`\`` },
            { name: "On Channel", value: `\`\`\`${user.voice.channel.name}\`\`\`` },
            { name: "Reason", value: `\`\`\`${reason}\`\`\`` },
            { name: `By`, value: `\`\`\`${issuer.user.id}\`\`\`` }
        ])
        return Mute;
    }
}