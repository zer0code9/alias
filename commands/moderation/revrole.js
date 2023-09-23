const { prefix, by } = require("../../config.json");
const { MessageEmbed, Permissions } = require('discord.js');
const { Timeout, Perm, Cancel, Invalid, Unabled } = require("../../errors");
async function revRole(msg, args, example) {
    const user = await msg.guild.members.cache.get(args[0]) || msg.mentions.users.first();
    const role = await msg.guild.roles.cache.get(args[1]) || msg.mentions.roles.first();

    if (!user) return Invalid(msg, `No User`, `I need an user in order to add the role to that member \n(mention:user or user:id)`, `${example}`);
    if (user.manageable) return Unabled(msg, `Not Manageable`, `The user you are trying to change is not manageable`);
    if (!role) return Invalid(msg, `No Role`, `I need a role in order to add that role to the member \n(mention:role or role:id)`, `${example}`);
    if (!user.roles.cache.has(`${role.id}`)) return Unabled(msg, `Doesn't have Role`, `The member ${user} doesn't have the role ${role}`);
    
    await user.remove(`${role}`);
    const Remove = new MessageEmbed()
    .setColor('#00ff00')
    .setTitle(`:white_check_mark: REMOVED ROLE :bust_in_silhouette::heavy_minus_sign:`)
    .setDescription('Moderation')
    .addFields(
        { name: "A user has been taken a role", value: `\`\`\`${user.username}\`\`\`` },
        { name: "Removed Role", value: `\`\`\`${role.name}\`\`\``}
    )
    .setFooter({ text: `${by} helps` })
    await msg.channel.send({ embeds: [Remove] });
    msg.delete();
}

module.exports = {
    name: "revrole",
    description: "Remove a role from a user",
    example: prefix + "revrole [user:us|id] [role:ro|id]",
    type: "moderation",
    execute(msg, args) {
        if (!msg.member.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) return Perm(msg, `No Permission`, `You don't have the permission to manage roles`);
        if (!msg.guild.me.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) return Perm(msg, `No Permission`, `I don't have the permission to manage roles`);
        const example = this.example;
        if (args[0]) return revRole(msg, args, example);
        const filter = (m) => m.author.id === msg.author.id;
    
        const User = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`${by} Commands`)
        .setDescription("Command: revrole")
        .addFields(
            { name: "Username", value: `I need a user to continue \n(mention:user or user:id)` },
            { name: `Type \`cancel\` to cancel the command` }
        )
        .setFooter({ text: `${by} helps` })
    
        msg.channel.send({ embeds: [User] }).then(() => {
            msg.channel.awaitMessages(filter, { max: 1 , time: 30000, errors: ['time']})
            .then(collected1 => {
                const response1 = collected1.first();
                if (response1.content == `cancel`) return Cancel(msg)
                const user = msg.guild.members.cache.get(response1.content) || response1.mentions.users.first();
                if (!user) return Invalid(msg, `No User`, `I need an user in order to add the role to that member \n(mention:user or user:id)`, `${example}`);
                if (user.manageable) return Unabled(msg, `Not Manageable`, `The user you are trying to change is not manageable`);
    
                const Role = new MessageEmbed()
                .setColor("RANDOM")
                .setTitle(`${by} Commands`)
                .setDescription("Command: revrole")
                .addFields(
                    { name: "Role", value: `I need a role to continue \n(mention:role or role:id)` },
                    { name: `Type \`cancel\` to cancel the command` }
                )
                .setFooter({ text: `${by} helps` })
      
                msg.channel.send({ embeds: [Role] }).then(() => {
                    msg.channel.awaitMessages(filter, { max: 1 , time: 30000, errors: ['time']})
                    .then(collected2 => {
                        const response2 = collected2.first();
                        if (response2.content == `cancel`) return Cancel(msg);
                        const role = msg.guild.roles.cache.get(response2.content) || response2.mentions.roles.first();
                        if (!role) return Invalid(msg, `No Role`, `I need a role in order to add that role to the member \n(mention:role or role:id)`, `${example}`);
                        if (!user.roles.cache.has(`${role.id}`)) return Unabled(msg, `Doesn't have Role`, `The member ${user} doesn't have the role ${role}`);
        
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