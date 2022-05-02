const { prefix, by } = require("../../config.json");
const { MessageEmbed, Permissions } = require('discord.js');
const { Timeout, Wronganswer, Perm, Cancel, Invalid, Unknown } = require("../../errors");
async function colorRole(msg, args, example) {
    const role = msg.guild.roles.cache.get(args[0]) || msg.mentions.roles.first();
    const color = args.slice(1).join(" ");

    if (!role) return Invalid(msg, `No Role`, `I need a role in order to recolor it`, `${example}`);

    if (!color) return Invalid(msg, `No Color`, `I need a color in hex in order to recolor the role`, `${example}`);

    await role.setColor(`${color}`);
    const Color = new MessageEmbed()
    .setColor(`#00ff00`)
    .setTitle(":white_check_mark: CHANGED ROLE COLOR :label::paintbrush:")
    .setDescription("Role")
    .addFields(
        { name: "A role has been color-changed", value: `\`\`\`${role.name}\`\`\``},
        { name: "New Color", value: `\`\`\`${role.hexColor}\`\`\``}
    )
    .setFooter(`${by} helps`)
    await msg.channel.send({ embeds: [Color] });
    msg.delete();
}

module.exports = {
    name: "colorrole",
    description: "Change the color of a role",
    example: prefix + "colorrole [role] [color:hex]",
    type: "role",
    execute(msg, args) {
        if (!msg.member.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) return Perm(msg, `No Permission`, `You don't have the permission to manage roles`);
        if (!msg.guild.me.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) return Perm(msg, `No Permission`, `I don't have the permission to manage roles`);
        if (args[0]) return colorRole(msg, args, this.example);
        let authorid = msg.author.id;
        const filter = (m) => m.author.id === authorid;
    
        const Role = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`${by} Commands`)
        .setDescription("Command: colorrole")
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
                const role = msg.guild.roles.cache.get(response1.content) || response1.mentions.roles.first();
                if (!role) return Wronganswer(msg, `No Role`, `I need a valid role name`);
    
                const Color = new MessageEmbed()
                .setColor("RANDOM")
                .setTitle(`${by} Commands`)
                .setDescription("Command: colorrole")
                .addFields(
                    { name: "Color", value: `I need a color to continue: hex format` },
                    { name: `Cancel Command`, value: `Type \`cancel\`` }
                )
                .setFooter(`${by} helps`)
      
                msg.channel.send({ embeds: [Color] }).then(() => {
                    msg.channel.awaitMessages({filter, max: 1 , time: 30000, errors: ['time']})
                    .then(collected2 => {
                        const response2 = collected2.first();
                        if (response2.content == "cancel") return Cancel(msg);
                        const color = response2;
        
                        role.setColor(`${color}`);
                        const Color = new MessageEmbed()
                        .setColor(`#00ff00`)
                        .setTitle(":white_check_mark: CHANGED COLOR :label::paintbrush:")
                        .setDescription("Role")
                        .addFields(
                            { name: "A role has been color-changed", value: `\`\`\`${role.name}\`\`\``},
                            { name: "New Color", value: `\`\`\`${role.hexColor}\`\`\``}
                        )
                        .setFooter(`${by} helps`)
                        msg.channel.send({ embeds: [Color] });
                        
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