const { prefix, by } = require("./../config.json");
const Discord = require("discord.js");
function delRank(msg, args) {
    if (!msg.member.hasPermission("MANAGE_ROLES")) return msg.channel.send(`You don't have the permission to manage roles, ${msg.author}`)
    if(!msg.guild.me.hasPermission("MANAGE_ROLES")) return msg.channel.send(`I dont have the permission to manage roles, ${msg.author}`)
    const role = msg.mentions.roles.first();
    var reason = args.slice(1).join(" ");
    if (role) {
        if (!reason) return reason = "No reason"
        role.delete();
        const remove = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle(`DELETED ROLE :label::heavy_minus_sign:`)
        .setDescription('Rank')
        .addFields(
            { name: "A channel has been deleted", value: `\`\`\`${args}\`\`\`` },
            { name: "Reason", value: `\`\`\`${reason}\`\`\``}
        )
        .setFooter(`${by} helps`)
        msg.channel.send(remove);
    } else {
        const noDelete = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle(`${by} Commands`)
        .setDescription('Command: delrank')
        .addFields(
            { name: "No Channel", value: `I need a channel in order to delete it`},
            { name: "Command:", value: `Delete a role\n\`\`\`${prefix}delrank [role]\`\`\``}
        )
        .setFooter(`${by} helps`)
        msg.channel.send(noDelete);
    }
}

module.exports = {
    name: "delrank",
    description: "Delete a role",
    example: prefix + "delrank [role]",
    type: "rank",
    execute(msg, args) {
        if (!msg.member.hasPermission("MANAGE_ROLES")) return msg.channel.send(`You don't have the permission to manage roles, ${msg.author}`)
        if(!msg.guild.me.hasPermission("MANAGE_ROLES")) return msg.channel.send(`I dont have the permission to manage roles, ${msg.author}`)
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
            msg.channel.awaitMessages(filter1, { max: 1 })
            .then(collected1 => {
                const response1 = collected1.first();
                const role = response1.mentions.roles.first();
                let roleN = role;
                if (!Role) {
                    const noRole = new Discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setTitle(`${by} Commands`)
                    .setDescription("Command: delrank")
                    .addFields(
                        { name: "No Role", value: `I need a valid role name` },
                        { name: "Canceled", value: `Wrong answer`}
                    )
                    .setFooter(`${by} helps`)
                    return msg.channel.send(noRole);
                }
      
                const filter2 = response2 => { return response2.author.id === authorid; }
    
                const Reason = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setTitle(`${by} Commands`)
                .setDescription("Command: delchannel")
                .addFields(
                    { name: "Reason", value: `I need a reason to continue` }
                )
                .setFooter(`${by} helps`)
      
                msg.channel.send(Reason).then(() => {
                    msg.channel.awaitMessages(filter2, { max: 1 })
                    .then(collected2 => {
                        const response2 = collected2.first();
                        const reason = response2.content;
        
                        role.delete();
                        const Remove = new Discord.MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle(`DELETED CHANNEL :file_folder::heavy_minus_sign:`)
                        .setDescription('Channel')
                        .addFields(
                            { name: "A channel has been deleted", value: `\`\`\`${roleN}\`\`\`` },
                            { name: "Reason", value: `\`\`\`${reason}\`\`\``}
                        )
                        .setFooter(`${by} helps`)
                        msg.channel.send(Remove);
                    });
                })
            });
        })
    }
}