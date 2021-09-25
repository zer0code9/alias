const { prefix, by } = require("./../config.json");
const Discord = require("discord.js");
const { Timeout, Wronganswer, Perm, Cancel, Invalid } = require("../errors");
function unbanUser(msg, args) {
    if (!msg.member.hasPermission("BAN_MEMBERS")) return Perm(msg, `No Permission`, `You don't have the permission to unban someone`);
    if (!msg.guild.me.hasPermission("BAN_MEMBERS")) return Perm(msg, `No Permission`, `I don't have the permission to unban someone`);
    const user = args[0];
    const reason = args.slice(1).join(" ");

    const noId = new Discord.MessageEmbed()
    .setColor("#ff0000")
    .setTitle(`:warning: CANCELED :warning:`)
    .addFields(
        { name: "No Id", value: `I need a valid id in order to unban someone.` },
        { name: "Command:", value: `\`${prefix}unban [id] [reason]\``}
    )
    .setFooter(`${by} helps`)
    if (!user) return Invalid(msg, `No Id`, `I need a valid id in order to unban someone`, `unban [id] [reason]`);

    const noReason = new Discord.MessageEmbed()
    .setColor("#ff0000")
    .setTitle(`:warning: CANCELED :warning:`)
    .addFields(
        { name: "No Reason", value: `I need a reason in order to ban someone`},
        { name: "Command:", value: `\`${prefix}ban [id] [reason]\``}
    )
    .setFooter(`${by} helps`)
    if (!reason) return Invalid(msg, `No Id`, `I need a valid id in order to unban someone`, `unban [id] [reason]`);

    msg.guild.members.unban(user, `${reason}`)
    const Unban = new Discord.MessageEmbed()
    .setColor("#00ff00")
    .setTitle(`:white_check_mark: UNBANNED MEMBER :bust_in_silhouette::o:`)
    .setDescription("Moderation")
    .addFields(
        { name: "Unbanned Member", value: `\`\`\`${user.tag}\`\`\`` },
        { name: "Reason", value: `\`\`\`${reason}\`\`\``},
        { name: "By", value: `\`\`\`${msg.author.username}\`\`\``}
    )
    .setFooter(`${by} helps`)
    msg.channel.send(Unban);
}

module.exports = {
    name: "unban",
    description: "Unban someone",
    example: prefix + "unban [id] [reason]",
    type: "moderation",
    execute(msg, args){
        if (args[0]) {return unbanUser(msg, args)}
        if (!msg.member.hasPermission("BAN_MEMBERS")) return Perm(msg, `No Permission`, `You don't have the permission to unban someone`);
        if (!msg.guild.me.hasPermission("BAN_MEMBERS")) return Perm(msg, `No Permission`, `I don't have the permission to unban someone`);
        let authorid = msg.author.id;

        const filter1 = response1 => { return response1.author.id === authorid; }

        const User = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`${by} Commands`)
        .setDescription("Command: ban")
        .addFields(
            { name: "User Id", value: `I need a member's id to continue` },
            { name: `Type \`cancel\` to cancel the command` }
        )
        .setFooter(`${by} helps`)

        msg.channel.send(User).then(() => {
            msg.channel.awaitMessages(filter1, { max: 1 , time: 30000, errors: ['time']})
            .then(collected1 => {
                const response1 = collected1.first();
                if (response1 == `cancel`) return Cancel(msg);
                const user = response1;

                const filter2 = response2 => { return response2.author.id === authorid; }

                const Reason = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setTitle(`${by} Commands`)
                .setDescription("Command: ban")
                .addFields(
                    { name: "Reason", value: `I need a reason to continue` },
                    { name: `Type \`cancel\` to cancel the command` }
                )
                .setFooter(`${by} helps`)

                msg.channel.send(Reason).then(() => {
                    msg.channel.awaitMessages(filter2, { max: 1 , time: 30000, errors: ['time']})
                    .then(collected2 => {
                      const response2 = collected2.first();
                      const reason = response2;

                      msg.guild.members.unban(user, `${reason}`)
                      const Unban = new Discord.MessageEmbed()
                      .setColor("#00ff00")
                      .setTitle(`:white_check_mark: UNBANNED MEMBER :bust_in_silhouette::o:`)
                      .setDescription("Moderation")
                      .addFields(
                          { name: "Unbanned Member", value: `\`\`\`${user.tag}\`\`\`` },
                          { name: "Reason", value: `\`\`\`${reason}\`\`\``},
                          { name: "By", value: `\`\`\`${msg.author.username}\`\`\``}
                      )
                      .setFooter(`${by} helps`)
                      msg.channel.send(Unban);

                    }).catch(error => {
                        Timeout(msg);
                    });
                })
            }).catch(error => {
                Timeout(msg);
            });
        })
    }
}