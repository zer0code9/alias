const { prefix, by } = require("./../config.json");
const Discord = require("discord.js");
function colorRank(msg, args) {
    if (!msg.member.hasPermission("MANAGE_ROLES")) return msg.channel.send(`You don't have the permission to manage roles, ${msg.author}`)
    if(!msg.guild.me.hasPermission("MANAGE_ROLES")) return msg.channel.send(`I dont have the permissions to manage roles, ${msg.author}`)
    const role = msg.mentions.roles.first();
    const color = args.slice(1).join(" ");
    if (role) {
        if (color) {
            role.setColor(`${color}`);
            const change = new Discord.MessageEmbed()
            .setColor(`${role.hexColor}`)
            .setTitle("CHANGED COLOR :label::paintbrush:")
            .setDescription("Rank")
            .addFields(
                { name: `The color of the role ${role.name} has changed`, value: `\`\`\`Color of the role: ${color}\`\`\``}
            )
            .setFooter(`${by} helps`)
            msg.channel.send(change);
        } else {
            const noColor = new Discord.MessageEmbed()
            .setColor(`${role.hexColor}`)
            .setTitle(`${by} Commands`)
            .setDescription("Command: colorrank")
            .addFields(
                { name: "No color", value: `I need a color in hex in order to recolor the role`},
                { name: "Command", value: `Change the color of a role\n\`\`\`${prefix}colorrank [role] [color:hex]\`\`\``}
            )
            .setFooter(`${by} helps`)
            msg.channel.send(noColor);
        }
        
    } else {
            const yes = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`${by} Commands`)
            .setDescription("Command: colorrank")
            .addFields(
                { name: `No role`, value: `I need a role in order to recolor it`},
                { name: "Command", value: `Change the color of a role\n\`\`\`${prefix}colorrank [role] [color:hex]\`\`\``}
            )
            .setFooter(`${by} helps`)
            msg.channel.send(yes);
    }
}


module.exports = {
    name: "colorrank",
    description: "Change the color of a role",
    example: prefix + "colorrank [role] [color:hex]",
    type: "rank",
    execute(msg, args) {
        if (!msg.member.hasPermission("MANAGE_ROLES")) return msg.channel.send(`You don't have the permission to manage roles, ${msg.author}`)
        if(!msg.guild.me.hasPermission("MANAGE_ROLES")) return msg.channel.send(`I dont have the permission to manage roles, ${msg.author}`)
        let authorid = msg.author.id;

        const filter1 = response1 => { return response1.author.id === authorid; }
    
        const Role = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`${by} Commands`)
        .setDescription("Command: colorrank")
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
    
                const Color = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setTitle(`${by} Commands`)
                .setDescription("Command: colorrank")
                .addFields(
                    { name: "Color", value: `I need a color to continue: hex format` }
                )
                .setFooter(`${by} helps`)
      
                msg.channel.send(Color).then(() => {
                    msg.channel.awaitMessages(filter2, { max: 1 , time: 30000, errors: ['time']})
                    .then(collected2 => {
                        const response2 = collected2.first();
                        const color = response2.content;
        
                        role.setColor(`${color}`);
                        const Color = new Discord.MessageEmbed()
                        .setColor(`${role.hexColor}`)
                        .setTitle("CHANGED COLOR :label::paintbrush:")
                        .setDescription("Rank")
                        .addFields(
                            { name: "A role has changed its color", value: `\`\`\`${role.name}\`\`\``},
                            { name: "New Color", value: `\`\`\`${role.hexColor}\`\`\``}
                        )
                        .setFooter(`${by} helps`)
                        msg.channel.send(Color);
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