const { prefix, by } = require("./../config.json");
const Discord = require("discord.js");
const { Timeout, Wronganswer, Perm, Cancel, Invalid } = require("../errors");
function lala(msg, args) {
    if (!msg.member.hasPermission("MANAGE_ROLES")) return Perm(msg, `No Permission`, `You don't have the permission to manage roles`);
    if (!msg.guild.me.hasPermission("MANAGE_ROLES")) return Perm(msg, `No Permission`, `I don't have the permission to manage roles`);
    const user = msg.mentions.users.first();
    const role = msg.mentions.roles.first();

    if (!user) return Invalid(msg, `No User`, `I need an user in order to add the role to that member`, `addrole [member] [role]`);

    const member = msg.guild.member(user);

    if (!member) return Invalid(msg, `No User`, `I need an user in order to add the role to that member`, `addrole [member] [role]`);

    if (!member.manageable) return Invalid(msg, `Not Manageable`, `The user you are trying to change is not manageable`, `addrole [member] [role]`);

    if (!role) return Invalid(msg, `No Role`, `I need a role in order to add that role to the member`, `addrole [member] [role]`);

    if (user.roles.cache.has(`${role.id}`)) return Invalid(msg, `Has Role`, `The member ${user} already has the role ${role}`, `addrole [member] [role]`);
    
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