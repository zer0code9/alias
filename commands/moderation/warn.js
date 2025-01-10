const { bot, emojiType, colorEmbed } = require('../../config');
const { ApplicationCommandOptionType, Message, ChatInputCommandInteraction, GuildMember } = require('discord.js');
const AliasEmbeds = require("../../helpers/embeds");
const AliasUtils = require("../../helpers/utils");
const AliasSends = require("../../helpers/sends");

module.exports = {
    settings: {
        name: "warn",
        idDB: "793417267397",
        description: "Manage warnings",
        category: "Moderation",
        botPerms: ["manageGuild"],
        memPerms: ["manageGuild"],
        existMsg: true,
        existInt: true,
        type: 1,
        options: [
            {
                name: "create",
                description: "Create a warn for a member",
                type: ApplicationCommandOptionType.Subcommand,
                options: [
                    {
                        name: "member",
                        description: "The member to warn [user-mention|id]",
                        type: ApplicationCommandOptionType.User,
                        specific: "user-mention|id",
                        required: true,
                    },
                    {
                        name: "warning",
                        description: "The warning for warn [string-phrase]",
                        type: ApplicationCommandOptionType.String,
                        specific: "string-phrase",
                        required: true,
                    }
                ]
            },
            {
                name: "delete",
                description: "Delete a warn from a member",
                type: ApplicationCommandOptionType.Subcommand,
                options: [
                    {
                        name: "member",
                        description: "The member to unwarn [user-mention|id]",
                        type: ApplicationCommandOptionType.User,
                        specific: "user-mention|id",
                        required: true,
                    },
                    {
                        name: "reason",
                        description: "The reason for unwarn [string-phrase]",
                        type: ApplicationCommandOptionType.String,
                        specific: "string-phrase",
                        required: true,
                    }
                ]
            }
        ]
    },

    /**
     * 
     * @param {Message} msg 
     * @param {String[]} args 
     */
    async msgRun(msg, args) {
        const action = args[0];

        if (action == "create") {
            const issuer = msg.member;
            const member = msg.guild.members.cache.get(args[1]) ?? msg.guild.members.cache.get(msg.mentions.users.first()?.id);
            const warning = args.slice(2).join(" ");

            try {
                const Create = await this.Create(issuer, member, warning);
                AliasSends.sendEmbedAlias(msg, Create);
                AliasSends.sendEmbedUser(member, AliasUtils.getMesage(member, `warned`, warning));
            } catch {
                AliasSends.sendErrorAlias(msg, this.settings.name);
            }
        }

        else if (action == "delete") {
            const issuer = msg.member;
            const member = msg.guild.members.cache.get(args[1]) ?? msg.guild.members.cache.get(msg.mentions.users.first()?.id);
            const reason = args.slice(2).join(" ");

            try {
                const Delete = await this.Delete(issuer, member, reason);
                AliasSends.sendEmbedAlias(msg, Delete);
            } catch {
                AliasSends.sendErrorAlias(msg, this.settings.name);
            }
        }

        else {
            const Invalid = AliasEmbeds.embed(colorEmbed.warning, "Invalid Action", this.settings.category, [
                { name: `Unknown Action Used`, value: `I don't know the action ${action}` },
                { name: "Possible Actions", value: `create | delete `}
            ], bot.name + " helps");
            AliasSends.sendEmbedAlias(msg, Invalid);
        }

        msg.delete();
    },

    /**
     * 
     * @param {ChatInputCommandInteraction} int 
     */
    async intRun(int) {
        const action = int.options.getSubcommand();
        
        if (action == "create") {
            const issuer = int.member;
            const member = int.guild.members.cache.get(int.options.getUser('member').id);
            const warning = int.options.getString('warning');

            try {
                const Create = await this.Create(issuer, member, warning);
                AliasSends.sendEmbedAlias(int, Create);
                AliasSends.sendEmbedUser(member, AliasUtils.getMesage(member, `warned`, warning));
            } catch {
                AliasSends.sendErrorAlias(int, this.settings.name);
            }
        }

        else if (action == "delete") {
            const issuer = int.member;
            const member = int.guild.members.cache.get(int.options.getUser('member').id);
            const reason = int.options.getString('reason');

            try {
                const Delete = await this.Delete(issuer, member, reason);
                AliasSends.sendEmbedAlias(int, Delete);
            } catch {
                AliasSends.sendErrorAlias(int, this.settings.name);
            }
        }
    },

    /**
     * 
     * @param {GuildMember} issuer 
     * @param {GuildMember} member 
     * @param {String} warning 
     * @returns {Promise<EmbedBuilder>} 
     */
    async Create(issuer, member, warning) {
        const options = this.settings.options[0];
        if (!member) return AliasEmbeds.invalid(`No Member`, `I need a member in order to warn someone \n(${options.options[0].specific})`, AliasUtils.getUsage(this, "create"));
        if (!warning) return AliasEmbeds.invalid(`No Warning`, `If there is no warning, then why warn them? \n(${options.options[1].specific})`, AliasUtils.getUsage(this, "create"));

        if (!AliasUtils.userInteract(issuer, member)) return AliasEmbeds.unabled(`Not Warnable`, `The member you are trying to warn cannot be warned by you`);

        const Create = AliasEmbeds.embedSuccess("WARNED MEMBER", emojiType.user, emojiType.warning, this.settings.category, [
            { name: "Warned Member", value: `\`\`\`${member.user.username}\`\`\`` },
            { name: "Warning", value: `\`\`\`${warning}\`\`\`` },
            { name: "By", value: `\`\`\`${issuer.user.username}\`\`\`` }
        ])
        return Create;
    },

    /**
     * 
     * @param {GuildMember} issuer 
     * @param {GuildMember} member 
     * @param {String} reason 
     * @returns {Promise<EmbedBuilder>} 
     */
    async Delete(issuer, member, reason) {
        const options = this.settings.options[1];
        if (!member) return AliasEmbeds.invalid(`No User`, `I need a member in order to unwarn someone \n(${options.options[0].specific})`, AliasUtils.getUsage(this, "delete"));
        if (!reason) return AliasEmbeds.invalid(`No Reason`, `You must have a reason to unwarn them \n(${options.options[1].specific})`, AliasUtils.getUsage(this, "delete"));

        const Delete = AliasEmbeds.embedSuccess("UNWARNED MEMBER", emojiType.user, emojiType.warning, this.settings.category, [
            { name: "Unwarned Member", value: `\`\`\`${member.user.username}\`\`\`` },
            { name: "Reason", value: `\`\`\`${reason}\`\`\`` },
            { name: "By", value: `\`\`\`${issuer.user.username}\`\`\`` }
        ])
        return Delete;
    }
}