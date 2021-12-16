const { prefix, by } = require("./../config.json");
const { MessageEmbed } = require("discord.js");
const { Invalid } = require('../errors');
const { timeDifference } = require('../functions');
async function roleInfo(msg, args, example) {
    const role = msg.guild.roles.cache.get(args[0]) || msg.mentions.roles.first();

    if (!role) return Invalid(msg, `No Role`, `I need a role in order to return info about it`, `${example}`);

    var pe;
    //if (role.hasPermission("ADMINISTRATOR")) {return pe = "Administrator (all)"} else {pe = `${role.permission.cache.size}`}
    const Info = new MessageEmbed()
    .setColor(`#00ff00`)
    .setTitle(":label: ROLE INFO :label:")
    .setDescription("Info")
    .addFields(
        [
            { name: "Role Name", value: `\`\`\`${role.name}\`\`\``, inline: true},
            { name: "Role Id", value: `\`\`\`${role.id}\`\`\``, inline: true },
        ],
        { name: "Created on", value: `\`\`\`${role.createdAt.toDateString()} (${timeDifference(role.createdTimestamp)})\`\`\`` },
        [
            { name: "Role Color", value: `\`\`\`${role.hexColor}\`\`\``, inline: true},
            { name: "Members", value: `\`\`\`${role.members.size}\`\`\``, inline: true },
            { name: "Position", value: `\`\`\`${parseInt(msg.guild.roles.cache.size) - parseInt(role.position)}\`\`\``, inline: true}
        ],
        { name: "Permissions", value: `\`\`\`${role.permissions.toArray().length}\`\`\`` }
    )
    .setFooter(`${by} helps`)
    await msg.channel.send({ embeds: [Info] });
    msg.delete();
}

module.exports = {
    name: "role",
    description: "Get info on a role",
    example: prefix + "role [role]",
    type: "info",
    execute(msg, args) {
        roleInfo(msg, args, this.example);
    }
}