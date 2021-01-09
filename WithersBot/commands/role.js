const { prefix } = require("/home/asorinus/workspace/myFirstProject/WithersWorld/WithersBot/config.json");
const Discord = require("discord.js");
function la(msg, args) {
    const role = msg.mentions.roles.first();
    if (role) {
            var memberWithRole;
            if (role.members.size == "0") {memberWithRole = "No members with this role"} else {if (role.members.size >= "1"){memberWithRole = `${role.members.size} members have this role`}}
            var cre = role.createdAt;
            const roleInfo = new Discord.MessageEmbed()
            .setColor(`${role.hexColor}`)
            .setTitle("WithersBot Commands")
            .setDescription("Command: role")
            .addFields(
                { name: "Name", value: `${role.name}` },
                { name: "Id", value: `${role.id}` },
                { name: "Created on", value: `${cre.toDateString()}` },
                { name: "Color", value: `${role.hexColor}`},
                { name: "Members with role", value: `${memberWithRole}` },
                { name: "Number of persmissions", value: `${role.permissions.length}`}
            )
            .setFooter("WithersBot helps")
            msg.channel.send(roleInfo);
    } else {
            const noRole = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle("WithersBot Commands")
            .setDescription("Command: role")
            .addFields(
                { name: "No Channel", value: `I need a role in order to return info about it`},
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