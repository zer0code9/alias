const { prefix } = require("/home/asorinus/workspace/myFirstProject/WithersWorld/WithersBot/config.json");
const Discord = require("discord.js");
function lala(msg, args) {
    if (args == 0) {
    const noAdd = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle("WithersBot Commands")
    .setDescription("Command: addrank")
    .addFields(
        { name: "Command:", value: `Create a new rank\n\`\`\`${prefix}addrank [name]\`\`\``}
    )
    .setFooter("WithersBot helps")
    msg.channel.send
    } else {
        if (args != 0) {
        let addrole = msg.guild.roles.create({ data: { name: `${args}` } });
        const add = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("WithersBot Commands")
        .setDescription("Command: addrank")
        .addFields(
            { name: "A new role has been added", value: `New role name: ${args}`}
        )
        .setFooter("WithersBot helps")
        msg.channel.send(add);
        }
    }
}

module.exports = {
    name: "addrank",
    description: "Create a new role",
    example: "zaddrank [name]",
    type: "rank",
    execute(msg, args) {
        lala(msg, args)
    }
}