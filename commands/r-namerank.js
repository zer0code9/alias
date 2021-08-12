const { prefix, by } = require("./../config.json");
const Discord = require("discord.js");
function nameRank(msg, args) {
    if (!msg.member.hasPermission("MANAGE_ROLES")) return msg.channel.send(`You don't have the permission to manage roles, ${msg.author}`)
    if(!msg.guild.me.hasPermission("MANAGE_ROLES")) return msg.channel.send(`I dont have the permission to manage roles, ${msg.author}`)
    const role = msg.mentions.roles.first();
    const name = args.slice(1).join(" ");
    if (role) {
            if (name) {
                role.setName(`${name}`)
                const change = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setTitle("RENAMED ROLE :label::pencil2:")
                .setDescription("Rank")
                .addFields(
                    { name: `The name of the role ${role.name} has changed`, value: `\`\`\`New role name: ${name}\`\`\``}
                )
                .setFooter(`${by} helps`)
                msg.channel.send(change);
            } else {
                const noName = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setTitle(`${by} Commands`)
                .setDescription("Command: namerank")
                .addFields(
                    { name: "No name", value: `I need a name in order to rename the role`},
                    { name: "Command:", value: `Change the name of a role\n\`\`\`${prefix}namerank [role] [name]\`\`\``}
                )
                .setFooter(`${by} helps`)
                msg.channel.send(noName);
            }
    } else {
        const noRole = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`${by} Commands`)
        .setDescription("Command: namerank")
        .addFields(
            { name: `No role`, value: `I need a role in order to rename it`},
            { name: "Command:", value: `Change the name of a role\n\`\`\`${prefix}namerank [role] [name]\`\`\`` }
        )
        .setFooter(`${by} helps`)
        msg.channel.send(noRole);
    }
}

module.exports = {
    name: "namerank",
    description: "Change the name of a role",
    example: prefix + "namerank [role] [name]",
    type: "rank",
    execute(msg, args) {
        if (!msg.member.hasPermission("MANAGE_ROLES")) return msg.channel.send(`You don't have the permission to manage roles, ${msg.author}`)
        if(!msg.guild.me.hasPermission("MANAGE_ROLES")) return msg.channel.send(`I dont have the permission to manage roles, ${msg.author}`)
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
                if (!role) {
                    const noRole = new Discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setTitle(`Canceled`)
                    .addFields(
                        { name: "No Role", value: `I need a valid role name` },
                        { name: "Command Canceled", value: `Wrong answer cancelation`}
                    )
                    .setFooter(`${by} helps`)
                    return msg.channel.send(noRole);
                }
      
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
                        .setColor('RANDOM')
                        .setTitle(`RENAMED ROLE :label::pencil2:`)
                        .setDescription('Rank')
                        .addFields(
                            { name: "A role has been renamed", value: `\`\`\`${role.name}\`\`\`` },
                            { name: "Name", value: `\`\`\`${name}\`\`\``}
                        )
                        .setFooter(`${by} helps`)
                        msg.channel.send(Name);
                    }).catch(error => {
                        const Error = new Discord.MessageEmbed()
                        .setColor("RANDOM")
                        .setTitle("Canceled")
                        .addFields(
                            { name: "Command Canceled", value: `Automatic cancelation`}
                        )
                        .setFooter(`${by} helps`)
                        msg.channel.send(Error);  
                    });
                })
            }).catch(error => {
                const Error = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setTitle("Canceled")
                .addFields(
                    { name: "Command Canceled", value: `Automatic cancelation`}
                )
                .setFooter(`${by} helps`)
                msg.channel.send(Error);  
            });
        })
    }
}