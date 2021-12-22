const { prefix, by } = require("../config.json");
const { MessageEmbed, Permissions } = require('discord.js');
const { Timeout, Wronganswer, Perm, Cancel, Invalid, Unknown } = require("../errors");
async function delRole(msg, args, example) {
    const role = msg.guild.roles.cache.get(args[0]) || msg.mentions.roles.first();
    let reason = args.slice(1).join(" ");
    let roleName = role.name;

    if (!role) return Invalid(msg, `No Role`, `I need a role in order to delete it`, `${example}`);

    if (!reason) return Invalid(msg, `No Reason`, `I need a reason in order to delete it`, `${example}`);

    await role.delete();
    const Remove = new MessageEmbed()
    .setColor('#00ff00')
    .setTitle(`:white_check_mark: DELETED ROLE :label::heavy_minus_sign:`)
    .setDescription('Role')
    .addFields(
        { name: "A channel has been deleted", value: `\`\`\`${roleName}\`\`\`` },
        { name: "Reason", value: `\`\`\`${reason}\`\`\``}
    )
    .setFooter(`${by} helps`)
    await msg.channel.send({ embeds: [Remove] });
    msg.delete();
}

module.exports = {
    name: "delrole",
    description: "Delete a role",
    example: prefix + "delrole [role] [reason]",
    type: "role",
    execute(msg, args) {
        if (!msg.member.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) return Perm(msg, `No Permission`, `You don't have the permission to manage roles`);
        if (!msg.guild.me.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) return Perm(msg, `No Permission`, `I don't have the permission to manage roles`);
        if (args[0]) return delRole(msg, args, this.example);
        let authorid = msg.author.id;
        const filter = (m) => m.author.id === authorid;
    
        const Role = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`${by} Commands`)
        .setDescription("Command: delrole")
        .addFields(
            { name: "Role Name", value: `I need a role's name to continue` },
            { name: `Cancel Command`, value: `Type \`cancel\`` }
        )
        .setFooter(`${by} helps`)
    
        msg.channel.send({ embeds: [Role] }).then(() => {
            msg.channel.awaitMessages({filter, max: 1 , time: 30000, errors: ['time']})
            .then(collected1 => {
                const response1 = collected1.first();
                if (response1.content == "cancel") return Cancel(msg);
                const role = response1.mentions.roles.first();
                if (!role) return Wronganswer(msg, `No Role`, `I need a valid role name`);
                let roleName = role.name;
    
                const Reason = new MessageEmbed()
                .setColor("RANDOM")
                .setTitle(`${by} Commands`)
                .setDescription("Command: delrole")
                .addFields(
                    { name: "Reason", value: `I need a reason to continue` },
                    { name: `Cancel Command`, value: `Type \`cancel\`` }
                )
                .setFooter(`${by} helps`)
      
                msg.channel.send({ embeds: [Reason] }).then(() => {
                    msg.channel.awaitMessages({filter, max: 1 , time: 30000, errors: ['time']})
                    .then(collected2 => {
                        const response2 = collected2.first();
                        if (response2.content == "cancel") return Cancel(msg);
                        const reason = response2.content;
        
                        role.delete();
                        const Remove = new MessageEmbed()
                        .setColor('#00ff00')
                        .setTitle(`:white_check_mark: DELETED ROLE :label::heavy_minus_sign:`)
                        .setDescription('Role')
                        .addFields(
                            { name: "A role has been deleted", value: `\`\`\`${roleName}\`\`\`` },
                            { name: "Reason", value: `\`\`\`${reason}\`\`\``}
                        )
                        .setFooter(`${by} helps`)
                        msg.channel.send({ embeds: [Remove] });
                        
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