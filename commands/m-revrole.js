const { prefix, by } = require("./../config.json");
const Discord = require("discord.js");
const { Timeout, Wronganswer, Perm, Cancel } = require("../errors");
function lala(msg, args) {
    if (!msg.member.hasPermission("MANAGE_ROLES")) return msg.channel.send(`You don't have the permission to manage roles, ${msg.author}`)
    if(!msg.guild.me.hasPermission("MANAGE_ROLES")) return msg.channel.send(`I dont have the permissions to manage roles, ${msg.author}`)
    const user = msg.mentions.users.first();
    const role = msg.mentions.roles.first();
    const member = msg.guild.member(user);
    if (user) {
        if (role) {
            user.remove(`${role}`)
            const remove = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle("REMOVED ROLE :bust_in_silhouette::heavy_minus_sign:")
            .setDescription("Moderation")
            .addFields(
                { name: `Removed role from ${user.username}`, value: `Removed role: ${role.name}`}
            )
            .setFooter(`${by} helps`)
            msg.channel.send(remove);
        } else {
            const noRole = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`${by} Commands`)
            .setDescription("Command: revrole")
            .addFields(
                { name: "No Role", value: `I need a role in order to remove that role from the member`},
                { name: "Command:", value: `Remove a role from a member\n\`\`\`${prefix}revrole [member] [role]\`\`\``}
            )
            .setFooter(`${by} helps`)
            msg.channel.send(noRole);
        }
    } else {
        const noUser = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`${by} Commands`)
        .setDescription("Command: revrole")
        .addFields(
            { name: "No User", value: `I need an user in order to remove the role from that member`},
            { name: "Command:", value: `Remove a role from a member\n\`\`\`${prefix}revrole [member] [role]\`\`\``}
        )
        .setFooter(`${by} helps`)
        msg.channel.send(noUser);
    }
}

module.exports = {
    name: "revrole",
    description: "Remove a role from a member",
    example: prefix + "revrole [member] [role]",
    type: "moderation",
    execute(msg, args) {
        lala(msg, args)
    }
}