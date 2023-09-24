const { bot, emoji } = require('../config.js');
const { PermissionsBitField, ApplicationCommandOptionType } = require('discord.js');
const { Invalid, Unabled } = require("../helpers/errors");
const { embedSuccess } = require("../helpers/embeds");
const { sendError } = require("../helpers/utils");

module.exports = {
    name: "namerole",
    description: "Change the name of a role",
    example: bot.prefix + "namerole [role:ro|id] [name:p]",
    type: "Role",
    botPerms: ["manageRoles"],
    memPerms: ["manageRoles"],
    slashCommand: {
        exist: false,
        options: [
            {
                name: "role",
                description: "The role to move",
                type: "role",
                required: true,
            },
            {
                name: "name",
                description: "The new name of the role",
                type: "string",
                required: true,
            }
        ]
    },

    async execute(msg, args) {
        const role = await msg.guild.roles.cache.get(args[0]) || msg.mentions.roles.first();
        if (!role) return Invalid(msg, `No Role`, `I need a role in order to rename it \n(mention:role or role:id)`, this.example);
        let roleName = role.name;
    
        const name = await args.slice(1).join(" ");
        if (!name) return Invalid(msg, `No Name`, `I need a name in order to rename the role \n(text:phrase)`, this.example);
    
        try {
            await role.setName(name);
        } catch {
            sendError(msg, this.name);
        }

        const Rename = embedSuccess("RENAMED ROLE", emoji.role, emoji.rename, this.type,
        [
            { name: "A role has been renamed", value: `\`\`\`${roleName}\`\`\`` },
            { name: "New Name", value: `\`\`\`${name}\`\`\``}
        ])
        await msg.channel.send({ embeds: [Rename] });
        msg.delete();
    }
}