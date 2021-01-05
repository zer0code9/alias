const { prefix } = require("/home/asorinus/workspace/myFirstProject/WithersWorld/WithersBot/config.json");
const Discord = require("discord.js");
function lala(msg, args) {
    if (!msg.member.permissions.has("MANAGE_ROLES")) {msg.channel.send(`You don't have the permission to manage roles, ${msg.author}`); return;} else {
    const role = msg.mentions.roles.first();
    const name = args.slice(1).join(" ");
    if (role) {
            if (name == "undefined" || name == 0 || name == "null") {
                const noName = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setTitle("WithersBot Commands")
                .setDescription("Command: namerank")
                .addFields(
                    { name: "No name", value: `I need a name in order to rename the role`},
                    { name: "Command:", value: `Change the name of a role\n\`\`\`${prefix}namerank [role] [name]\`\`\``}
                )
                .setFooter("WithersBot helps")
                msg.channel.send(noName);
            } else {
                role.setName(`${name}`)
                const change = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setTitle("WithersBot Commands")
                .setDescription("Command: namerank")
                .addFields(
                    { name: `The name of the role ${role.name} has changed`, value: `The new name: ${args[1]}`}
                )
                .setFooter("WithersBot helps")
                msg.channel.send(change);
            }
    } else {
        const noRole = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("WithersBot Commands")
        .setDescription("Command: namerank")
        .addFields(
            { name: `No role`, value: `I need a role in order to rename it`},
            { name: "Command:", value: `Change the name of a role\n\`\`\`${prefix}namerank [role] [name]\`\`\`` }
        )
        .setFooter("WithersBot helps")
        msg.channel.send(noRole);
    }
    }
}

module.exports = {
    name: "namerank",
    description: "Change the name of a role",
    example: prefix + "namerank [role] [name]",
    type: "rank",
    execute(msg, args) {
        lala(msg, args)
    }
}