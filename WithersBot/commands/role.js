const { prefix } = require("/home/asorinus/workspace/myFirstProject/WithersWorld/WithersBot/config.json");
const Discord = require("discord.js");
function la(msg, args) {
    if (args == 0) {
        const noRole = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("WithersBot Commands")
        .setDescription("Command: role")
        .addFields(
            { name: "Command", value: `here\n\`\`\`${prefix}role [role]\`\`\``}
        )
        .setFooter("WithersBot helps")
        msg.channel.send(noRole);
    } else {
        if (args !=0) {
            const role = msg.mentions.roles.first();
            const roleInfo = new Discord.MessageEmbed()
            .setColor(`${role.hexColor}`)
            .setTitle("WithersBot Commands")
            .setDescription("Command: ")
            .addFields(
                { name: "Name", value: `${role.name}` },
                { name: "Id", value: `${role.id}` },
                { name: "Members with role", value: `${role.members}` },
                { name: "Created on", value: `${role.createdAt}` }
            )
            .setFooter("WithersBot helps")
            msg.channel.send(roleInfo);
        }
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