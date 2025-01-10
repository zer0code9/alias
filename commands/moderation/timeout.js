const { bot, emojiType, colorEmbed } = require('../../config');
const { ApplicationCommandOptionType, Message, ChatInputCommandInteraction, GuildMember } = require('discord.js');
const AliasEmbeds = require("../../helpers/embeds");
const AliasUtils = require("../../helpers/utils");
const AliasSends = require("../../helpers/sends");

module.exports = {
    settings: {
        name: "timeout",
        idDB: "963393912460",
        description: "Manage timeouts",
        category: "Moderation",
        botPerms: ["muteMembers"],
        memPerms: ["muteMembers"],
        existMsg: true,
        existInt: true,
        type: 1,
        options: [
            {
                name: "create",
                description: "Create a timeout for a member",
                type: ApplicationCommandOptionType.Subcommand,
                options: [
                    {
                        name: "member",
                        description: "The member to timeout [user-mention|id]",
                        type: ApplicationCommandOptionType.User,
                        specific: "user-mention|id",
                        required: true,
                    },
                    {
                        name: "time",
                        description: "The time for timeout [number-seconds]",
                        type: ApplicationCommandOptionType.Number,
                        specific: "number-seconds",
                        required: true,
                    },
                    {
                        name: "reason",
                        description: "The reason for timeout [string-phrase]",
                        type: ApplicationCommandOptionType.String,
                        specific: "string-phrase",
                        required: true,
                    }
                ]
            },
            {
                name: "delete",
                description: "Delete a timeout from a member",
                type: ApplicationCommandOptionType.Subcommand,
                options: [
                    {
                        name: "member",
                        description: "The member to untimeout [user-mention|id]",
                        type: ApplicationCommandOptionType.User,
                        specific: "user-mention|id",
                        required: true,
                    },
                    {
                        name: "reason",
                        description: "The reason for untimeout [string-phrase]",
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
            const time = args[2];
            const reason = args.slice(3).join(" ");

            try {
                const Create = await this.Create(issuer, member, time, reason);
                AliasSends.sendEmbedAlias(msg, Create);
                AliasSends.sendEmbedUser(member, AliasUtils.getMesage(member, `timed out`, reason));
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
            const time = int.options.getNumber('time');
            const reason = int.options.getString('reason');
            
            try {
                const Create = await this.Create(issuer, member, time, reason);
                AliasSends.sendEmbedAlias(int, Create);
                AliasSends.sendEmbedUser(member, AliasUtils.getMesage(member, `timed out`, reason));
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
     * @param {Number} time 
     * @param {String} reason 
     * @returns {Promise<EmbedBuilder>} 
     */
    async Create(issuer, member, time, reason) {
        const options = this.settings.options[0];
        if (!member) return AliasEmbeds.invalid(`No Member`, `I need a member in order to time them out \n(${options.options[0].specific})`, AliasUtils.getUsage(this, "create"));
        if (!time) return AliasEmbeds.invalid(`No time`, `I need a time to time them out \n(${options.options[1].specific})`, AliasUtils.getUsage(this, "create"));
        if (!reason) return AliasEmbeds.invalid(`No Reason`, `You must have a reason to time them out \n(${options.options[2].specific})`, AliasUtils.getUsage(this, "create"));

        if (!AliasUtils.userInteract(issuer, user)) return AliasEmbeds.unabled(`Not Manageable`, `The user you are trying to timeout cannot be timed out by you`);

        const Create = AliasEmbeds.embedSuccess("TIMED OUT USER", emojiType.user, "no_bell", this.type, [
            { name: "Timed out User", value: `\`\`\`${user.user.id}\`\`\`` },
            { name: "For", value: `\`\`\`${time * 1000} seconds\`\`\`` },
            { name: "Reason", value: `\`\`\`${reason}\`\`\`` },
            { name: `By`, value: `\`\`\`${issuer.user.id}\`\`\`` }
        ])
        return Create;
    },

    async Delete(issuer, member, reason) {
        const options = this.settings.options[1];
        if (!member) return AliasEmbeds.invalid(`No Member`, `I need a member in order to untime them out \n(${options.options[0].specific})`, AliasUtils.getUsage(this, "delete"));
        if (!reason) return AliasEmbeds.invalid(`No Reason`, `You must have a reason to untime them out \n(${options.options[1].specific})`, AliasUtils.getUsage(this, "delete"));

        const Delete = AliasEmbeds.embedSuccess("UNTIMED OUT USER", emojiType.user, "bell", this.type, [
            { name: "Untimed out User", value: `\`\`\`${user.user.id}\`\`\`` },
            { name: "Reason", value: `\`\`\`${reason}\`\`\`` },
            { name: `By`, value: `\`\`\`${issuer.user.id}\`\`\`` }
        ])
        return Delete;
    }
}