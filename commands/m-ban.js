const { prefix, by } = require("./../config.json");
const { MessageEmbed } = require('discord.js');
const { Timeout, Wronganswer, Perm, Cancel, Invalid, Unknown } = require("../errors");
function banUser(msg, args, example) {
    if (!msg.member.permissions.has("BAN_MEMBERS")) return Perm(msg, `No permission`, `You don't have the permission to ban members`);
    if (!msg.guild.me.permissions.has("BAN_MEMBERS")) return Perm(msg, `No permission`, `I don't have the permission to ban members`);
    const user = msg.mentions.users.first();
    let days = args[1];
    let reason = args.slice(2).join(" ");

    if (!user) return Invalid(msg, `No User`, `I need an username in order to ban someone`, `${example}`);

    const member = msg.guild.members.cache.get(user.id);

    if (!member.manageable) return Invalid(msg, `Not Manageable`, `The user you are trying to ban is not manageable`, `${example}`);

    if (!member) return Invalid(msg, `No Member`, `I don't know that member`, `${example}`);

    if (!reason) return Invalid(msg, `No Reason`, `I need a reason in order to ban someone`, `${example}`);

    if (isNaN(days)) {days = 1; reason = args.slice(1).join(" ");}

    //member.ban({ days, reason: `${reason}`})
    const Ban = new MessageEmbed()
    .setColor("#00ff00")
    .setTitle(`:white_check_mark: BANNED MEMBER :bust_in_silhouette::no_entry_sign:`)
    .setDescription("Moderation")
    .addFields(
        { name: "Banned Member", value: `\`\`\`${user.tag}\`\`\`` },
        { name: "Reason", value: `\`\`\`${reason}\`\`\``},
        { name: "Days Banned", value: `\`\`\`${days}\`\`\``},
        { name: "By", value: `\`\`\`${msg.author.username}\`\`\``}
    )
    .setFooter(`${by} helps`)
    msg.channel.send({ embeds: [Ban] });
}

module.exports = {
    name: "ban",
    description: "Ban a member",
    example: prefix + "ban [member] [days] [reason]",
    type: "moderation",
    execute(msg, args){
        if (args[0]) return banUser(msg, args, this.example);
        if (!msg.member.permissions.has("BAN_MEMBERS")) return Perm(msg, `No permission`, `You don't have the permission to ban members`);
        if (!msg.guild.me.permissions.has("BAN_MEMBERS")) return Perm(msg, `No permission`, `I don't have the permission to ban members`);
        let authorid = msg.author.id;
        const filter = (m) => m.author.id === authorid;

        const User = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`${by} Commands`)
        .setDescription("Command: ban")
        .addFields(
            { name: "Username", value: `I need a member's username to continue` },
            { name: `Cancel Command`, value: `Type \`cancel\`` }
        )
        .setFooter(`${by} helps`)

        msg.channel.send({ embeds: [User] }).then(() => {
            msg.channel.awaitMessages({filter, max: 1 , time: 30000, errors: ['time']})
            .then(collected1 => {
                const response1 = collected1.first();
                if (response1.content == "cancel") return Cancel(msg);
                const user = response1.mentions.users.first();
                const member = msg.guild.member(user);
                if (!member.manageable) return Perm(msg, `Not manageable`, `That user cant be banned`);
                if (!member) return Wronganswer(msg, `No Member`, `I need a valid member username`);

                const Reason = new MessageEmbed()
                .setColor("RANDOM")
                .setTitle(`${by} Commands`)
                .setDescription("Command: ban")
                .addFields(
                    { name: "Reason", value: `I need a reason to continue` },
                    { name: `Cancel Command`, value: `Type \`cancel\`` }
                )
                .setFooter(`${by} helps`)

                msg.channel.send({ embeds: [Reason] }).then(() => {
                    msg.channel.awaitMessages({filter, max: 1 , time: 30000, errors: ['time']})
                    .then(collected2 => {
                        const response2 = collected2.first();
                        if (response2.content == "cancel") return Cancel(msg);
                        const reason = response2.content;

                        const Day = new MessageEmbed()
                        .setColor("RANDOM")
                        .setTitle(`${by} Commands`)
                        .setDescription("Command: ban")
                        .addFields(
                            { name: "Days", value: `I need a number of days to continue` },
                            { name: `Cancel Command`, value: `Type \`cancel\`` }
                        )
                        .setFooter(`${by} helps`)

                        msg.channel.send({ embeds: [Day] }).then(() => {
                            msg.channel.awaitMessages({filter, max: 1 , time: 30000, errors: ['time']})
                            .then(collected3 => {
                                const response3 = collected3.first();
                                if (response3.content == "cancel") return Cancel(msg);
                                const days = response3.content;
                                if (isNaN(days)) return Wronganswer(msg, `Not a number`, `The number of days must be a number`);

                                //member.ban({ days, reason: `${reason}`})
                                const Ban = new MessageEmbed()
                                .setColor("#00ff00")
                                .setTitle(`:white_check_mark: BANNED MEMBER :bust_in_silhouette::no_entry_sign:`)
                                .setDescription("Moderation")
                                .addFields(
                                    { name: "Banned Member", value: `\`\`\`${user.tag}\`\`\`` },
                                    { name: "Reason", value: `\`\`\`${reason}\`\`\``},
                                    { name: "Days Banned", value: `\`\`\`${days}\`\`\``},
                                    { name: "By", value: `\`\`\`${msg.author.username}\`\`\``}
                                )
                                .setFooter(`${by} helps`)
                                msg.channel.send({ embeds: [Ban] });

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
            }).catch(error => {
                if (error == '[object Map]') Timeout(msg);
                else Unknown(msg, error);
            });
        })
    }
}