const { prefix, by } = require("../config.json");
const { MessageEmbed, Permissions } = require('discord.js');
const { Timeout, Wronganswer, Perm, Cancel, Invalid, Unknown } = require("../errors");
function setRole(msg, args, example) {
    const role = msg.guild.roles.cache.get(args[0]) || msg.mentions.roles.first();
    const mention = args[1];
    var boolean;

    if (!role) return Invalid(msg, `No Role`, `I need a role in order to rename it`, `${example}`);

    if (!mention) return Invalid(msg, `No Boolean`, `I need a boolean in order to change the role`, `${example}`);
    if (mention != "true") return Wronganswer(msg, `Not A Boolean`, `I need a boolean (true or false)`);
    if (mention == 'true') boolean = true; else boolean = false;

    role.setMentionable(`${mention}`);
    const Set = new MessageEmbed()
    .setColor('#00ff00')
    .setTitle(`:white_check_mark: CHANGE ROLE MENTION :label::arrow_heading_up:`)
    .setDescription('Role')
    .addFields(
        { name: "A role has been changed", value: `\`\`\`${role.name}\`\`\`` },
        { name: "Mentionable?", value: `\`\`\`${mention}\`\`\``}
    )
    .setFooter(`${by} helps`)
    msg.channel.send({ embeds: [Set] });
}

module.exports = {
    name: "setrole",
    description: "Change if a role can be mentioned",
    example: prefix + "setrole [role] [boolean]",
    type: "role",
    execute(msg, args) {
        if (!msg.member.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) return Perm(msg, `No Permission`, `You don't have the permission to manage roles`);
        if (!msg.guild.me.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) return Perm(msg, `No Permission`, `I don't have the permission to manage roles`);
        if (args[0]) return setRole(msg, args, this.example);
        let authorid = msg.author.id;
        const filter = (m) => m.author.id === authorid;
    
        const Role = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`${by} Commands`)
        .setDescription("Command: setrole")
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
    
                const Boolean = new MessageEmbed()
                .setColor("RANDOM")
                .setTitle(`${by} Commands`)
                .setDescription("Command: setrole")
                .addFields(
                    { name: "Boolean", value: `I need a boolean (true or false) to continue` },
                    { name: `Cancel Command`, value: `Type \`cancel\`` }
                )
                .setFooter(`${by} helps`)
      
                msg.channel.send({ embeds: [Boolean] }).then(() => {
                    msg.channel.awaitMessages({filter, max: 1 , time: 30000, errors: ['time']})
                    .then(collected2 => {
                        const response2 = collected2.first();
                        if (response2.content == "cancel") return Cancel(msg);
                        const mention = response2.content;
                        if (typeof mention != 'boolean') return Wronganswer(msg, `Not A Boolean`, `I need a boolean (true or false)`);
        
                        role.setMentionable(`${mention}`);
                        const Set = new MessageEmbed()
                        .setColor('#00ff00')
                        .setTitle(`:white_check_mark: CHANGE ROLE MENTION :label::arrow_heading_up:`)
                        .setDescription('Role')
                        .addFields(
                            { name: "A role has been changed", value: `\`\`\`${role.name}\`\`\`` },
                            { name: "Mentionable?", value: `\`\`\`${mention}\`\`\``}
                        )
                        .setFooter(`${by} helps`)
                        msg.channel.send({ embeds: [Set] });
                        
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