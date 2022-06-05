const { prefix, by } = require("../../config.json");
const { MessageEmbed, Permissions } = require('discord.js');
const { Timeout, Wronganswer, Perm, Cancel, Invalid, Unknown } = require("../../errors");
function muteUser(msg, args, example) {
    const user = msg.guild.members.cache.get(args[0]) || msg.mentions.users.first();
    const reason = args.slice(1).join(" ");

    if (!user) return Invalid(msg, 'No User', 'I need a user to mute them', `${example}`);
    if (!user.manageable) return Invalid(msg, `Not Manageable`, `The user you are trying to mute is not manageable`, `${example}`);
    if (!reason) return Invalid(msg, 'No Reason', 'You must have a reason to mute them', `${example}`)

    member.setMute(true, reason);
    const Mute = new MessageEmbed()
    .setColor("#00ff00")
    .setTitle(":white_check_mark: MUTED MEMBER :bust_in_silhouette::mute:")
    .setDescription("Moderation")
    .addFields(
        { name: "Muted Member", value: `\`\`\`${user.username}\`\`\`` },
        { name: "On Channel", value: `\`\`\`${msg.channel.name}\`\`\`` },
        { name: "Reason", value: `\`\`\`${reason}\`\`\`` },
        { name: `By`, value: `\`\`\`${msg.author.username}\`\`\`` }
    )
    .setFooter({ text: `${by} helps` })
    msg.channel.send({ embeds: [Mute] });
}

module.exports = {
    name: "mute",
    description: "Mute a member",
    example: prefix + "mute [member] [reason]",
    type: "moderation",
    execute(msg, args){
        if (!msg.member.hasPermission("MUTE_MEMBERS")) return msg.channel.send(`You don't have the permission to mute members, ${msg.author}`);
        if (!msg.guild.me.hasPermission("MUTE_MEMBERS")) return msg.channel.send(`I dont have the permission to mute someone, ${msg.author}`);
        if (args[0]) return muteUser(msg, args, this.example);
        const filter = (m) => m.author.id === msg.author.id;

        const User = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`${by} Commands`)
        .setDescription("Command: mute")
        .addFields(
            { name: "Username", value: `I need a username to continue` },
            { name: `Type \`cancel\` to cancel the command` }
        )
        .setFooter({ text: `${by} helps` })

        msg.channel.send({ embeds: [User] }).then(() => {
            msg.channel.awaitMessages(filter, { max: 1 , time: 30000, errors: ['time']})
            .then(collected1 => {
                const response1 = collected1.first();
                if (response1.content == 'cancel') return Cancel(msg)
                const user = msg.guild.members.cache.get(response1.content) || response1.mentions.users.first();
                if (!user) return Wronganswer(msg, `No Member`, `I need a valid member username`);

                const Reason = new MessageEmbed()
                .setColor("RANDOM")
                .setTitle(`${by} Commands`)
                .setDescription("Command: mute")
                .addFields(
                    { name: "Reason", value: `I need a reason to continue` },
                    { name: `Type \`cancel\` to cancel the command` }
                )
                .setFooter({ text: `${by} helps` })
  
                msg.channel.send({ embeds: [Reason] }).then(() => {
                    msg.channel.awaitMessages(filter, { max: 1 , time: 30000, errors: ['time']})
                    .then(collected2 => {
                        const response2 = collected2.first();
                        if (response1.content == 'cancel') return Cancel(msg)
                        const reason = response2.content;
                        if (!reason) return Wronganswer(msg, `No Reason`, `I need a reason`);
    
                        member.setMute(true, reason);
                        const Mute = new MessageEmbed()
                        .setColor("#00ff00")
                        .setTitle(":white_check_mark: MUTED MEMBER :bust_in_silhouette::mute:")
                        .setDescription("Moderation")
                        .addFields(
                            { name: "Muted Member", value: `\`\`\`${user.username}\`\`\`` },
                            { name: "On Channel", value: `\`\`\`${msg.channel.name}\`\`\`` },
                            { name: "Reason", value: `\`\`\`${reason}\`\`\`` },
                            { name: `By`, value: `\`\`\`${msg.author.username}\`\`\`` }
                        )
                        .setFooter({ text: `${by} helps` })
                        msg.channel.send({ embeds: [Mute] });

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