const { prefix } = require("/home/asorinus/workspace/myFirstProject/WithersWorld/WithersBot/config.json");
const Discord = require("discord.js");
function la(msg, args) {
    const role = msg.mentions.roles.first();
    if (role) {
            let membermap = role.members
                .sort((a, b) => b.position - a.position)
                .map(m => m)
                .join(`\n`);
                if (membermap.length > 1024) membermap = "To many members to display";
                if (!membermap) membermap = `No member with role ${role}`;
            const roleInfo = new Discord.MessageEmbed()
            .setColor(`${role.hexColor}`)
            .setTitle("WithersBot Commands")
            .setDescription("Command: member")
            .addFields(
                { name: `All Members with ${role.name}`, value: `${membermap}`}
            )
            .setFooter("WithersBot helps")
            msg.channel.send(roleInfo);
    } else {
            const noRole = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle("WithersBot Commands")
            .setDescription("Command: member")
            .addFields(
                { name: "No Role", value: `I need a role in order to return info about it`},
                { name: "Command", value: `Get the names of members that have a certain role\n\`\`\`${prefix}member [role]\`\`\``}
            )
            .setFooter("WithersBot helps")
            msg.channel.send(noRole);
    }
}

module.exports = {
    name: "member",
    description: "Get the names of members that have a certain role",
    example: prefix + "member [role]",
    type: "info",
    execute(msg, args) {
        la(msg, args);
    }
}