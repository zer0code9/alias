const { prefix, by } = require("../../config.json");
const { MessageEmbed, Permissions } = require('discord.js');
const { Timeout, Wronganswer, Perm, Cancel, Invalid, Unknown } = require("../../errors");
async function nameRole(msg, args, example) {
    const role = await msg.guild.roles.cache.get(args[0]) || msg.mentions.roles.first();
    const name = await args.slice(1).join(" ");
    let roleName = role.name;

    if (!role) return Invalid(msg, `No Role`, `I need a role in order to rename it \n(mention:role or role:id)`, `${example}`);
    if (!name) return Invalid(msg, `No Name`, `I need a name in order to rename the role \n(text:phrase)`, `${example}`);

    await role.setName(`${name}`);
    const Name = new MessageEmbed()
    .setColor('#00ff00')
    .setTitle(`:white_check_mark: RENAMED ROLE :label::pencil2:`)
    .setDescription('Role')
    .addFields(
        { name: "A role has been renamed", value: `\`\`\`${roleName}\`\`\`` },
        { name: "New Name", value: `\`\`\`${name}\`\`\``}
    )
    .setFooter({ text: `${by} helps` })
    await msg.channel.send({ embeds: [Name] });
    msg.delete();
}

module.exports = {
    name: "namerole",
    description: "Change the name of a role",
    example: prefix + "namerole [role:ro|id] [name:p]",
    type: "role",
    execute(msg, args) {
        if (!msg.member.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) return Perm(msg, `No Permission`, `You don't have the permission to manage roles`);
        if (!msg.guild.me.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) return Perm(msg, `No Permission`, `I don't have the permission to manage roles`);
        const example = this.example;
        if (args[0]) return nameRole(msg, args, example);
        const filter = (m) => m.author.id === msg.author.id;
    
        const Role = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`${by} Commands`)
        .setDescription("Command: namerole")
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
                const role = response1.mentions.roles.first();
                if (!role) return Invalid(msg, `No Role`, `I need a role in order to rename it \n(mention:role or role:id)`, `${example}`);
                let roleName = role.name;
    
                const Name = new MessageEmbed()
                .setColor("RANDOM")
                .setTitle(`${by} Commands`)
                .setDescription("Command: namerole")
                .addFields(
                    { name: "Name", value: `I need a name to continue \n(phrase)` },
                    { name: `Cancel Command`, value: `Type \`cancel\`` }
                )
                .setFooter({ text: `${by} helps` })
      
                msg.channel.send({ embeds: [Name] }).then(() => {
                    msg.channel.awaitMessages({filter, max: 1 , time: 30000, errors: ['time']})
                    .then(collected2 => {
                        const response2 = collected2.first();
                        if (response2.content == "cancel") return Cancel(msg);
                        const name = response2.content;
                        if (!name) return Invalid(msg, `No Name`, `I need a name in order to rename the role \n(phrase)`, `${example}`);
        
                        role.setName(`${name}`)
                        const Name = new MessageEmbed()
                        .setColor('#00ff00')
                        .setTitle(`:white_check_mark: RENAMED ROLE :label::pencil2:`)
                        .setDescription('Role')
                        .addFields(
                            { name: "A role has been renamed", value: `\`\`\`${roleName}\`\`\`` },
                            { name: "New Name", value: `\`\`\`${name}\`\`\``}
                        )
                        .setFooter({ text: `${by} helps` })
                        msg.channel.send({ embeds: [Name] });
                        
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