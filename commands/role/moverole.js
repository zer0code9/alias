const { prefix, by } = require("../../config.json");
const { MessageEmbed, Permissions } = require('discord.js');
const { Timeout, Wronganswer, Perm, Cancel, Invalid, Unknown } = require("../../errors");
async function moveRole(msg, args, example) {
    const role = await msg.guild.roles.cache.get(args[0]) || msg.mentions.roles.first();
    let position = await args.slice(1).join(" ");

    if (!role) return Invalid(msg, `No Role`, `I need a role in order to rename it \n(mention:role or role:id)`, `${example}`);
    if (!position) return Invalid(msg, `No Position`, `I need a postion in order to move the role \n(number:integer)`, `${example}`);
    if (isNaN(position)) return Wronganswer(msg, `Not A Number`, `The position must be a whole number \n(integer)`);
    if (position < 1 || position > parseInt(msg.guild.roles.cache.size)-2) return Wronganswer(msg, `Imposible Position`, `can only be between 1 and ${parseInt(msg.guild.roles.cache.size)-2}`);

    //console.log((parseInt(msg.guild.roles.cache.size) - position) - 1)
    await role.setPosition(`${(parseInt(msg.guild.roles.cache.size) - position) - 1}`);
    const Move = new MessageEmbed()
    .setColor('#00ff00')
    .setTitle(`:white_check_mark: MOVED ROLE :label::arrow_heading_up:`)
    .setDescription('Role')
    .addFields(
        { name: "A role has been moved", value: `\`\`\`${role.name}\`\`\`` },
        { name: "New Position", value: `\`\`\`${parseInt(msg.guild.roles.cache.size) - parseInt(role.position)}\`\`\``}
    )
    .setFooter({ text: `${by} helps` })
    await msg.channel.send({ embeds: [Move] });
    msg.delete();
}

module.exports = {
    name: "moverole",
    description: "Change the position of a role",
    example: prefix + "moverole [role:ro|id] [position:in]",
    type: "role",
    execute(msg, args) {
        if (!msg.member.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) return Perm(msg, `No Permission`, `You don't have the permission to manage roles`);
        if (!msg.guild.me.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) return Perm(msg, `No Permission`, `I don't have the permission to manage roles`);
        const example = this.example;
        if (args[0]) return moveRole(msg, args, example);
        const filter = (m) => m.author.id === msg.author.id;
    
        const Role = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`${by} Commands`)
        .setDescription("Command: moverole")
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
                if (!role) return Invalid(msg, `No Role`, `I need a role in order to rename it \n(mention:role or role:id)`, `${example}`);
    
                const Position = new MessageEmbed()
                .setColor("RANDOM")
                .setTitle(`${by} Commands`)
                .setDescription("Command: moverole")
                .addFields(
                    { name: "Name", value: `I need a number to continue \n(number:integer)` },
                    { name: `Cancel Command`, value: `Type \`cancel\`` }
                )
                .setFooter({ text: `${by} helps` })
      
                msg.channel.send({ embeds: [Position] }).then(() => {
                    msg.channel.awaitMessages({filter, max: 1 , time: 30000, errors: ['time']})
                    .then(collected2 => {
                        const response2 = collected2.first();
                        if (response2.content == "cancel") return Cancel(msg);
                        const position = response2;
                        if (!position) return Invalid(msg, `No Position`, `I need a postion in order to move the role \n(number:integer)`, `${example}`);
                        if (isNaN(position)) return Wronganswer(msg, `Not A Number`, `The position must be a whole number \n(integer)`);
                        if (position < 1 || position > parseInt(msg.guild.roles.cache.size)-2) return Wronganswer(msg, `Imposible Position`, `can only be between 1 and ${parseInt(msg.guild.roles.cache.size)-2}`);
        
                        role.setPosition(`${position}`);
                        const Move = new MessageEmbed()
                        .setColor('#00ff00')
                        .setTitle(`:white_check_mark: MOVED ROLE :label::arrow_heading_up:`)
                        .setDescription('Role')
                        .addFields(
                            { name: "A role has been moved", value: `\`\`\`${role.name}\`\`\`` },
                            { name: "New Position", value: `\`\`\`${position}\`\`\``}
                        )
                        .setFooter({ text: `${by} helps` })
                        msg.channel.send({ embeds: [Move] });
                        
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