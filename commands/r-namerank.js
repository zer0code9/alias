const { prefix, by } = require("./../config.json");
const Discord = require("discord.js");
const { Timeout, Wronganswer, Perm, Cancel, Invalid } = require("../errors");
function nameRank(msg, args) {
    if (!msg.member.hasPermission("MANAGE_ROLES")) return Perm(msg, `No Permission`, `You don't have the permission to manage roles`);
    if (!msg.guild.me.hasPermission("MANAGE_ROLES")) return Perm(msg, `No Permission`, `I don't have the permission to manage roles`);
    const role = msg.mentions.roles.first();
    const name = args.slice(1).join(" ");

    if (!role) return Invalid(msg, `No Role`, `I need a role in order to rename it`, `namerank [role] [name]`);

    if (!name) return Invalid(msg, `No Name`, `I need a name in order to rename the role`, `namerank [role] [name]`);

    role.setName(`${name}`)
    const Name = new Discord.MessageEmbed()
    .setColor('#00ff00')
    .setTitle(`:white_check_mark: RENAMED ROLE :label::pencil2:`)
    .setDescription('Rank')
    .addFields(
        { name: "A role has been renamed", value: `\`\`\`${role.name}\`\`\`` },
        { name: "Name", value: `\`\`\`${name}\`\`\``}
    )
    .setFooter(`${by} helps`)
    msg.channel.send(Name);
}

module.exports = {
    name: "namerank",
    description: "Change the name of a role",
    example: prefix + "namerank [role] [name]",
    type: "rank",
    execute(msg, args) {
        if (args[0]) {return nameRank(msg, args);}
        if (!msg.member.hasPermission("MANAGE_ROLES")) return Perm(msg, `No Permission`, `You don't have the permission to manage roles`);
        if (!msg.guild.me.hasPermission("MANAGE_ROLES")) return Perm(msg, `No Permission`, `I don't have the permission to manage roles`);
        let authorid = msg.author.id;

        const filter1 = response1 => { return response1.author.id === authorid; }
    
        const Role = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`${by} Commands`)
        .setDescription("Command: namerank")
        .addFields(
            { name: "Role Name", value: `I need a role's name to continue` }
        )
        .setFooter(`${by} helps`)
    
        msg.channel.send(Role).then(() => {
            msg.channel.awaitMessages(filter1, { max: 1 , time: 30000, errors: ['time']})
            .then(collected1 => {
                const response1 = collected1.first();
                const role = response1.mentions.roles.first();

                if (!role) return Wronganswer(msg, `No Role`, `I need a valid role name`);
      
                const filter2 = response2 => { return response2.author.id === authorid; }
    
                const Name = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setTitle(`${by} Commands`)
                .setDescription("Command: namerank")
                .addFields(
                    { name: "Name", value: `I need a name to continue` }
                )
                .setFooter(`${by} helps`)
      
                msg.channel.send(Name).then(() => {
                    msg.channel.awaitMessages(filter2, { max: 1 , time: 30000, errors: ['time']})
                    .then(collected2 => {
                        const response2 = collected2.first();
                        const name = response2.content;
        
                        role.setName(`${name}`)
                        const Name = new Discord.MessageEmbed()
                        .setColor('#00ff00')
                        .setTitle(`:white_check_mark: RENAMED ROLE :label::pencil2:`)
                        .setDescription('Rank')
                        .addFields(
                            { name: "A role has been renamed", value: `\`\`\`${role.name}\`\`\`` },
                            { name: "Name", value: `\`\`\`${name}\`\`\``}
                        )
                        .setFooter(`${by} helps`)
                        msg.channel.send(Name);
                        
                    }).catch(error => {
                        Timeout(msg);
                    });
                })
            }).catch(error => {
                Timeout(msg); 
            });
        })
    }
}