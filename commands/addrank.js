const { prefix } = require("/home/asorinus/workspace/myFirstProject/WithersWorld/WithersBot/config.json");
const Discord = require("discord.js");
function lala(msg, args) {
    if (!msg.member.hasPermission("MANAGE_ROLES")) return msg.channel.send(`You don't have the permission to manage roles, ${msg.author}`)
    if(!msg.guild.me.hasPermission("MANAGE_ROLES")) return msg.channel.send(`I dont have the permissions to manage roles, ${msg.author}`)
    const role = msg.mentions.roles.first();
    const name = args.join(" ");
    if (name) {
        msg.guild.roles.create({ data: { name: `${name}` } });
        const add = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("WithersBot Commands")
        .setDescription("Command: addrank")
        .addFields(
            { name: "A new role has been created", value: `New role name: ${name}`}
        )
        .setFooter("WithersBot helps")
        msg.channel.send(add);
    } else {
        const noAdd = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("WithersBot Commands")
        .setDescription("Command: addrank")
        .addFields(
            { name: "No Name", value: `I need a name in order to create a new role`},
            { name: "Command:", value: `Create a new rank\n\`\`\`${prefix}addrank [name]\`\`\``}
        )
        .setFooter("WithersBot helps")
        msg.channel.send(noAdd);
    }
}

module.exports = {
    name: "addrank",
    description: "Create a new role",
    example: prefix + "addrank [name]",
    type: "rank",
    execute(msg, args) {
        lala(msg, args)
    }
}