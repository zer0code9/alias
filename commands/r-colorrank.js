const { prefix, by } = require("./../config.json");
const Discord = require("discord.js");
const { Timeout, Wronganswer, Perm, Cancel, Invalid } = require("../errors");
function colorRank(msg, args) {
    if (!msg.member.hasPermission("MANAGE_ROLES")) return Perm(msg, `No Permission`, `You don't have the permission to manage roles`);
    if (!msg.guild.me.hasPermission("MANAGE_ROLES")) return Perm(msg, `No Permission`, `I don't have the permission to manage roles`);
    const role = msg.mentions.roles.first();
    const color = args.slice(1).join(" ");

    if (!role) return Invalid(msg, `No Role`, `I need a role in order to recolor it`, `colorrank [role] [color:hex]`);

    if (!color) return Invalid(msg, `No Color`, `I need a color in hex in order to recolor the role`, `colorrank [role] [color:hex]`);

    role.setColor(`${color}`);
    const Color = new Discord.MessageEmbed()
    .setColor(`#00ff00`)
    .setTitle(":white_check_mark: CHANGED COLOR :label::paintbrush:")
    .setDescription("Rank")
    .addFields(
        { name: "A role has changed its color", value: `\`\`\`${role.name}\`\`\``},
        { name: "New Color", value: `\`\`\`${role.hexColor}\`\`\``}
    )
    .setFooter(`${by} helps`)
    msg.channel.send(Color);
}


module.exports = {
    name: "colorrank",
    description: "Change the color of a role",
    example: prefix + "colorrank [role] [color:hex]",
    type: "rank",
    execute(msg, args) {
        if (args[0]) {return colorRank(msg, args)}
        if (!msg.member.hasPermission("MANAGE_ROLES")) return Perm(msg, `No Permission`, `You don't have the permission to manage roles`);
        if (!msg.guild.me.hasPermission("MANAGE_ROLES")) return Perm(msg, `No Permission`, `I don't have the permission to manage roles`);
        let authorid = msg.author.id;

        const filter1 = response1 => { return response1.author.id === authorid; }
    
        const Role = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`${by} Commands`)
        .setDescription("Command: colorrank")
        .addFields(
            { name: "Role Name", value: `I need a role's name to continue` },
            { name: `Type \`cancel\` to cancel the command` }
        )
        .setFooter(`${by} helps`)
    
        msg.channel.send(Role).then(() => {
            msg.channel.awaitMessages(filter1, { max: 1 , time: 30000, errors: ['time']})
            .then(collected1 => {
                const response1 = collected1.first();
                if (collected1 == `cancel`) return Cancel(msg);
                const role = response1.mentions.roles.first();
                
                if (!role) return Wronganswer(msg, `No Role`, `I need a valid role name`);
      
                const filter2 = response2 => { return response2.author.id === authorid; }
    
                const Color = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setTitle(`${by} Commands`)
                .setDescription("Command: colorrank")
                .addFields(
                    { name: "Color", value: `I need a color to continue: hex format` },
                    { name: `Type \`cancel\` to cancel the command` }
                )
                .setFooter(`${by} helps`)
      
                msg.channel.send(Color).then(() => {
                    msg.channel.awaitMessages(filter2, { max: 1 , time: 30000, errors: ['time']})
                    .then(collected2 => {
                        const response2 = collected2.first();
                        const color = response2.content;
        
                        role.setColor(`${color}`);
                        const Color = new Discord.MessageEmbed()
                        .setColor(`#00ff00`)
                        .setTitle(":white_check_mark: CHANGED COLOR :label::paintbrush:")
                        .setDescription("Rank")
                        .addFields(
                            { name: "A role has changed its color", value: `\`\`\`${role.name}\`\`\``},
                            { name: "New Color", value: `\`\`\`${role.hexColor}\`\`\``}
                        )
                        .setFooter(`${by} helps`)
                        msg.channel.send(Color);
                        
                    }).catch(error => {
                        Timeout(msg)
                    });
                })
            }).catch(error => {
                Timeout(msg);
            });
        })
    }
}