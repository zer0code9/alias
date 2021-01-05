const { prefix } = require("/home/asorinus/workspace/myFirstProject/WithersWorld/WithersBot/config.json");
const Discord = require("discord.js");
function abc(msg, args) {
    if (!msg.member.permissions.has("MANAGE_ROLES")) {msg.channel.send(`You don't have the permission to manage roles, ${msg.author}`); return;} else {
        const role = msg.mentions.roles.first();
        const color = args.slice(1).join(" ");
    if (role) {
        if (color == 0 || !color.startsWith('#') || color == "null") {
            const noColor = new Discord.MessageEmbed()
            .setColor(`${role.hexColor}`)
            .setTitle("WithersBot Commands")
            .setDescription("Command: colorrank")
            .addFields(
                { name: "No color", value: `I need a color in hex in order to recolor the role`},
                { name: "Command", value: `Change the color of a role\n\`\`\`${prefix}colorrank [role] [color]\`\`\``}
            )
            .setFooter("WithersBot helps")
            msg.channel.send(noColor);
        } else {
            role.setColor(`${color}`);
            const change = new Discord.MessageEmbed()
            .setColor(`${role.hexColor}`)
            .setTitle("WithersBot Commands")
            .setDescription("Command: colorrank")
            .addFields(
                { name: `The color of the role ${role.name}`, value: `The new color ${args[1]}`}
            )
            .setFooter("WithersBot helps")
            msg.channel.send(change);
        }
        
    } else {
            const yes = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle("WithersBot Commands")
            .setDescription("Command: colorrank")
            .addFields(
                { name: `No role`, value: `I need a role in order to recolor it`},
                { name: "Command", value: `Change the color of a role\n\`\`\`${prefix}colorrank [role] [color]\`\`\``}
            )
            .setFooter("WithersBot helps")
            msg.channel.send(yes);
        }
    }
}


module.exports = {
    name: "colorrank",
    description: "Change the color of a role",
    example: prefix + "colorrank [role] [color]",
    type: "rank",
    execute(msg, args) {
        abc(msg, args);
    }
}