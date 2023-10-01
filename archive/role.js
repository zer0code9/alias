const { bot, emojiType } = require('../config.js');
const { ApplicationCommandOptionType } = require('discord.js');
const AliasCancels = require("../helpers/cancels.js");
const AliasEmbeds = require("../helpers/embeds.js");
const AliasUtils = require("../helpers/utils.js");
const AliasTemps = require('../helpers/temps.js');

module.exports = {
    name: "role",
    description: "Get info on a role",
    type: "Info",
    botPerms: [],
    memPerms: [],
    args: [
        { name: "role", type: "role-mention|id", required: true }
    ],
    msgCommand: {
        exist: true,
        usage: bot.prefix + "role [role:ro-me|id]",
    },
    intCommand: {
        exist: false,
        options: [
            {
                name: "role",
                description: "The role to get info on",
                type: ApplicationCommandOptionType.Role,
                required: true,
            }
        ]
    },

    async msgRun(msg, args) {
        const role = await msg.guild.roles.cache.get(args[0]) ?? msg.guild.roles.cache.get(msg.mentions.roles.first()?.id);

        try {
            const Info = await this.Role(msg, role);
            AliasUtils.sendEmbed(msg, Info);
        } catch {
            AliasUtils.sendError(msg, this.name);
        }
        msg.delete();
    },

    async intRun(int) {
        const role = int.options.getRole('role');

        try {
            const Info = await this.Role(int, role);
            AliasUtils.sendEmbed(int, Info);
        } catch {
            AliasUtils.sendError(int, this.name);
        }
    },

    async Role(type, role) {
        if (!role) return AliasCancels.invalid(`No Role`, `I need a role in order to return info about it \n(${this.args[0].type})`, this.msgCommand.usage);

        const Info = AliasEmbeds.embedInfo("ROLE INFO", emojiType.role,
        [
                { name: "Name", value: `\`\`\`${role.name}\`\`\``, inline: true },
                { name: "Id", value: `\`\`\`${role.id}\`\`\``, inline: true },
            { name: "Created on", value: `\`\`\`${role.createdAt.toDateString()} (${AliasTemps.timeDifference(role.createdTimestamp)})\`\`\`` },
                { name: "Color", value: `\`\`\`${role.hexColor}\`\`\``, inline: true},
                { name: "Members", value: `\`\`\`${role.members.size}\`\`\``, inline: true },
                { name: "Position", value: `\`\`\`${parseInt(type.guild.roles.cache.size) - parseInt(role.position)}\`\`\``, inline: true},
            { name: `Permissions`, value: `\`\`\`${role.permissions.toArray().length}\`\`\`` }
        ])
        return Info;
    }
}