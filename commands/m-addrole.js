const { prefix } = require("/home/asorinus/workspace/myFirstProject/WithersWorld/WithersBot/config.json");
const Discord = require("discord.js");
function lala(msg, args) {
    if (!msg.member.hasPermission("MANAGE_ROLES")) return msg.channel.send(`You don't have the permission to manage roles, ${msg.author}`)
    if(!msg.guild.me.hasPermission("MANAGE_ROLES")) return msg.channel.send(`I dont have the permissions to manage roles, ${msg.author}`)
    const user = msg.mentions.users.first();
    const role = msg.mentions.roles.first();
    const member = msg.guild.member(user);
    if (user) {
        if (role) {
            user.add(`${role}`)
            const add = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle("WithersBot Commands")
            .setDescription("Command: addrole")
            .addFields(
                { name: `Added role to ${user.username}`, value: `Added role: ${role.name}`}
            )
            .setFooter("WithersBot helps")
            msg.channel.send(add);
        } else {
            const noRole = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle("WithersBot Commands")
            .setDescription("Command: addrole")
            .addFields(
                { name: "No Role", value: `I need a role in order to add that role to the member`},
                { name: "Command:", value: `Add a role to a member\n\`\`\`${prefix}addrole [member] [role]\`\`\``}
            )
            .setFooter("WithersBot helps")
            msg.channel.send(noRole);
        }
    } else {
        const noUser = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("WithersBot Commands")
        .setDescription("Command: addrole")
        .addFields(
            { name: "No User", value: `I need an user in order to add the role to that member`},
            { name: "Command:", value: `Add a role to a member\n\`\`\`${prefix}addrole [member] [role]\`\`\``}
        )
        .setFooter("WithersBot helps")
        msg.channel.send(noUser);
    }
}

module.exports = {
    name: "addrole",
    description: "Add a role to a member",
    example: prefix + "addrole [member] [role]",
    type: "moderation",
    execute(msg, args) {
        lala(msg, args)
    }
}