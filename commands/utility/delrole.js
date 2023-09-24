const { bot, emojiType } = require('../../config.js');
const { ApplicationCommandOptionType } = require('discord.js');
const AliasCancels = require("../../helpers/cancels");
const AliasEmbeds = require("../../helpers/embeds");
const AliasUtils = require("../../helpers/utils");

module.exports = {
    name: "delrole",
    description: "Delete a role",
    type: "Utility",
    botPerms: ["manageRoles"],
    memPerms: ["manageRoles"],
    args: [
        { name: "role", type: "role-mention|id", required: true },
        { name: "reason", type: "phrase", required: false },
    ],
    msgCommand: {
        exist: true,
        usage: bot.prefix + "delrole [role:ro-me|id] [reason:ph?]"
    },
    intCommand: {
        exist: true,
        options: [
            {
                name: "role",
                description: "The role to delete",
                type: ApplicationCommandOptionType.Role,
                required: true,
            },
            {
                name: "reason",
                description: "The reason to delete the role",
                type: ApplicationCommandOptionType.String,
                required: false,
            }
        ]
    },

    async msgRun(msg, args) {
        const role = await msg.guild.roles.cache.get(args[0]) ?? msg.guild.roles.cache.get(msg.mentions.roles.first()?.id); 
        const reason = await args.slice(1).join(" "); 
    
        try {
            const Delete = await this.DelRole(role, reason);
            AliasUtils.sendEmbed(msg, Delete);
        } catch {
            AliasUtils.sendError(msg, this.name);
        }
        msg.delete();
    },

    async intRun(int) {
        const role = await int.options.getRole('role');
        const reason = await int.options.getString('reason');
        
        try {
            const Delete = await this.DelRole(role, reason);
            AliasUtils.sendEmbed(int, Delete);
        } catch {
            AliasUtils.sendError(int, this.name);
        }
    },

    async DelRole(role, reason) {
        if (!role) return AliasCancels.invalid(msg, `No Role`, `I need a role in order to delete it \n(${this.args[0].type})`, this.msgCommand.usage);
        if (!reason) reason = "No reason";

        let roleName = role.name;
        await role.delete(reason);
        const Delete = AliasEmbeds.embedSuccess("DELETED ROLE", emojiType.role, emojiType.delete, this.type,
        [
            { name: "A channel has been deleted", value: `\`\`\`${roleName}\`\`\`` },
            { name: "Reason", value: `\`\`\`${reason}\`\`\``}
        ])
        return Delete;
    }
}