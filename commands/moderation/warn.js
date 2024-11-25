const { bot, emojiType, colorEmbed } = require('../../config.js');
const { ApplicationCommandOptionType } = require('discord.js');
const AliasCancels = require("../../helpers/cancels");
const AliasEmbeds = require("../../helpers/embeds");
const AliasUtils = require("../../helpers/utils");
const AliasDB = require("../../database/functions");

module.exports = {
    name: "warn",
    description: "Manage warnings",
    type: "Moderation",
    botPerms: ["manageGuild"],
    memPerms: ["manageGuild"],
    args: [
        { name: "user", type: "user-mention|id", required: true },
        { name: "warning", type: "phrase", required: true },
    ],
    msgCommand: { exist: true, },
    intCommand: { exist: false, },
    settings: {
        existMsg: true,
        existInt: false,
        sub: false,
        options: [
            {
                name: "create",
                description: "Create a warn for a user",
                type: ApplicationCommandOptionType.Subcommand,
                options: [
                    {
                        name: "user",
                        description: "The user to warn [user-mention|id]",
                        type: ApplicationCommandOptionType.User,
                        specific: "user-mention|id",
                        options: [],
                        required: true,
                    },
                    {
                        name: "warning",
                        description: "The warning for warn [string-phrase]",
                        type: ApplicationCommandOptionType.String,
                        specific: "string-phrase",
                        options: [],
                        required: true,
                    }
                ]
            },
            {
                name: "delete",
                description: "Delete a warn from a user",
                type: ApplicationCommandOptionType.Subcommand,
                options: [
                    {
                        name: "user",
                        description: "The user to unwarn [user-mention|id]",
                        type: ApplicationCommandOptionType.User,
                        specific: "user-mention|id",
                        options: [],
                        required: true,
                    },
                    {
                        name: "reason",
                        description: "The reason for unwarn [string-phrase]",
                        type: ApplicationCommandOptionType.String,
                        specific: "string-phrase",
                        options: [],
                        required: true,
                    }
                ]
            }
        ]
    },

    async msgRun(msg, args, alias) {
        const action = await args[0];

        if (action == "create") {
            const issuer = await msg.member;
            const user = await msg.guild.members.cache.get(args[1]) ?? await msg.guild.members.cache.get(msg.mentions.users.first()?.id);
            const warning = await args.slice(2).join(" ");

            try {
                const Create = await this.Create(issuer, user, warning);
                AliasUtils.sendEmbedAlias(msg, Create);
                AliasUtils.sendEmbedUser(user, `warned`, warning);
            } catch {
                AliasUtils.sendErrorAlias(msg, this.name);
            }
        }

        else if (action == "delete") {
            const issuer = await msg.member;
            const user = await msg.guild.members.cache.get(args[1]) ?? await msg.guild.members.cache.get(msg.mentions.users.first()?.id);
            const reason = await args.slice(2).join(" ");

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
            const warning = await int.options.getString('warning');

            try {
                const Create = await this.Create(issuer, user, warning);
                AliasUtils.sendEmbedAlias(int, Create);
                AliasUtils.sendEmbedUser(user, `warned`, warning);
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

    async Create(issuer, user, warning) {
        const settings = this.settings.options[0];
        if (!user) return AliasCancels.invalid(`No User`, `I need a user in order to warn someone \n(${settings.options[0].specific})`, AliasUtils.getUsage(this, "create"));
        if (!warning) return AliasCancels.invalid(`No Warning`, `If there is no warning, then why warn them? \n(${settings.options[1].specific})`, AliasUtils.getUsage(this, "create"));

        if (!AliasUtils.userInteract(issuer, user)) return AliasCancels.unabled(`Not Warnable`, `The user you are trying to warn cannot be warned by you`);

        const Create = AliasEmbeds.embedSuccess("WARNED USER", emojiType.user, emojiType.warning, this.type, [
            { name: "Warned User", value: `\`\`\`${user.user.tag}\`\`\`` },
            { name: "Warning", value: `\`\`\`${warning}\`\`\`` },
            { name: "By", value: `\`\`\`${issuer.user.tag}\`\`\`` }
        ])
        return Create;
    },

    async Delete(issuer, user, reason) {
        const settings = this.settings.options[1];
        if (!user) return AliasCancels.invalid(`No User`, `I need a user in order to unwarn someone \n(${settings.options[0].specific})`, AliasUtils.getUsage(this, "delete"));
        if (!reason) return AliasCancels.invalid(`No Reason`, `You must have a reason to unwarn them \n(${settings.options[1].specific})`, AliasUtils.getUsage(this, "delete"));

        const Delete = AliasEmbeds.embedSuccess("UNWARNED USER", emojiType.user, emojiType.warning, this.type, [
            { name: "Unwarned User", value: `\`\`\`${user.user.tag}\`\`\`` },
            { name: "Reason", value: `\`\`\`${reason}\`\`\`` },
            { name: "By", value: `\`\`\`${issuer.user.tag}\`\`\`` }
        ])
        return Delete;
    }
}