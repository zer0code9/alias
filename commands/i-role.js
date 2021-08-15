const { prefix, by } = require("./../config.json");
const Discord = require("discord.js");
function role(msg, args) {
    const role = msg.mentions.roles.first();

    const noRole = new Discord.MessageEmbed()
    .setColor("#ff0000")
    .setTitle(`:warning: CANCELED :warning:`)
    .addFields(
        { name: "No Role", value: `I need a role in order to return info about it`},
        { name: "Command", value: `\`${prefix}role [role]\``}
    )
    .setFooter(`${by} helps`)
    if (!role) return msg.channel.send(noRole);

    var pe;
    //if (role.hasPermission("ADMINISTRATOR")) {return pe = "Administrator (all)"} else {pe = `${role.permission.cache.size}`}
    var cre = role.createdAt;
    const roleInfo = new Discord.MessageEmbed()
    .setColor(`#00ff00`)
    .setTitle(":label: ROLE INFO :label:")
    .setDescription("Info")
    .addFields(
        [
            { name: "Role Name", value: `\`\`\`${role.name}\`\`\``, inline: true},
            { name: "Role Id", value: `\`\`\`${role.id}\`\`\``, inline: true },
        ],
        { name: "Created on", value: `\`\`\`${cre.toDateString()}\`\`\`` },
        [
            { name: "Role Color", value: `\`\`\`${role.hexColor}\`\`\``, inline: true},
            { name: "Members", value: `\`\`\`${role.members.size}\`\`\``, inline: true },
            { name: "Position", value: `\`\`\`${role.position}\`\`\``, inline: true}
        ]
        
    )
    .setFooter(`${by} helps`)
    msg.channel.send(roleInfo);
}

module.exports = {
    name: "role",
    description: "Get info on a role",
    example: prefix + "role [role]",
    type: "info",
    execute(msg, args) {
        role(msg, args);
    }
}