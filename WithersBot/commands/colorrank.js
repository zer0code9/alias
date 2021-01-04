const { prefix } = require("/home/asorinus/workspace/myFirstProject/WithersWorld/WithersBot/config.json");
const Discord = require("discord.js");
function abc(msg, args) {
    if (!msg.member.permissions.has("MANAGE_ROLES")) {msg.channel.send(`You don't have the permission to manage roles, ${msg.author}`); return;} else {
    if (args == 0) {
        const no = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("WithersBot Commands")
        .setDescription("Command: colorrank")
        .addFields(
            { name: "Command", value: `Change the color of a role\n\`\`\`${prefix}colorrank [role] [color]\`\`\``}
        )
        .setFooter("WithersBot helps")
        msg.channel.send(no);
    } else {
        if (args !=0) {
            const role = msg.mentions.roles.first();
            role.setColor(`${args[1]}`);
            const yes = new Discord.MessageEmbed()
            .setColor(`${role.hexColor}`)
            .setTitle("WithersBot Commands")
            .setDescription("Command: colorrank")
            .addFields(
                { name: `The color of the role ${role.hexColor}`, value: `The new color ${args[1]}`}
            )
            .setFooter("WithersBot helps")
            msg.channel.send(yes);
        }
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