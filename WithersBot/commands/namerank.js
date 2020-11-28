const { prefix } = require("/home/asorinus/workspace/myFirstProject/WithersWorld/WithersBot/config.json");
const Discord = require("discord.js");
function lala(msg, args) {
    const role = msg.mentions.roles.first();
    if (args == 0) {
    const noName = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle("WithersBot Commands")
    .setDescription("Command: namerank")
    .addFields(
        { name: "Command:", value: `Change the name of a role\n\`\`\`${prefix}namerank [role] [name]\`\`\``}
    )
    .setFooter("WithersBot helps")
    msg.channel.send(noName);
    } else {
        if (args != 0) {
        role.edit({ name: `${args[1]}` })
        const name = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("WithersBot Commands")
        .setDescription("Command: namerank")
        .addFields(
            { name: `The name of the role ${role}`, value: `The new name: ${args[1]}`}
        )
        .setFooter("WithersBot helps")
        msg.channel.send(name);
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