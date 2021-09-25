const { prefix, by } = require("./../config.json");
const Discord = require("discord.js");
const { Timeout, Wronganswer, Perm, Cancel, Invalid } = require("../errors");
function addRole(msg, args) {
    if (!msg.member.hasPermission("MANAGE_ROLES")) return Perm(msg, `No Permission`, `You don't have the permission to manage roles`);
    if (!msg.guild.me.hasPermission("MANAGE_ROLES")) return Perm(msg, `No Permission`, `I don't have the permission to manage roles`);
    const user = msg.mentions.users.first();
    const role = msg.mentions.roles.first();

    if (!user) return Invalid(msg, `No User`, `I need an user in order to add the role to that member`, `addrole [member] [role]`);

    const member = msg.guild.member(user);

    if (!member) return Invalid(msg, `No User`, `I need an user in order to add the role to that member`, `addrole [member] [role]`);

    if (!member.manageable) return Invalid(msg, `Not Manageable`, `The user you are trying to change is not manageable`, `addrole [member] [role]`);

    if (!role) return Invalid(msg, `No Role`, `I need a role in order to add that role to the member`, `addrole [member] [role]`);

    if (user.roles.cache.has(`${role.id}`)) return Invalid(msg, `Has Role`, `The member ${user} already has the role ${role}`, `addrole [member] [role]`);

    user.roles.add(`${role.id}`);
    const addRole = new Discord.MessageEmbed()
    .setColor('#00ff00')
    .setTitle(`:white_check_mark: ADDED ROLE :bust_in_silhouette::heavy_plus_sign:`)
    .setDescription('Moderation')
    .addFields(
        { name: "A user has been given a new role", value: `\`\`\`${user.username}\`\`\`` },
        { name: "Added Role", value: `\`\`\`${role.name}\`\`\``}
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
        if (!msg.member.hasPermission("MANAGE_ROLES")) return Perm(msg, `No Permission`, `You don't have the permission to manage roles`);
        if (!msg.guild.me.hasPermission("MANAGE_ROLES")) return Perm(msg, `No Permission`, `I don't have the permission to manage roles`);
        let authorid = msg.author.id;

        const filter1 = response1 => { return response1.author.id === authorid; }
    
        const User = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`${by} Commands`)
        .setDescription("Command: addrole")
        .addFields(
            { name: "Username", value: `I need a username to continue` },
            { name: `Type \`cancel\` to cancel the command` }
        )
        .setFooter(`${by} helps`)
    
        msg.channel.send(User).then(() => {
            msg.channel.awaitMessages(filter1, { max: 1 , time: 30000, errors: ['time']})
            .then(collected1 => {
                const response1 = collected1.first();
                if (response1 == 'cancel') return Cancel(msg)
                const user = response1.mentions.users.first();
                const member = msg.guild.member(user);
                if (!member) return Wronganswer(msg, `No Member`, `I need a valid member username`);
      
                const filter2 = response2 => { return response2.author.id === authorid; }
    
                const Role = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setTitle(`${by} Commands`)
                .setDescription("Command: addrole")
                .addFields(
                    { name: "Role", value: `I need a role's name to continue` },
                    { name: `Type \`cancel\` to cancel the command` }
                )
                .setFooter(`${by} helps`)
      
                msg.channel.send(Role).then(() => {
                    msg.channel.awaitMessages(filter2, { max: 1 , time: 30000, errors: ['time']})
                    .then(collected2 => {
                        const response2 = collected2.first();
                        if (response2 == 'cancel') return Cancel(msg);
                        const role = response2.memtions.roles.first();

                        if (!role) return Wronganswer(msg, `No Role`, `I need a valid role name`);

                        if (user.roles.cache.has(`${role.id}`)) return Wronganswer(msg, `Has Role`, `The member ${user.username} already has the role ${role.name}`);
        
                        member.roles.add(`${role.id}`);
                        const addRole = new Discord.MessageEmbed()
                        .setColor('#00ff00')
                        .setTitle(`:white_check_mark: ADDED ROLE :bust_in_silhouette::heavy_plus_sign:`)
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