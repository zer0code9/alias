const { prefix, by } = require("./../config.json");
const { MessageEmbed } = require('discord.js');
const { Timeout, Wronganswer, Perm, Cancel, Invalid, Unknown } = require("../errors");
function kickUser(msg, args) {
    if (!msg.member.permissions.has("KICK_MEMBERS")) return Perm(msg, `No permission`, `You don't have the permission to kick members`);
    if (!msg.guild.me.permissions.has("KICK_MEMBERS")) return Perm(msg, `No permission`, `I don't have the permission to kick members`);
    const user = msg.mentions.users.first();
    const reason = args.slice(1).join(" ");

    if (!user) return Invalid(msg, `No User`, `I need a username in order to kick them`, `Command`, `kick [member] [reason]`);

    const member = msg.guild.member(user);

    if (!member.kickable) return Invalid(msg, `Not Kickable`, `The user you are trying to mute is not kickable`, `Command`, `kick [member] [reason]`);

    if (!member) return Invalid(msg, `No Member`, `I don't know that member`, `Command`, `kick [member] [reason]`);

    if(!reason) return Invalid(msg, `No Reason`, `I need a reason in order to kick someone`, `Command`, `kick [member] [reason]`);

    //member.kick(reason)
    const Kick = new MessageEmbed()
    .setColor("#00ff00")
    .setTitle(`:white_check_mark: KICKED MEMBER :bust_in_silhouette::outbox_tray:`)
    .setDescription("Moderation")
    .addFields(
        { name: "Kicked Member", value: `\`\`\`${user.tag}\`\`\`` },
        { name: "Reason", value: `\`\`\`${reason}\`\`\``},
        { name: "By", value: `\`\`\`${msg.author.username}\`\`\``}
    )
    .setFooter(`${by} helps`)
    msg.channel.send(Kick);
}

module.exports = {
    name: "kick",
    description: "Kick a member",
    example: prefix + "kick [member] [reason]",
    type: "moderation",
    execute(msg, args){
        if (args[0]) {return kickUser(msg, args)}
        if (!msg.member.permissions.has("KICK_MEMBERS")) return Perm(msg, `No permission`, `You don't have the permission to kick members`);
        if (!msg.guild.me.permissions.has("KICK_MEMBERS")) return Perm(msg, `No permission`, `I don't have the permission to kick members`);
        let authorid = msg.author.id;

        const filter1 = response1 => { return response1.author.id === authorid; }

        const User = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`${by} Commands`)
        .setDescription("Command: kick")
        .addFields(
            { name: "Username", value: `I need a member's username to continue` },
            { name: `Cancel Command`, value: `Type \`cancel\`` }
        )
        .setFooter(`${by} helps`)

        msg.channel.send(User).then(() => {
            msg.channel.awaitMessages(filter1, { max: 1 , time: 30000, errors: ['time']})
            .then(collected1 => {
                const response1 = collected1.first();
                if (response1.content == "cancel") return Cancel(msg);
                const user = response1.mentions.users.first()
                const member = msg.guild.member(user);
                if (!member.manageable) return Perm(msg, `Not manageable`, `That user cant be banned`);
                if (!member) return Wronganswer(msg, `No Member`, `I need a valid member username`);

                const filter2 = response2 => { return response2.author.id === authorid; }

                const Reason = new MessageEmbed()
                .setColor("RANDOM")
                .setTitle(`${by} Commands`)
                .setDescription("Command: kick")
                .addFields(
                    { name: "Reason", value: `I need a reason to continue` },
                    { name: `Cancel Command`, value: `Type \`cancel\`` }
                )
                .setFooter(`${by} helps`)

                msg.channel.send(Reason).then(() => {
                    msg.channel.awaitMessages(filter2, { max: 1 , time: 30000, errors: ['time']})
                    .then(collected2 => {
                        const response2 = collected2.first();
                        if (response1.content == "cancel") return Cancel(msg);
                        const reason = response2.content;
  
                        //member.kick(reason);
                        const Kick = new MessageEmbed()
                        .setColor("#00ff00")
                        .setTitle(`:white_check_mark: KICKED MEMBER :bust_in_silhouette::outbox_tray:`)
                        .setDescription("Moderation")
                        .addFields(
                            { name: "Kicked Member", value: `\`\`\`${user.tag}\`\`\`` },
                            { name: "Reason", value: `\`\`\`${reason}\`\`\``}
                        )
                        .setFooter(`${by} helps`)
                        msg.channel.send(Kick)

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