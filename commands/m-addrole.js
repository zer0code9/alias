const { prefix, by } = require("./../config.json");
const Discord = require("discord.js");
const { Timeout, Wronganswer, Cancel } = require("../errors");
function addRole(msg, args) {
    if (!msg.member.hasPermission("MANAGE_ROLES")) return msg.channel.send(`You don't have the permission to manage roles, ${msg.author}`)
    if (!msg.guild.me.hasPermission("MANAGE_ROLES")) return msg.channel.send(`I dont have the permissions to manage roles, ${msg.author}`)
    const user = msg.mentions.users.first();
    const role = msg.mentions.roles.first();
    const member = msg.guild.member(user);

    const noUser = new Discord.MessageEmbed()
    .setColor("#ff0000")
    .setTitle(`:warning: CANCELED :warning:`)
    .addFields(
        { name: "No User", value: `I need an user in order to add the role to that member`},
        { name: "Command:", value: `\`${prefix}addrole [member] [role]\``}
    )
    .setFooter(`${by} helps`)
    if (!user) return msg.channel.send(noUser);

    const noMember = new Discord.MessageEmbed()
    .setColor("#ff0000")
    .setTitle(`:warning: CANCELED :warning:`)
    .addFields(
        { name: "No Member", value: `The user ${user} is not a member`},
        { name: "Command:", value: `\`${prefix}addrole [member] [role]\``}
    )
    .setFooter(`${by} helps`)
    if (!member) return msg.channel.send(noMember);

    const noRole = new Discord.MessageEmbed()
    .setColor("#ff0000")
    .setTitle(`:warning: CANCELED :warning:`)
    .addFields(
        { name: "No Role", value: `I need a role in order to add that role to the member`},
        { name: "Command:", value: `\`${prefix}addrole [member] [role]\``}
    )
    .setFooter(`${by} helps`)
    if (!role) return msg.channel.send(noRole);

    const hasRole = new Discord.MessageEmbed()
    .setColor("#ff0000")
    .setTitle(`:warning: CANCELED :warning:`)
    .addFields(
        { name: "Has Role", value: `The member ${user} already has the role ${role}`},
        { name: "Command:", value: `\`${prefix}addrole [member] [role]\``}
    )
    .setFooter(`${by} helps`)
    if (user.roles.cache.has(`${role.id}`)) return msg.channel.send(hasRole);

    user.roles.add(`${role.id}`)
    const addRole = new Discord.MessageEmbed()
    .setColor('#00ff00')
    .setTitle(`:white_check_mark: DELETED ROLE :label::heavy_minus_sign:`)
    .setDescription('Moderation')
    .addFields(
        { name: "A user has been given a new role", value: `\`\`\`${user.username}\`\`\`` },
        { name: "New Role", value: `\`\`\`${role.name}\`\`\``}
    )
    .setFooter(`${by} helps`)
    msg.channel.send(addRole);
}

module.exports = {
    name: "addrole",
    description: "Add a role to a member",
    example: prefix + "addrole [member] [role]",
    type: "moderation",
    execute(msg, args) {
        if (args[0]) {return addRole(msg, args)}
        if (!msg.member.hasPermission("MANAGE_ROLES")) return msg.channel.send(`You don't have the permission to manage roles, ${msg.author}`)
        if (!msg.guild.me.hasPermission("MANAGE_ROLES")) return msg.channel.send(`I dont have the permissions to manage roles, ${msg.author}`)
        let authorid = msg.author.id;

        const filter1 = response1 => { return response1.author.id === authorid; }
    
        const User = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`${by} Commands`)
        .setDescription("Command: delrank")
        .addFields(
            { name: "Role Name", value: `I need a username to continue` }
        )
        .setFooter(`${by} helps`)
    
        msg.channel.send(User).then(() => {
            msg.channel.awaitMessages(filter1, { max: 1 , time: 30000, errors: ['time']})
            .then(collected1 => {
                const response1 = collected1.first();
                if (response1 == 'cancel') return Cancel(msg)
                const user = response1.mentions.users.first();
                const member = msg.guild.member(user);

                if (!member) return Wronganswer(msg, `No Member`, `I need a valid member username.`);
      
                const filter2 = response2 => { return response2.author.id === authorid; }
    
                const Role = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setTitle(`${by} Commands`)
                .setDescription("Command: addrole")
                .addFields(
                    { name: "Role", value: `I need a role's name to continue` }
                )
                .setFooter(`${by} helps`)
      
                msg.channel.send(Role).then(() => {
                    msg.channel.awaitMessages(filter2, { max: 1 , time: 30000, errors: ['time']})
                    .then(collected2 => {
                        const response2 = collected2.first();
                        if (response2 == 'cancel') return Cancel(msg);
                        const role = response2.memtions.roles.first();

                        if (!role) return Wronganswer(msg, `No Role`, `I need a valid role name.`);

                        const hasRole = new Discord.MessageEmbed()
                        .setColor("#ff0000")
                        .setTitle(`:warning: CANCELED :warning:`)
                        .addFields(
                            { name: "Has Role", value: `The member ${user.username} already has the role ${role.name}`},
                            { name: "Command:", value: `\`${prefix}addrole [member] [role]\``}
                        )
                        .setFooter(`${by} helps`)
                        if (user.roles.cache.has(`${role.id}`)) return msg.channel.send(hasRole);
        
                        role.delete();
                        const addRole = new Discord.MessageEmbed()
                        .setColor('#00ff00')
                        .setTitle(`:white_check_mark: DELETED ROLE :label::heavy_minus_sign:`)
                        .setDescription('Moderation')
                        .addFields(
                            { name: "A user has been given a new role", value: `\`\`\`${user.username}\`\`\`` },
                            { name: "New Role", value: `\`\`\`${role.name}\`\`\``}
                        )
                        .setFooter(`${by} helps`)
                        msg.channel.send(addRole);
                        
                    }).catch(error => {
                        Timeout(msg)
                    });
                })
            }).catch(error => {
                Timeout(msg)
            });
        })
    }
}