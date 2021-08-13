const { prefix, by } = require("./../config.json");
const Discord = require("discord.js");
function muteUser(msg, args) {
    if (!msg.member.hasPermission("MUTE_MEMBERS")) return msg.channel.send(`You don't have the permission to mute members, ${msg.author}`)
    if(!msg.guild.me.hasPermission("MUTE_MEMBERS")) return msg.channel.send(`I dont have the permission to unmute someone, ${msg.author}`)
    const user = msg.mentions.users.first();
    const reason = args.slice(1).join(" ");

    const noTag = new Discord.MessageEmbed()
    .setColor("#ff0000")
    .setTitle(`:warning: CANCELED :warning:`)
    .addFields(
        { name: "No User", value: `I need an username in order to mute someone.` },
        { name: "Command", value: `Mute a member\n\`\`\`${prefix}mute [member] [reason]\`\`\``},
        { name: `**NOTE**`, value: `**Only use "mute" when someone has a bad behavior**`}
    )
    .setFooter(`${by} helps`)
    if (!user) return msg.channel.send(noTag);

    const member = msg.guild.member(user);

    const noMute = new Discord.MessageEmbed()
    .setColor("#ffa500")
    .setTitle(`CANCELED`)
    .addFields(
        { name: "Not Manageable", value: `The user you are trying to mute is not manageable.` },
        { name: "Command", value: `Mute a member\n\`\`\`${prefix}mute [member] [reason]\`\`\``},
        { name: `**NOTE**`, value: `**Only use "mute" when someone has a bad behavior**`}
    )
    .setFooter(`${by} helps`)
    if (!member.manageable) return msg.channel.send(noMute);

    const noMember = new Discord.MessageEmbed()
    .setColor("#ff0000")
    .setTitle(`:warning: CANCELED :warning:`)
    .addFields(
        { name: "No Member", value: `I don't know that member` },
        { name: "Command", value: `Mute a member\n\`\`\`${prefix}mute [member] [reason]\`\`\``},
        { name: `**NOTE**`, value: `**Only use "mute" when someone has a bad behavior**`}
    )
    .setFooter(`${by} helps`)
    if (!member) return msg.channel.send(noMember);

    const noReason = new Discord.MessageEmbed()
    .setColor("#ff0000")
    .setTitle(`:warning: CANCELED :warning:`)
    .addFields(
        { name: "No Reason", value: `I need a reason in order to mute someone`},
        { name: "Command", value: `Mute a member\n\`\`\`${prefix}mute [member] [reason]\`\`\``},
        { name: `**NOTE**`, value: `**Only use "mute" when someone has a bad behavior**`}
    )
    .setFooter(`${by} helps`)
    if(!reason) return msg.channel.send(noReason);

    member.setMute(true, reason);
    const muted = new Discord.MessageEmbed()
    .setColor("#00ff00")
    .setTitle(":white_check_mark: MUTED MEMBER :bust_in_silhouette::mute:")
    .setDescription("Moderation")
    .addFields(
        { name: "A member has been muted", value: `\`\`\`${user.username}\`\`\`` },
        { name: "On Channel:", value: `\`\`\`${msg.channel.name}\`\`\``},
        { name: "Reason:", value: `\`\`\`${reason}\`\`\``},
        { name: `**NOTE**`, value: `**Only use "mute" when someone has a bad behavior**`}
    )
    .setFooter(`${by} helps`)
    msg.channel.send(muted);
}

module.exports = {
    name: "mute",
    description: "Mute a member",
    example: prefix + "mute [member] [reason]",
    type: "moderation",
    execute(msg, args){
        if (args[0]) {return muteUser(msg, args)}
        if (!msg.member.hasPermission("MUTE_MEMBERS")) return msg.channel.send(`You don't have the permission to mute members, ${msg.author}`)
        if(!msg.guild.me.hasPermission("MUTE_MEMBERS")) return msg.channel.send(`I dont have the permission to mute someone, ${msg.author}`)
        let authorid = msg.author.id;

        const filter1 = response1 => { return response1.author.id === authorid; }

        const User = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`${by} Commands`)
        .setDescription("Command: mute")
        .addFields(
            { name: "Username", value: `I need a member's username to continue` },
            { name: `**NOTE**`, value: `**Only use "mute" when someone has a bad behavior**`}
        )
        .setFooter(`${by} helps`)

        msg.channel.send(User).then(() => {
            msg.channel.awaitMessages(filter1, { max: 1 , time: 30000, errors: ['time']})
            .then(collected1 => {
                const response1 = collected1.first();
                const user = response1.mentions.users.first()
                const member = msg.guild.member(user);
                if (!member.manageable) return msg.channel.send(`I cant mute ${user}`);
                if (!member) {
                    const noMember = new Discord.MessageEmbed()
                    .setColor("#ff0000")
                    .setTitle(`:warning: CANCELED :warning:`)
                    .addFields(
                        { name: "No Member", value: `I need a valid member username.` },
                        { name: "Command Canceled", value: `Wrong answer concelation`},
                        { name: `**NOTE**`, value: `**Only use "mute" when someone has a bad behavior**`}
                    )
                    .setFooter(`${by} helps`)
                    msg.channel.send(noMember);
                }
  
                const filter2 = response2 => { return response2.author.id === authorid; }

                const Reason = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setTitle(`${by} Commands`)
                .setDescription("Command: mute")
                .addFields(
                    { name: "Reason", value: `I need a reason to continue` },
                    { name: `**NOTE**`, value: `**Only use "mute" when someone has a bad behavior**`}
                )
                .setFooter(`${by} helps`)
  
                msg.channel.send(Reason).then(() => {
                    msg.channel.awaitMessages(filter2, { max: 1 , time: 30000, errors: ['time']})
                    .then(collected2 => {
                        const response2 = collected2.first();
                        const reason = response2.content;
    
                      //member.mute(reason);
                      const mute = new Discord.MessageEmbed()
                      .setColor("#00ff00")
                      .setTitle(`:white_check_mark: MUTED MEMBER :bust_in_silhouette::mute:`)
                      .setDescription("Moderation")
                      .addFields(
                          { name: "Muted Member", value: `\`\`\`${user.username}\`\`\`` },
                          { name: "Reason", value: `\`\`\`${reason}\`\`\``},
                          { name: `**NOTE**`, value: `**Only use "mute" when someone has a bad behavior**`}
                      )
                      .setFooter(`${by} helps`)
                      msg.channel.send(mute)
                    }).catch(error => {
                        const Error = new Discord.MessageEmbed()
                        .setColor("#ff0000")
                        .setTitle(":x: CANCELED :x:")
                        .addFields(
                            { name: "Command Canceled", value: `Timeout cancelation`}
                        )
                        .setFooter(`${by} helps`)
                        msg.channel.send(Error);  
                    });
                })
            }).catch(error => {
                const Error = new Discord.MessageEmbed()
                .setColor("#ff0000")
                .setTitle(":x: CANCELED :x:")
                .addFields(
                    { name: "Command Canceled", value: `Timeout cancelation`}
                )
                .setFooter(`${by} helps`)
                msg.channel.send(Error);  
            });
        })
    }
}