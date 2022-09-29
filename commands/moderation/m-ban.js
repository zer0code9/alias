const { prefix, by } = require("../../config.json");
const { MessageEmbed, Permissions } = require('discord.js');
const { Timeout, Unabled, Cancel, Perm, Invalid, Unknown } = require("../../errors");
async function banUser(msg, args, example) {
    const user = await msg.guild.members.cache.get(args[0]) || msg.mentions.users.first();
    let days = await args[1];
    let reason = await args.slice(2).join(" ");

    if (isNaN(days) || days < 1) {days = 100; reason = args.slice(1).join(" ");}
    if (!user) return Invalid(msg, `No User`, `I need an username in order to ban someone \n(mention:user or user:id)`, `${example}`);
    if (user.manageable) return Unabled(msg, `Not Manageable`, `The user you are trying to ban is not manageable`);
    if (!reason) return Invalid(msg, `No Reason`, `You must have a reason to ban them`, `${example}`);

    //await user.ban({ days, reason: `${reason}`})
    const Ban = new MessageEmbed()
    .setColor("#00ff00")
    .setTitle(`:white_check_mark: BANNED MEMBER :bust_in_silhouette::no_entry_sign:`)
    .setDescription("Moderation")
    .addFields(
        { name: "Banned User", value: `\`\`\`${user.tag}\`\`\`` },
        { name: "Reason", value: `\`\`\`${reason}\`\`\`` },
        { name: "Days Banned", value: `\`\`\`${days}\`\`\`` },
        { name: "By", value: `\`\`\`${msg.author.username}\`\`\`` }
    )
    .setFooter({ text: `${by} helps` })
    await msg.channel.send({ embeds: [Ban] });
    msg.delete();
}

module.exports = {
    name: "ban",
    description: "Ban a user",
    example: prefix + "ban [user:us|id] [days:in?] [reason:p]",
    type: "moderation",
    execute(msg, args){
        if (!msg.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) return Perm(msg, `No permission`, `You don't have the permission to ban users`);
        if (!msg.guild.me.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) return Perm(msg, `No permission`, `I don't have the permission to ban users`);
        if (args[0]) return banUser(msg, args, this.example);
        const filter = (m) => m.author.id === msg.author.id;

        const User = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`${by} Commands`)
        .setDescription("Command: ban")
        .addFields(
            { name: "Username", value: `I need a member's username to continue` },
            { name: `Cancel Command`, value: `Type \`cancel\`` }
        )
        .setFooter({ text: `${by} helps` })

        msg.channel.send({ embeds: [User] }).then(() => {
            msg.channel.awaitMessages({filter, max: 1 , time: 30000, errors: ['time']})
            .then(collected1 => {
                const response1 = collected1.first();
                if (response1.content == `cancel`) return Cancel(msg);
                const user = msg.guild.members.cache.get(response1.content) || response1.mentions.users.first();
                if (!user) return Unabled(msg, `No Member`, `I need a valid member username`);
                if (user.manageable) return Perm(msg, `Not manageable`, `That user cant be banned`);

                const Reason = new MessageEmbed()
                .setColor("RANDOM")
                .setTitle(`${by} Commands`)
                .setDescription("Command: ban")
                .addFields(
                    { name: "Reason", value: `I need a reason to continue` },
                    { name: `Cancel Command`, value: `Type \`cancel\`` }
                )
                .setFooter({ text: `${by} helps` })

                msg.channel.send({ embeds: [Reason] }).then(() => {
                    msg.channel.awaitMessages({filter, max: 1 , time: 30000, errors: ['time']})
                    .then(collected2 => {
                        const response2 = collected2.first();
                        if (response2.content == `cancel`) return Cancel(msg);
                        const reason = response2.content;

                        const Day = new MessageEmbed()
                        .setColor("RANDOM")
                        .setTitle(`${by} Commands`)
                        .setDescription("Command: ban")
                        .addFields(
                            { name: "Days", value: `I need a number of days to continue\nPut nothing if infinite` },
                            { name: `Cancel Command`, value: `Type \`cancel\`` }
                        )
                        .setFooter({ text: `${by} helps` })

                        msg.channel.send({ embeds: [Day] }).then(() => {
                            msg.channel.awaitMessages({filter, max: 1 , time: 30000, errors: ['time']})
                            .then(collected3 => {
                                const response3 = collected3.first();
                                if (response3.content == `cancel`) return Cancel(msg);
                                let days = response3.content;
                                if (isNaN(days)) {return Unabled(msg, `Not a number`, `The number of days must be a number`); days = 100}

                                //user.ban({ days, reason: `${reason}`})
                                const Ban = new MessageEmbed()
                                .setColor("#00ff00")
                                .setTitle(`:white_check_mark: BANNED MEMBER :bust_in_silhouette::no_entry_sign:`)
                                .setDescription("Moderation")
                                .addFields(
                                    { name: "Banned Member", value: `\`\`\`${user.tag}\`\`\`` },
                                    { name: "Reason", value: `\`\`\`${reason}\`\`\`` },
                                    { name: "Days Banned", value: `\`\`\`${days}\`\`\`` },
                                    { name: "By", value: `\`\`\`${msg.author.username}\`\`\`` }
                                )
                                .setFooter({ text: `${by} helps` })
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