const { bot, emojiType, colorEmbed } = require('../../config');
const { ApplicationCommandOptionType, Message, ChatInputCommandInteraction, GuildMember } = require('discord.js');
const AliasEmbeds = require("../../helpers/embeds");
const AliasUtils = require("../../helpers/utils");
const AliasSends = require("../../helpers/sends");

module.exports = {
    settings: {
        name: "mute",
        idDB: "205188921806",
        description: "Manage mutes in voice channels",
        category: "Moderation",
        botPerms: ["muteMembers"],
        memPerms: ["muteMembers"],
        existMsg: true,
        existInt: true,
        type: 1,
        options: [
            {
                name: "create",
                description: "Create a mute for a member",
                type: ApplicationCommandOptionType.Subcommand,
                options: [
                    {
                        name: "member",
                        description: "The member to mute [user-mention|id]",
                        type: ApplicationCommandOptionType.User,
                        specific: "user-mention|id",
                        required: true,
                    },
                    {
                        name: "reason",
                        description: "The reason for mute [string-phrase]",
                        type: ApplicationCommandOptionType.String,
                        specific: "string-phrase",
                        required: true,
                    }
                ]
            },
            {
                name: "delete",
                description: "Delete a mute from a member",
                type: ApplicationCommandOptionType.Subcommand,
                options: [
                    {
                        name: "member",
                        description: "The member to unmute [user-mention|id]",
                        type: ApplicationCommandOptionType.User,
                        specific: "user-mention|id",
                        required: true,
                    },
                    {
                        name: "reason",
                        description: "The reason for unmute [string-phrase]",
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
    async msgRun(msg, args){
        const action = args[0];

        if (action == "create") {
            const issuer = msg.member;
            const member = msg.guild.members.cache.get(args[1]) ?? msg.guild.members.cache.get(msg.mentions.users.first()?.id);
            const reason = args.slice(2).join(" ");

            try {
                const Create = await this.Create(issuer, member, reason);
                AliasSends.sendEmbedAlias(msg, Create);
                AliasSends.sendEmbedUser(member, AliasUtils.getMesage(member, `muted`, reason));
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
            const reason = int.options.getString('reason');
            
            try {
                const Create = await this.Create(issuer, member, reason);
                AliasSends.sendEmbedAlias(int, Create);
                AliasSends.sendEmbedUser(member, AliasUtils.getMesage(member, `muted`, reason));
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
     * @param {String} reason 
     * @returns {Promise<EmbedBuilder>} 
     */
    async Create(issuer, member, reason) {
        const options = this.settings.options[0];
        if (!member) return AliasEmbeds.invalid('No Member', `I need a member in order to mute them \n(${options.options[0].specific})`, AliasUtils.getUsage(this, "create"));
        if (!reason) return AliasEmbeds.invalid('No Reason', `You must have a reason to mute them \n(${options.options[1].specific})`, AliasUtils.getUsage(this, "create"));

        if (!AliasUtils.userInteract(issuer, member)) return AliasEmbeds.unabled(`Not Mutable`, `The member you are trying to mute cannot be muted by you`);

        //await member.voice.setMute(true, reason);
        const Create = AliasEmbeds.embedSuccess("MUTED MEMBER", emojiType.user, "mute", this.settings.category, [
            { name: "Muted Member", value: `\`\`\`${member.user.username}\`\`\`` },
            { name: "On Channel", value: `\`\`\`${member.voice.channel.name}\`\`\`` },
            { name: "Reason", value: `\`\`\`${reason}\`\`\`` },
            { name: `By`, value: `\`\`\`${issuer.user.username}\`\`\`` }
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
        if (!member) return AliasEmbeds.invalid('No Member', `I need a member in order to unmute them \n(${options.options[0].specific})`, AliasUtils.getUsage(this, "delete"));
        if (!reason) return AliasEmbeds.invalid('No Reason', `You must have a reason to unmute them \n(${options.options[1].specific})`, AliasUtils.getUsage(this, "delete"));

        //await member.voice.setMute(false);
        const Delete = AliasEmbeds.embedSuccess("UNMUTED MEMBER", emojiType.user, "unmute", this.settings.category, [
            { name: "Unmuted Member", value: `\`\`\`${member.user.username}\`\`\`` },
            { name: "Reason", value: `\`\`\`${reason}\`\`\`` },
            { name: `By`, value: `\`\`\`${issuer.user.username}\`\`\`` }
        ])
        return Delete;
    }
}