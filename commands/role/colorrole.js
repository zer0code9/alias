const { prefix, by } = require("../../config.json");
const { MessageEmbed, Permissions } = require('discord.js');
const { Timeout, Wronganswer, Perm, Cancel, Invalid, Unknown } = require("../../errors");
async function colorRole(msg, args, example) {
    const role = await msg.guild.roles.cache.get(args[0]) || msg.mentions.roles.first();
    const color = await args.slice(1).join(" ");

    if (!role) return Invalid(msg, `No Role`, `I need a role in order to recolor it \n(mention:role or role:id)`, `${example}`);
    if (!color) return Invalid(msg, `No Color`, `I need a color in hex in order to recolor the role \n(text:hex)`, `${example}`);

    await role.setColor(`${color}`);
    const Color = new MessageEmbed()
    .setColor(`#00ff00`)
    .setTitle(":white_check_mark: CHANGED ROLE COLOR :label::paintbrush:")
    .setDescription("Role")
    .addFields(
        { name: "A role has been color-changed", value: `\`\`\`${role.name}\`\`\``},
        { name: "New Color", value: `\`\`\`${role.hexColor}\`\`\``}
    )
    .setFooter({ text: `${by} helps` })
    await msg.channel.send({ embeds: [Color] });
    msg.delete();
}

module.exports = {
    name: "colorrole",
    description: "Change the color of a role",
    example: prefix + "colorrole [role:ro|id] [color:hex]",
    type: "role",
    execute(msg, args) {
        if (!msg.member.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) return Perm(msg, `No Permission`, `You don't have the permission to manage roles`);
        if (!msg.guild.me.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) return Perm(msg, `No Permission`, `I don't have the permission to manage roles`);
        const example = this.example;
        if (args[0]) return colorRole(msg, args, example);
        const filter = (m) => m.author.id === msg.author.id;
    
        const Role = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`${by} Commands`)
        .setDescription("Command: colorrole")
        .addFields(
            { name: "Role Name", value: `I need a role to continue \n(mention:role or role:id)` },
            { name: `Cancel Command`, value: `Type \`cancel\`` }
        )
        .setFooter({ text: `${by} helps` })
    
        msg.channel.send({ embeds: [Role] }).then(() => {
            msg.channel.awaitMessages({filter, max: 1 , time: 30000, errors: ['time']})
            .then(collected1 => {
                const response1 = collected1.first();
                if (response1.content == "cancel") return Cancel(msg);
                const role = msg.guild.roles.cache.get(response1.content) || response1.mentions.roles.first();
                if (!role) return Invalid(msg, `No Role`, `I need a role in order to recolor it \n(mention:role or role:id)`, `${example}`);
    
                const Color = new MessageEmbed()
                .setColor("RANDOM")
                .setTitle(`${by} Commands`)
                .setDescription("Command: colorrole")
                .addFields(
                    { name: "Color", value: `I need a color to continue \n(phrase:hex)` },
                    { name: `Cancel Command`, value: `Type \`cancel\`` }
                )
                .setFooter({ text: `${by} helps` })
      
                msg.channel.send({ embeds: [Color] }).then(() => {
                    msg.channel.awaitMessages({filter, max: 1 , time: 30000, errors: ['time']})
                    .then(collected2 => {
                        const response2 = collected2.first();
                        if (response2.content == "cancel") return Cancel(msg);
                        const color = response2;
                        if (!color) return Invalid(msg, `No Color`, `I need a color in hex in order to recolor the role \n(phrae:hex)`, `${example}`);
        
                        role.setColor(`${color}`);
                        const Color = new MessageEmbed()
                        .setColor(`#00ff00`)
                        .setTitle(":white_check_mark: CHANGED COLOR :label::paintbrush:")
                        .setDescription("Role")
                        .addFields(
                            { name: "A role has been color-changed", value: `\`\`\`${role.name}\`\`\``},
                            { name: "New Color", value: `\`\`\`${role.hexColor}\`\`\``}
                        )
                        .setFooter({ text: `${by} helps` })
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