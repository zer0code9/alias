const { prefix, by } = require("./../config.json");
const { MessageEmbed } = require('discord.js');
const { Timeout, Wronganswer, Perm, Cancel, Invalid, Unknown } = require("../errors");
function colorRank(msg, args, example) {
    if (!msg.member.permissions.has("MANAGE_ROLES")) return Perm(msg, `No Permission`, `You don't have the permission to manage roles`);
    if (!msg.guild.me.permissions.has("MANAGE_ROLES")) return Perm(msg, `No Permission`, `I don't have the permission to manage roles`);
    const role = msg.mentions.roles.first();
    const color = args.slice(1).join(" ");

    if (!role) return Invalid(msg, `No Role`, `I need a role in order to recolor it`, `${example}`);

    if (!color) return Invalid(msg, `No Color`, `I need a color in hex in order to recolor the role`, `${example}`);

    role.setColor(`${color}`);
    const Color = new MessageEmbed()
    .setColor(`#00ff00`)
    .setTitle(":white_check_mark: CHANGED COLOR :label::paintbrush:")
    .setDescription("Rank")
    .addFields(
        { name: "A role has changed its color", value: `\`\`\`${role.name}\`\`\``},
        { name: "New Color", value: `\`\`\`${role.hexColor}\`\`\``}
    )
    .setFooter(`${by} helps`)
    msg.channel.send({ embeds: [Color] });
}


module.exports = {
    name: "colorrank",
    description: "Change the color of a role",
    example: prefix + "colorrank [role] [color:hex]",
    type: "rank",
    execute(msg, args) {
        if (args[0]) return colorRank(msg, args, this.example);
        if (!msg.member.permissions.has("MANAGE_ROLES")) return Perm(msg, `No Permission`, `You don't have the permission to manage roles`);
        if (!msg.guild.me.permissions.has("MANAGE_ROLES")) return Perm(msg, `No Permission`, `I don't have the permission to manage roles`);
        let authorid = msg.author.id;
        const filter = (m) => m.author.id === authorid;
    
        const Role = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`${by} Commands`)
        .setDescription("Command: colorrank")
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
    
                const Color = new MessageEmbed()
                .setColor("RANDOM")
                .setTitle(`${by} Commands`)
                .setDescription("Command: colorrank")
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
                        const color = response2.content;
        
                        role.setColor(`${color}`);
                        const Color = new MessageEmbed()
                        .setColor(`#00ff00`)
                        .setTitle(":white_check_mark: CHANGED COLOR :label::paintbrush:")
                        .setDescription("Rank")
                        .addFields(
                            { name: "A role has changed its color", value: `\`\`\`${role.name}\`\`\``},
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