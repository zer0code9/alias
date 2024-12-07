const { emojiType } = require('../../config');
const { ApplicationCommandOptionType, Message, ChatInputCommandInteraction, GuildMember } = require('discord.js');
const AliasEmbeds = require("../../helpers/embeds");
const AliasUtils = require("../../helpers/utils");
const AliasSends = require("../../helpers/sends");

module.exports = {
    settings: {
        name: "kick",
        id: "308795241268",
        description: "Kick a user",
        category: "Moderation",
        botPerms: ["kickMembers"],
        memPerms: ["kickMembers"],
        existMsg: true,
        existInt: true,
        sub: false,
        options: [
            {
                name: "member",
                description: "The member to kick [user-mention|id]",
                type: ApplicationCommandOptionType.User,
                specific: "user-mention|id",
                options: [],
                required: true,
            },
            {
                name: "reason",
                description: "The reason to kick [string-phrase]",
                type: ApplicationCommandOptionType.String,
                specific: "string-phrase",
                options: [],
                required: true,
            }
        ]
    },

    /**
     * 
     * @param {Message} msg 
     * @param {String[]} args 
     */
    async msgRun(msg, args) {
        const issuer = msg.member;
        const member = msg.guild.members.cache.get(args[0]) ?? msg.guild.members.cache.get(msg.mentions.users.first()?.id);
        const reason = args.slice(1).join(" ");
    
        try {
            const Kick = await this.Kick(issuer, member, reason);
            AliasSends.sendEmbedAlias(msg, Kick);
            AliasSends.sendEmbedUser(member, AliasUtils.getMesage(member, `kicked`, reason));
        } catch {
            AliasSends.sendErrorAlias(msg, this.settings.name);
        }

        msg.delete();
    },

    /**
     * 
     * @param {ChatInputCommandInteraction} int 
     */
    async intRun(int) {
        const issuer = int.member;
        const member = int.guild.members.cache.get(int.options.getUser('member').id);
        const reason = int.options.getString('reason');

        try {
            const Kick = await this.Kick(issuer, member, reason);
            AliasSends.sendEmbedAlias(int, Kick);
            AliasSends.sendEmbedUser(member, AliasUtils.getMesage(member, `kicked`, reason));
        } catch {
            AliasSends.sendErrorAlias(int, this.settings.name);
        }
    },

    /**
     * 
     * @param {GuildMember} issuer 
     * @param {GuildMember} member 
     * @param {String} reason 
     * @returns {Promise<EmbedBuilder>} 
     */
    async Kick(issuer, member, reason) {
        const options = this.settings;
        if (!member) return AliasEmbeds.invalid(`No Member`, `I need a member in order to kick them \n(${options.options[0].specific})`, AliasUtils.getUsage(this));
        if (!reason) return AliasEmbeds.invalid(`No Reason`, `I need a reason in order to kick someone \n(${options.options[1].specific})`, AliasUtils.getUsage(this));

        if (!AliasUtils.userInteract(issuer, member)) return AliasEmbeds.unabled(`Not Kickable`, `The member you are trying to kick cannot be kicked by you`);

        //await member.kick(reason);
        const Kick = AliasEmbeds.embedSuccess("KICKED MEMBER", emojiType.user, "outbox_tray", this.settings.category, [
            { name: "Kicked Member", value: `\`\`\`${member.user.username}\`\`\`` },
            { name: "Reason", value: `\`\`\`${reason}\`\`\``},
            { name: "By", value: `\`\`\`${issuer.user.username}\`\`\``}
        ])
        return Kick;
    }
}