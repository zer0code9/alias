const { bot, emojiType } = require('../config.js');
const { ApplicationCommandOptionType } = require('discord.js');
const AliasCancels = require("../helpers/cancels");
const AliasEmbeds = require("../helpers/embeds");
const AliasUtils = require("../helpers/utils");
const AliasTemps = require('../helpers/temps');

module.exports = {
    name: "message",
    description: "Get info on a message",
    type: "Info",
    botPerms: [],
    memPerms: [],
    msgCommand: {
        exist: true,
        usage: bot.prefix + "message [message:id]",
    },
    intCommand: {
        exist: false,
        options: [
            {
                name: "message",
                description: "The message to get info on",
                type: ApplicationCommandOptionType.String,
                required: true,
            }
        ]
    },

    async msgRun(msg, args) {
        const role = await msg.guild.roles.cache.get(args[0]) ?? msg.guild.roles.cache.get(msg.mentions.roles.first()?.id);
        if (!role) return Invalid(msg, `No Role`, `I need a role in order to return info about it \n(mention:role or role:id)`, this.msgCommand.usage);
    
        var pe;
        //if (role.hasPermission("ADMINISTRATOR")) {return pe = "Administrator (all)"} else {pe = `${role.permission.cache.size}`}

        const Info = embedInfo("ROLE INFO", emoji.role,
        [
                { name: "Name", value: `\`\`\`${role.name}\`\`\``, inline: true},
                { name: "Id", value: `\`\`\`${role.id}\`\`\``, inline: true },
            { name: "Created on", value: `\`\`\`${role.createdAt.toDateString()} (${timeDifference(role.createdTimestamp)})\`\`\`` },
                { name: "Color", value: `\`\`\`${role.hexColor}\`\`\``, inline: true},
                { name: "Members", value: `\`\`\`${role.members.size}\`\`\``, inline: true },
                { name: "Position", value: `\`\`\`${parseInt(msg.guild.roles.cache.size) - parseInt(role.position)}\`\`\``, inline: true},
            { name: "Permissions", value: `\`\`\`${role.permissions.toArray().length}\`\`\`` }
        ])
        await msg.channel.send({ embeds: [Info] });
        msg.delete();
    }
}