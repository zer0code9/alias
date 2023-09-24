const { bot, emoji } = require('../config.js');
const { PermissionsBitField, ApplicationCommandOptionType } = require('discord.js');
const { Invalid, Unabled } = require("../helpers/errors");
const { embedSuccess } = require("../helpers/embeds");
const { sendError } = require("../helpers/utils");

module.exports = {
    name: "setrole",
    description: "Change if a role can be mentioned",
    example: bot.prefix + "setrole [role:ro|id]",
    type: "Role",
    botPerms: ["manageRoles"],
    memPerms: ["manageRoles"],
    slashCommand: {
        exist: false,
        options: [
            {
                name: "role",
                description: "The role to move",
                type: ApplicationCommandOptionType.Role,
                required: true,
            },
            {
                name: "mentionable",
                description: "The mentionality of the role",
                type: ApplicationCommandOptionType.Boolean,
                required: true,
            }
        ]
    },

    async execute(msg, args) {
        const role = await msg.guild.roles.cache.get(args[0]) || msg.mentions.roles.first();

        if (!role) return Invalid(msg, `No Role`, `I need a role in order to rename it \n(mention:role or role:id)`, this.example);
    
        try {
            await role.setMentionable(!role.mentionable);
        } catch {
            sendError(msg, this.name);
        }
        
        const Change = embedSuccess("CHANGED ROLE MENTION", emoji.role, "round_pushpin", this.type,
        [
            { name: "A role has been changed", value: `\`\`\`${role.name}\`\`\`` },
            { name: "Mentionable?", value: `\`\`\`${role.mentionable}\`\`\``}
        ])
        await msg.channel.send({ embeds: [Change] });
        msg.delete();
    }
}