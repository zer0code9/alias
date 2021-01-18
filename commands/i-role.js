const { prefix } = require("/home/asorinus/workspace/myFirstProject/WithersWorld/WithersBot/config.json");
const Discord = require("discord.js");
function la(msg, args) {
    const role = msg.mentions.roles.first();
    if (role) {
        var pe
        if (role.hasPermission("ADMINISTRATOR")) {return pe = "Administrator (all)"} else {pe = `${role.permission.cache.size}`}
            var cre = role.createdAt;
            const roleInfo = new Discord.MessageEmbed()
            .setColor(`${role.hexColor}`)
            .setTitle("WithersBot Commands")
            .setDescription("Command: role")
            .addFields(
                { name: "Role Name", value: `\`\`\`${role.name}\`\`\`` },
                { name: "Role Id", value: `\`\`\`${role.id}\`\`\`` },
                { name: "Created on", value: `\`\`\`${cre.toDateString()}\`\`\`` },
                { name: "Role Color", value: `\`\`\`${role.hexColor}\`\`\``},
                { name: "Members", value: `\`\`\`${role.members.size}\`\`\`` },
                { name: "Position", value: `\`\`\`${role.position}\`\`\``}
            )
            .setFooter("WithersBot helps")
            msg.channel.send(roleInfo);
    } else {
            const noRole = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle("WithersBot Commands")
            .setDescription("Command: role")
            .addFields(
                { name: "No Role", value: `I need a role in order to return info about it`},
                { name: "Command", value: `Get info on a role\n\`\`\`${prefix}role [role]\`\`\``}
            )
            .setFooter("WithersBot helps")
            msg.channel.send(noRole);
    }
}

module.exports = {
    name: "role",
    description: "Get info on a role",
    example: prefix + "role [role]",
    type: "info",
    execute(msg, args) {
        la(msg, args);
    }
}