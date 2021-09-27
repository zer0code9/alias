const { prefix, by } = require("./../config.json");
const Discord = require("discord.js");
const { Timeout, Wronganswer, Perm, Cancel, Invalid, Unknown } = require("../errors");
function delRank(msg, args) {
    if (!msg.member.permissions.has("MANAGE_ROLES")) return Perm(msg, `No Permission`, `You don't have the permission to manage roles`);
    if (!msg.guild.me.permissions.has("MANAGE_ROLES")) return Perm(msg, `No Permission`, `I don't have the permission to manage roles`);
    const role = msg.mentions.roles.first();
    let reason = args.slice(1).join(" ");

    if (!role) returnInvalid(msg, `No Role`, `I need a role in order to delete it`, `colorrank [role] [color:hex]`);

    if (!reason) Invalid(msg, `No Reason`, `I need a reason in order to delete it`, `colorrank [role] [color:hex]`);

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
        if (args[0]) {return delRank(msg, args);}
        if (!msg.member.permissions.has("MANAGE_ROLES")) return Perm(msg, `No Permission`, `You don't have the permission to manage roles`);
        if (!msg.guild.me.permissions.has("MANAGE_ROLES")) return Perm(msg, `No Permission`, `I don't have the permission to manage roles`);
        let authorid = msg.author.id;

        const filter1 = response1 => { return response1.author.id === authorid; }
    
        const Role = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`${by} Commands`)
        .setDescription("Command: delrank")
        .addFields(
            { name: "Role Name", value: `I need a role's name to continue` },
            { name: `Cancel Command`, value: `Type \`cancel\`` }
        )
        .setFooter(`${by} helps`)
    
        msg.channel.send(Role).then(() => {
            msg.channel.awaitMessages(filter1, { max: 1 , time: 30000, errors: ['time']})
            .then(collected1 => {
                const response1 = collected1.first();
                if (response1.content == "cancel") return Cancel(msg);
                const role = response1.mentions.roles.first();
                if (!role) return Wronganswer(msg, `No Role`, `I need a valid role name`);
                let roleN = role.name;
      
                const filter2 = response2 => { return response2.author.id === authorid; }
    
                const Reason = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setTitle(`${by} Commands`)
                .setDescription("Command: delrank")
                .addFields(
                    { name: "Reason", value: `I need a reason to continue` },
                    { name: `Cancel Command`, value: `Type \`cancel\`` }
                )
                .setFooter(`${by} helps`)
      
                msg.channel.send(Reason).then(() => {
                    msg.channel.awaitMessages(filter2, { max: 1 , time: 30000, errors: ['time']})
                    .then(collected2 => {
                        const response2 = collected2.first();
                        if (response2.content == "cancel") return Cancel(msg);
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