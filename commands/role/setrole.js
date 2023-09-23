const { prefix, by } = require("../../config.json");
const { MessageEmbed, Permissions } = require('discord.js');
const { Timeout, Wronganswer, Perm, Cancel, Invalid, Unknown } = require("../../errors");
async function setRole(msg, args, example) {
    const role = await msg.guild.roles.cache.get(args[0]) || msg.mentions.roles.first();

    if (!role) return Invalid(msg, `No Role`, `I need a role in order to rename it \n(mention:role or role:id)`, `${example}`);

    await role.setMentionable(`${!role.mentionable}`);
    const Set = new MessageEmbed()
    .setColor('#00ff00')
    .setTitle(`:white_check_mark: CHANGE ROLE MENTION :label::arrow_heading_up:`)
    .setDescription('Role')
    .addFields(
        { name: "A role has been changed", value: `\`\`\`${role.name}\`\`\`` },
        { name: "Mentionable?", value: `\`\`\`${role.mentionable}\`\`\``}
    )
    .setFooter({ text: `${by} helps` })
    await msg.channel.send({ embeds: [Set] });
    msg.delete();
}

module.exports = {
    name: "setrole",
    description: "Change if a role can be mentioned",
    example: prefix + "setrole [role:ro|id]",
    type: "role",
    execute(msg, args) {
        if (!msg.member.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) return Perm(msg, `No Permission`, `You don't have the permission to manage roles`);
        if (!msg.guild.me.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) return Perm(msg, `No Permission`, `I don't have the permission to manage roles`);
        const example = this.example;
        if (args[0]) return setRole(msg, args, example);
        const filter = (m) => m.author.id === msg.author.id;
    
        const Role = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`${by} Commands`)
        .setDescription("Command: setrole")
        .addFields(
            { name: "Role Name", value: `I need a role's name to continue \n(mention:role or role:id)` },
            { name: `Cancel Command`, value: `Type \`cancel\`` }
        )
        .setFooter({ text: `${by} helps` })
    
        msg.channel.send({ embeds: [Role] }).then(() => {
            msg.channel.awaitMessages({filter, max: 1 , time: 30000, errors: ['time']})
            .then(collected1 => {
                const response1 = collected1.first();
                if (response1.content == "cancel") return Cancel(msg);
                const role = response1.mentions.roles.first();
                if (!role) return Invalid(msg, `No Role`, `I need a role in order to rename it \n(mention:role or role:id)`, `${example}`);
    
                role.setMentionable(`${!role.mentionable}`);
                const Set = new MessageEmbed()
                .setColor('#00ff00')
                .setTitle(`:white_check_mark: CHANGE ROLE MENTION :label::arrow_heading_up:`)
                .setDescription('Role')
                .addFields(
                    { name: "A role has been changed", value: `\`\`\`${role.name}\`\`\`` },
                    { name: "Mentionable?", value: `\`\`\`${role.mentionable}\`\`\``}
                )
                .setFooter({ text: `${by} helps` })
                msg.channel.send({ embeds: [Set] });

            }).catch(error => {
                if (error == '[object Map]') Timeout(msg);
                else Unknown(msg, error);
            });
        })
    }
}