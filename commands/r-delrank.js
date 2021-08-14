const { prefix, by } = require("./../config.json");
const Discord = require("discord.js");
function delRank(msg, args) {
    if (!msg.member.hasPermission("MANAGE_ROLES")) return msg.channel.send(`You don't have the permission to manage roles, ${msg.author}`)
    if (!msg.guild.me.hasPermission("MANAGE_ROLES")) return msg.channel.send(`I dont have the permission to manage roles, ${msg.author}`)
    const role = msg.mentions.roles.first();
    let reason = args.slice(1).join(" ");

    const noDelete = new Discord.MessageEmbed()
    .setColor('#ff0000')
    .setTitle(`:warning: CANCELED :warning:`)
    .addFields(
        { name: "No Role", value: `I need a role in order to delete it`},
        { name: "Command:", value: `\`${prefix}delrank [role] [reason]\``}
    )
    .setFooter(`${by} helps`)
    if (!role) return msg.channel.send(noDelete);

    if (!reason) reason = "No reason";

    role.delete();
    const remove = new Discord.MessageEmbed()
    .setColor('#00ff00')
    .setTitle(`:white_check_mark: DELETED ROLE :label::heavy_minus_sign:`)
    .setDescription('Rank')
    .addFields(
        { name: "A channel has been deleted", value: `\`\`\`${args[0]}\`\`\`` },
        { name: "Reason", value: `\`\`\`${reason}\`\`\``}
    )
    .setFooter(`${by} helps`)
    msg.channel.send(remove);
}

module.exports = {
    name: "delrank",
    description: "Delete a role",
    example: prefix + "delrank [role] [reason]",
    type: "rank",
    execute(msg, args) {
        if (!msg.member.hasPermission("MANAGE_ROLES")) return msg.channel.send(`You don't have the permission to manage roles, ${msg.author}`)
        if (!msg.guild.me.hasPermission("MANAGE_ROLES")) return msg.channel.send(`I dont have the permission to manage roles, ${msg.author}`)
        let authorid = msg.author.id;

        const filter1 = response1 => { return response1.author.id === authorid; }
    
        const Role = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`${by} Commands`)
        .setDescription("Command: delrank")
        .addFields(
            { name: "Role Name", value: `I need a role's name to continue` }
        )
        .setFooter(`${by} helps`)
    
        msg.channel.send(Role).then(() => {
            msg.channel.awaitMessages(filter1, { max: 1 , time: 30000, errors: ['time']})
            .then(collected1 => {
                const response1 = collected1.first();
                const role = response1.mentions.roles.first();
                let roleN = role.name;
                if (!Role) {
                    const noRole = new Discord.MessageEmbed()
                    .setColor("#ff0000")
                    .setTitle(`:warning: CANCELED :warning:`)
                    .addFields(
                        { name: "No Role", value: `I need a valid role name` },
                        { name: "Command Canceled", value: `Wrong answer cancelation`}
                    )
                    .setFooter(`${by} helps`)
                    return msg.channel.send(noRole);
                }
      
                const filter2 = response2 => { return response2.author.id === authorid; }
    
                const Reason = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setTitle(`${by} Commands`)
                .setDescription("Command: delrank")
                .addFields(
                    { name: "Reason", value: `I need a reason to continue` }
                )
                .setFooter(`${by} helps`)
      
                msg.channel.send(Reason).then(() => {
                    msg.channel.awaitMessages(filter2, { max: 1 , time: 30000, errors: ['time']})
                    .then(collected2 => {
                        const response2 = collected2.first();
                        const reason = response2.content;
        
                        role.delete();
                        const Remove = new Discord.MessageEmbed()
                        .setColor('#00ff00')
                        .setTitle(`:white_check_mark: DELETED ROLE :label::heavy_minus_sign:`)
                        .setDescription('Rank')
                        .addFields(
                            { name: "A role has been deleted", value: `\`\`\`${roleN}\`\`\`` },
                            { name: "Reason", value: `\`\`\`${reason}\`\`\``}
                        )
                        .setFooter(`${by} helps`)
                        msg.channel.send(Remove);
                    }).catch(error => {
                        const Error = new Discord.MessageEmbed()
                        .setColor("#ff0000")
                        .setTitle(":x: CANCELED :x:")
                        .addFields(
                            { name: "Command Canceled", value: `Timeout cancelation`}
                        )
                        .setFooter(`${by} helps`)
                        msg.channel.send(Error);  
                    });
                })
            }).catch(error => {
                const Error = new Discord.MessageEmbed()
                .setColor("#ff0000")
                .setTitle(":x: CANCELED :x:")
                .addFields(
                    { name: "Command Canceled", value: `Timeout cancelation`}
                )
                .setFooter(`${by} helps`)
                msg.channel.send(Error);  
            });
        })
    }
}