const { bot, emojiType, colorEmbed } = require('../../config');
const { ApplicationCommandOptionType, Message, ChatInputCommandInteraction, GuildMember, User } = require('discord.js');
const AliasEmbeds = require("../../helpers/embeds");
const AliasUtils = require("../../helpers/utils");
const AliasSends = require("../../helpers/sends");

module.exports = {
    settings: {
        name: "ban",
        idDB: "338831695611",
        description: "Manage bans",
        category: "Moderation",
        botPerms: ["banMembers"],
        memPerms: ["banMembers"],
        existMsg: true,
        existInt: true,
        type: 1,
        options: [
            {
                name: "create",
                description: "Create a ban for a user",
                type: ApplicationCommandOptionType.Subcommand,
                options: [
                    {
                        name: "member",
                        description: "The member to ban [user-mention|id]",
                        type: ApplicationCommandOptionType.User,
                        specific: "user-mention|id",
                        required: true,
                    },
                    {
                        name: "option",
                        description: "The type of ban [string-'soft'|'harsh']",
                        type: ApplicationCommandOptionType.String,
                        specific: "string-'soft'|'harsh'",
                        required: true,
                    },
                    {
                        name: "reason",
                        description: "The reason to ban [string-phrase]",
                        type: ApplicationCommandOptionType.String,
                        specific: "string-phrase",
                        required: true,
                    }
                ]
            },
            {
                name: "delete",
                description: "Delete a ban from a user",
                type: ApplicationCommandOptionType.Subcommand,
                options: [
                    {
                        name: "user",
                        description: "The user to unban [user-id]",
                        type: ApplicationCommandOptionType.User,
                        specific: "user-id",
                        required: true,
                    },
                    {
                        name: "reason",
                        description: "The reason for unban [string-phrase]",
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
            const option = args[2];
            const reason = args.slice(3).join(" ");

            try {
                const Create = await this.Create(issuer, member, option, reason);
                AliasSends.sendEmbedAlias(msg, Create);
                AliasSends.sendEmbedUser(member, AliasUtils.getMesage(member, `${option} banned`, reason));
            } catch {
                AliasSends.sendErrorAlias(msg, this.settings.name);
            }
        }

        if (action == "delete") {
            const issuer = msg.member;
            const user = msg.guild.members.cache.get(args[1])?.user;
            const reason = args.slice(2).join(" ");

            try {
                const Delete = await this.Delete(issuer, user, reason);
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
            const option = int.options.getString('option');
            const reason = int.options.getString('reason');

            try {
                const Create = await this.Create(issuer, member, option, reason);
                AliasSends.sendEmbedAlias(int, Create);
                AliasSends.sendEmbedUser(member, AliasUtils.getMesage(member, `${option} banned`, reason));
            } catch (e) {
                AliasSends.sendErrorAlias(int, this.settings.name);
            }
        }

        else if (action == "delete") {
            const issuer = int.member;
            const user = int.options.getUser('user');
            const reason = int.options.getString('reason');
            
            try {
                const Delete = await this.Delete(issuer, user, reason);
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
     * @param {"soft" | "harsh"} option 
     * @param {String} reason 
     * @returns {Promise<EmbedBuilder>} 
     */
    async Create(issuer, member, option, reason) {
        const options = this.settings.options[0];
        if (!member) return AliasEmbeds.invalid(`No Member`, `I need a member in order to ban them \n(${options.options[0].specific})`, AliasUtils.getUsage(this, "create"));
        if (!option) return AliasEmbeds.invalid(`No Option`, `I need to know whether to soft or harsh ban \n(${options.options[1].specific})`, AliasUtils.getUsage(this, "create"));
        if (option != `soft` && option != `harsh`) return AliasEmbeds.unabled(`Need a valid option`, `The options are either soft or harsh \n Soft: only bans | Harsh: bans and deletes messages`);
        if (!reason) return AliasEmbeds.invalid(`No Reason`, `You must have a reason to ban them \n(${options.options[2].specific})`, AliasUtils.getUsage(this, "create"));

        if (!AliasUtils.userInteract(issuer, member)) return AliasEmbeds.unabled(`Not Bannable`, `The member you are trying to ban cannot be banned by you`);

        if (option == `soft`) {
            //member.ban({ reason: reason });
        } else if (option == `harsh`) {
            //member.ban({ deleteMessageSeconds: 60 * 60 * 24 * 7, reason: reason });
        }
        const Create = AliasEmbeds.embedSuccess("BANNED MEMBER", emojiType.user, emojiType.no, this.settings.category, [
            { name: "Banned MEMBER", value: `\`\`\`${member.user.username}\`\`\`` },
            { name: "Reason", value: `\`\`\`${reason}\`\`\`` },
            { name: "By", value: `\`\`\`${issuer.user.username}\`\`\`` }
        ])
        return Create;
    },

    /**
     * 
     * @param {GuildMember} issuer 
     * @param {User} user 
     * @param {String} reason 
     * @returns {Promise<EmbedBuilder>} 
     */
    async Delete(issuer, user, reason) {
        const options = this.settings.options[1];
        if (!user) return AliasEmbeds.invalid(`No Id`, `I need a valid id in order to unban them \n(${options.options[0].specific})`, AliasUtils.getUsage(this, "delete"));
        if (!reason) return AliasEmbeds.invalid(`No Reason`, `You must have a reason to unban them \n(${options.options[1].specific})`, AliasUtils.getUsage(this, "delete"));

        //issuer.guild.bans.remove(target, reason);
        const Delete = AliasEmbeds.embedSuccess("UNBANNED USER", emojiType.user, "o", this.settings.category, [
            { name: "Unbanned User", value: `\`\`\`${user.username}\`\`\`` },
            { name: "Reason", value: `\`\`\`${reason}\`\`\`` },
            { name: "By", value: `\`\`\`${issuer.user.username}\`\`\`` }
        ])
        return Delete;
    }
}