const { bot, emoji } = require('../config.js');
const { PermissionsBitField, ApplicationCommandOptionType } = require('discord.js');
const { Invalid, Unabled } = require("../helpers/errors");
const { embedSuccess } = require("../helpers/embeds");
const { sendError } = require("../helpers/utils");

module.exports = {
    name: "moverole",
    description: "Change the position of a role",
    example: bot.prefix + "moverole [role:ro|id] [position:in]",
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
                name: "position",
                description: "The position of the role",
                type: ApplicationCommandOptionType.Integer,
                required: true,
            }
        ]
    },

    async execute(msg, args) {
        const role = await msg.guild.roles.cache.get(args[0]) || msg.mentions.roles.first();
        let position = await args.slice(1).join(" ");
    
        if (!role) return Invalid(msg, `No Role`, `I need a role in order to rename it \n(mention:role or role:id)`, this.example);
        if (!position) return Invalid(msg, `No Position`, `I need a postion in order to move the role \n(number:integer)`, this.example);
        if (isNaN(position)) return Unabled(msg, `Not A Number`, `The position must be a whole number \n(integer)`);
        if (position < 1 || position > parseInt(msg.guild.roles.cache.size)-2) return Unabled(msg, `Imposible Position`, `can only be between 1 and ${parseInt(msg.guild.roles.cache.size)-2}`);
    
        //console.log((parseInt(msg.guild.roles.cache.size) - position) - 1)
        try {
            await role.setPosition(`${(parseInt(msg.guild.roles.cache.size) - position) - 1}`);
        } catch {
            sendError(msg, this.name);
        }
        
        const Move = embedSuccess("MOVED ROLE", emoji.role, emoji.move, this.type,
        [
            { name: "A role has been moved", value: `\`\`\`${role.name}\`\`\`` },
            { name: "New Position", value: `\`\`\`${parseInt(msg.guild.roles.cache.size) - parseInt(role.position)}\`\`\``}
        ])
        await msg.channel.send({ embeds: [Move] });
        msg.delete();
    }
}