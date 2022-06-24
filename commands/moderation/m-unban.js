const { prefix, by } = require("../../config.json");
const { MessageEmbed, Permissions } = require('discord.js');
const { Timeout, Wronganswer, Perm, Cancel, Invalid, Unknown } = require("../../errors");
async function unbanUser(msg, args, example) {
    const user = args[0];
    const reason = args.slice(1).join(" ");

    if (!user) return Invalid(msg, `No Id`, `I need a valid id in order to unban someone`, `${example}`);
    if (!reason) return Invalid(msg, `No Reason`, `You must have a reason to unban them`, `${example}`);

    await msg.guild.members.unban(user, `${reason}`);
    const Unban = new MessageEmbed()
    .setColor("#00ff00")
    .setTitle(`:white_check_mark: UNBANNED MEMBER :bust_in_silhouette::o:`)
    .setDescription("Moderation")
    .addFields(
        { name: "Unbanned Member", value: `\`\`\`${user.tag}\`\`\`` },
        { name: "Reason", value: `\`\`\`${reason}\`\`\``},
        { name: "By", value: `\`\`\`${msg.author.username}\`\`\``}
    )
    .setFooter({ text: `${by} helps` })
    await msg.channel.send({ embeds: [Unban] });
    msg.delete();
}

module.exports = {
    name: "unban",
    description: "Unban someone",
    example: prefix + "unban [id] [reason]",
    type: "moderation",
    execute(msg, args){
        if (!msg.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) return Perm(msg, `No permission`, `You don't have the permission to ban members`);
        if (!msg.guild.me.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) return Perm(msg, `No permission`, `I don't have the permission to ban members`);
        if (args[0]) return unbanUser(msg, args, this.example);
        const filter = (m) => m.author.id === msg.author.id;

        const User = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`${by} Commands`)
        .setDescription("Command: ban")
        .addFields(
            { name: "User Id", value: `I need a member's id to continue` },
            { name: `Cancel Command`, value: `Type \`cancel\`` }
        )
        .setFooter({ text: `${by} helps` })

        msg.channel.send({ embeds: [User] }).then(() => {
            msg.channel.awaitMessages({filter, max: 1 , time: 30000, errors: ['time']})
            .then(collected1 => {
                const response1 = collected1.first();
                if (response1.content == `cancel`) return Cancel(msg);
                const user = response1;
                if (!user) return Wronganswer(msg, `No Id`, `I need a valid id in order to unban someone`);

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
                      const reason = response2;

                      msg.guild.members.unban(user, `${reason}`)
                      const Unban = new MessageEmbed()
                      .setColor("#00ff00")
                      .setTitle(`:white_check_mark: UNBANNED MEMBER :bust_in_silhouette::o:`)
                      .setDescription("Moderation")
                      .addFields(
                          { name: "Unbanned Member", value: `\`\`\`${user.tag}\`\`\`` },
                          { name: "Reason", value: `\`\`\`${reason}\`\`\``},
                          { name: "By", value: `\`\`\`${msg.author.username}\`\`\``}
                      )
                      .setFooter({ text: `${by} helps` })
                      msg.channel.send({ embeds: [Unban] });

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