const { prefix, by } = require("../../config.json");
const { MessageEmbed, Permissions } = require('discord.js');
const { Timeout, Wronganswer, Perm, Cancel, Invalid } = require("../../errors");
async function revRole(msg, args, example) {
    const user = msg.guild.members.cache.get(args[0]) || msg.mentions.users.first();
    const role = msg.guild.roles.cache.get(args[0]) || msg.mentions.roles.first();

    if (!user) return Invalid(msg, `No User`, `I need an user in order to add the role to that member`, `${example}`);
    if (!user.manageable) return Invalid(msg, `Not Manageable`, `The user you are trying to change is not manageable`, `${example}`);
    if (!role) return Invalid(msg, `No Role`, `I need a role in order to add that role to the member`, `${example}`);
    if (user.roles.cache.has(`${role.id}`)) return Invalid(msg, `Doesn't have Role`, `The member ${user} doesn't have the role ${role}`, `${example}`);
    
    await user.remove(`${role}`);
    const revRole = new MessageEmbed()
    .setColor('#00ff00')
    .setTitle(`:white_check_mark: REMOVED ROLE :bust_in_silhouette::heavy_minus_sign:`)
    .setDescription('Moderation')
    .addFields(
        { name: "A user has been taken a role", value: `\`\`\`${user.username}\`\`\`` },
        { name: "Removed Role", value: `\`\`\`${role.name}\`\`\``}
    )
    .setFooter({ text: `${by} helps` })
    await msg.channel.send({ embeds: [revRole] });
    msg.delete();
}

module.exports = {
    name: "revrole",
    description: "Remove a role from a member",
    example: prefix + "revrole [member] [role]",
    type: "moderation",
    execute(msg, args) {
        if (!msg.member.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) return Perm(msg, `No Permission`, `You don't have the permission to manage roles`);
        if (!msg.guild.me.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) return Perm(msg, `No Permission`, `I don't have the permission to manage roles`);
        if (args[0]) return revRole(msg, args, this.example);
        const filter = (m) => m.author.id === msg.author.id;
    
        const User = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`${by} Commands`)
        .setDescription("Command: revrole")
        .addFields(
            { name: "Username", value: `I need a username to continue` },
            { name: `Type \`cancel\` to cancel the command` }
        )
        .setFooter({ text: `${by} helps` })
    
        msg.channel.send({ embeds: [User] }).then(() => {
            msg.channel.awaitMessages(filter, { max: 1 , time: 30000, errors: ['time']})
            .then(collected1 => {
                const response1 = collected1.first();
                if (response1.content == 'cancel') return Cancel(msg)
                const user = msg.guild.members.cache.get(response1.content) || response1.mentions.users.first();
                if (!user) return Wronganswer(msg, `No Member`, `I need a valid member username`);
    
                const Role = new MessageEmbed()
                .setColor("RANDOM")
                .setTitle(`${by} Commands`)
                .setDescription("Command: revrole")
                .addFields(
                    { name: "Role", value: `I need a role's name to continue` },
                    { name: `Type \`cancel\` to cancel the command` }
                )
                .setFooter({ text: `${by} helps` })
      
                msg.channel.send({ embeds: [Role] }).then(() => {
                    msg.channel.awaitMessages(filter, { max: 1 , time: 30000, errors: ['time']})
                    .then(collected2 => {
                        const response2 = collected2.first();
                        if (response2.content == `cancel`) return Cancel(msg);
                        const role = msg.guild.roles.cache.get(response2.content) || response2.mentions.roles.first();
                        if (!role) return Wronganswer(msg, `No Role`, `I need a valid role name`);
                        if (!user.roles.cache.has(`${role.id}`)) return Wronganswer(msg, `Doesn't have Role`, `The member ${user.username} doesn't have the role ${role.name}`);
        
                        user.remove(`${role}`);
                        const revRole = new MessageEmbed()
                        .setColor('#00ff00')
                        .setTitle(`:white_check_mark: REMOVED ROLE :bust_in_silhouette::heavy_minus_sign:`)
                        .setDescription('Moderation')
                        .addFields(
                            { name: "A user has been taken a role", value: `\`\`\`${user.username}\`\`\`` },
                            { name: "Removed Role", value: `\`\`\`${role.name}\`\`\`` }
                        )
                        .setFooter({ text: `${by} helps` })
                        msg.channel.send({ embeds: [revRole] });
                        
                    }).catch(error => {
                        if (error == '[object Map]') Timeout(msg);
                        else Unknown(msg, error);
                    });
                })
            }).catch(error => {
                if (error == '[object Map]') Timeout(msg);
                else Unknown(msg, error);
            });
        })
    }
}