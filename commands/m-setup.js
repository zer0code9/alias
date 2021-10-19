const { prefix, by } = require("./../config.json");
const { MessageEmbed, Permissions } = require('discord.js');
const { Timeout, Wronganswer, Perm, Cancel, Invalid, Unknown } = require("../errors");

module.exports = {
    name: "setup",
    description: "Set up for Alias",
    example: prefix + "setup",
    type: "Moderation",
    execute(msg, args) {
        if (!msg.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return Perm(msg, `No permission`, `You don't have the permission to set up`);
        if ((msg.guild.channels.cache.find(c => c.name.toLowerCase() === "for-alias"))) return Wronganswer(msg, `Set up channel exists`, `Channel for-alias already exists`);
        
        msg.guild.channels.create(`for-alias`, {
            type: `GUILD_TEXT`,
            permissionOverwrites: [
                {
                    id: msg.guild.id,
                    deny: [Permissions.FLAGS.VIEW_CHANNEL],
                },
                {
                    id: msg.author.id,
			        allow: [Permissions.FLAGS.VIEW_CHANNEL],
                },
                {
                    id: msg.guild.roles.cache.find(r => r.name.toLowerCase() === "alias"),
                    allow: [Permissions.FLAGS.VIEW_CHANNEL],
                }
            ]
        });
    }
}