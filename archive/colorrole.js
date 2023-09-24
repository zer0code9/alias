const { bot, emoji } = require('../config.js');
const { PermissionsBitField, ApplicationCommandOptionType } = require('discord.js');
const { Invalid, Unabled } = require("../helpers/errors");
const { embedSuccess } = require("../helpers/embeds");
const { sendError } = require("../helpers/utils");

module.exports = {
    name: "colorrole",
    description: "Change the color of a role",
    example: bot.prefix + "colorrole [role:ro|id] [color:hex]",
    type: "Role",
    botPerms: ["manageRoles"],
    memPerms: ["manageRoles"],
    slashCommand: {
        exist: false,
        options: [
            {
                name: "role",
                description: "The channel that is going to be changed",
                type: "role",
                required: true,
            },
            {
                name: "color",
                description: "The hex of the color",
                type: "string",
                required: false,
            }
        ]
    },

    async execute(msg, args) {
        const role = await msg.guild.roles.cache.get(args[0]) || msg.mentions.roles.first();
        if (!role) return Invalid(msg, `No Role`, `I need a role in order to recolor it \n(mention:role or role:id)`, this.example);

        const color = await args.slice(1).join(" ");
        if (!color) return Invalid(msg, `No Color`, `I need a color in hex in order to recolor the role \n(text:hex)`, this.example);
    
        try {
            await role.setColor(color);
        } catch {
            sendError(msg, this.name);
        }

        const Change = embedSuccess("CHANGED ROLE COLOR", emoji.role, "paintbrush", this.type,
        [
            { name: "A role has been color-changed", value: `\`\`\`${role.name}\`\`\``},
            { name: "New Color", value: `\`\`\`${role.hexColor}\`\`\``}
        ])
        await msg.channel.send({ embeds: [Change] });
        msg.delete();
    }
}