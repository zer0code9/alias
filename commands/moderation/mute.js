const { bot, emojiType } = require('../../config.js');
const { ApplicationCommandOptionType } = require('discord.js');
const AliasCancels = require("../../helpers/cancels");
const AliasEmbeds = require("../../helpers/embeds");
const AliasUtils = require("../../helpers/utils");

module.exports = {
    name: "mute",
    id: "205188921806",
    description: "Mute a user in a voice channel",
    type: "Moderation",
    botPerms: ["muteMembers"],
    memPerms: ["muteMembers"],
    args: [
        { name: "user", type: "user-mention|id", required: true },
        { name: "reason", type: "phrase", required: true },
    ],
    msgCommand: { exist: true, },
    intCommand: { exist: true, },
    settings: {
        existMsg: true,
        existInt: true,
        sub: true,
        options: [
            {
                name: "create",
                description: "Create a mute for a user",
                type: ApplicationCommandOptionType.Subcommand,
                options: [
                    {
                        name: "user",
                        description: "The user to mute [user]",
                        type: ApplicationCommandOptionType.User,
                        specific: "user",
                        options: [],
                        required: true,
                    },
                    {
                        name: "reason",
                        description: "The reason for mute [phrase]",
                        type: ApplicationCommandOptionType.String,
                        specific: "phrase",
                        options: [],
                        required: true,
                    }
                ],
            },
            {
                name: "delete",
                description: "Delete a mute from a user",
                type: ApplicationCommandOptionType.Subcommand,
                options: [
                    {
                        name: "user",
                        description: "The user to unmute [user]",
                        type: ApplicationCommandOptionType.User,
                        specific: "user",
                        options: [],
                        required: true,
                    },
                    {
                        name: "reason",
                        description: "The reason for unmute [phrase]",
                        type: ApplicationCommandOptionType.String,
                        specific: "phrase",
                        options: [],
                        required: true,
                    }
                ],
            }
        ]
    },

    async msgRun(msg, args){
        const action = args[0];

        if (action == "create") {
            const issuer = await msg.member;
            const user = await msg.guild.members.cache.get(args[0]) ?? await msg.guild.members.cache.get(msg.mentions.users.first()?.id);
            const reason = await args.slice(1).join(" ");

            try {
                const Create = await this.Create(issuer, user, reason);
                AliasUtils.sendEmbedAlias(msg, Create);
                if (Create.toJSON().title.includes('MUTEDED USER')) AliasUtils.sendEmbedUser(alias, user, `muted`, reason);
            } catch {
                AliasUtils.sendErrorAlias(msg, this.name);
            }
        }

        else if (action == "delete") {
            const issuer = await msg.member;
            const user = await msg.guild.members.cache.get(args[0]) ?? await msg.guild.members.cache.get(msg.mentions.users.first()?.id);
            const reason = await args.slice(1).join(" ");

            try {
                const Delete = await this.Delete(issuer, user, reason);
                AliasUtils.sendEmbedAlias(msg, Delete);
            } catch {
                AliasUtils.sendErrorAlias(msg, this.name);
            }
        }

        else {
            const Invalid = AliasEmbeds.embed(colorEmbed.warning, "Invalid Action", this.type, [
                { name: `Unknown Action Used`, value: `I don't know the action ${action}` },
                { name: "Possible Actions", value: `create | delete `}
            ], bot.name + " helps");
            AliasUtils.sendEmbedAlias(msg, Invalid);
        }

        msg.delete();
    },

    async intRun(int) {
        const action = await int.options.getSubcommand();

        if (action == "create") {
            const issuer = await int.member;
            const user = await int.options.getUser('user');
            const reason = await int.options.getString('reason');
            
            try {
                const Create = await this.Create(issuer, user, reason);
                AliasUtils.sendEmbedAlias(int, Create);
            } catch {
                AliasUtils.sendErrorAlias(int, this.name);
            }
        }

        else if (action == "delete") {
            const issuer = await int.member;
            const user = await int.options.getUser('user');
            const reason = await int.options.getString('reason');
            
            try {
                const Delete = await this.Delete(issuer, user, reason);
                AliasUtils.sendEmbedAlias(int, Delete);
            } catch {
                AliasUtils.sendErrorAlias(int, this.name);
            }
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
    },

    async Create(issuer, user, reason) {
        const settings = this.settings.options[0];
        if (!user) return AliasCancels.invalid('No User', `I need a user in order to mute them \n(${settings.options[0].specific})`, AliasUtils.getUsage(this, "create"));
        if (!reason) return AliasCancels.invalid('No Reason', `You must have a reason to mute them \n(${settings.options[1].specific})`, AliasUtils.getUsage(this, "create"));

        //await user.voice.setMute(true, reason);
        const Create = AliasEmbeds.embedSuccess("MUTED USER", emojiType.user, "mute", this.type, [
            { name: "Muted User", value: `\`\`\`${user.user.id}\`\`\`` },
            { name: "On Channel", value: `\`\`\`${user.voice.channel.name}\`\`\`` },
            { name: "Reason", value: `\`\`\`${reason}\`\`\`` },
            { name: `By`, value: `\`\`\`${issuer.user.id}\`\`\`` }
        ])
        return Create;
    },

    async Delete(issuer, user, reason) {
        const settings = this.settings.options[1];
        if (!user) return AliasCancels.invalid('No User', `I need a user in order to unmute them \n(${settings.options[0].specific})`, AliasUtils.getUsage(this, "delete"));
        if (!reason) return AliasCancels.invalid('No Reason', `You must have a reason to unmute them \n(${settings.options[1].specific})`, AliasUtils.getUsage(this, "delete"));

        //await user.voice.setMute(false);
        const Delete = AliasEmbeds.embedSuccess("UNMUTED USER", emojiType.user, "unmute", this.type, [
            { name: "Unmuted User", value: `\`\`\`${user.user.id}\`\`\`` },
            { name: "Reason", value: `\`\`\`${reason}\`\`\`` },
            { name: `By`, value: `\`\`\`${issuer.user.id}\`\`\`` }
        ])
        return Delete;
    }
}