const { DiscordAPIError } = require("discord.js");
const { prefix, by } = require("./../config.json");
const Discord = require("discord.js");

function kickUser(msg, args) {
  const user = msg.mentions.users.first();
  const reason = args.slice(1).join(" ");

  if (!msg.member.permissions.has("KICK_MEMBERS")) return msg.channel.send(`You don't have the permission to kick members, ${msg.author}`)
  if(!msg.guild.me.hasPermission("KICK_MEMBERS")) return msg.channel.send(`I dont have the permission to kick members, ${msg.author}`)
    if (user) {
      if (!msg.guild.member(user).kickable) return msg.channel.send(`I cant kick ${user}`);
        const member = msg.guild.member(user);
        if (member) {
        const noReason = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`${by} Commands`)
        .setDescription("Command: kick")
        .addFields(
          { name: "No Reason", value: `I need a reason in order to kick someone`},
          { name: "Command", value: `Kick a member\n\`\`\`${prefix}kick [member] [reason]\`\`\``},
          { name: `**NOTE**`, value: `**Only use "kick" when someone has a really bad behavior**`}
        )
        .setFooter(`${by} helps`)
        if(!reason) return msg.channel.send(noReason)

        //member.kick()
        const kicked = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`${by} Commands`)
        .setDescription("Command: kick")
        .addFields(
          { name: "Successful", value: `${user.username} has been successfully kicked from ${msg.guild.name}.` },
          { name: "Reason:", value: `${reason}`},
          { name: `**NOTE**`, value: `**Only use "kick" when someone has a really bad behavior**`}
        )
        .setFooter(`${by} helps`)
        msg.channel.send(kicked);
        } else {
          const noMember = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`${by} Commands`)
        .setDescription("Command: kick")
        .addFields(
          { name: "No Member", value: `I don't know that member` },
          { name: "Command", value: `Kick a member\n\`\`\`${prefix}kick [member] [reason]\`\`\``},
          { name: `**NOTE**`, value: `**Only use "kick" when someone has a really bad behavior**`}
        )
        .setFooter(`${by} helps`)
        msg.channel.send(noMember);
        }

      } else {
        const noTag = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`${by} Commands`)
        .setDescription("Command: kick")
        .addFields(
          { name: "No User", value: `I need an username in order to kick someone.` },
          { name: "Command", value: `Kick a member\n\`\`\`${prefix}kick [member] [reason]\`\`\``},
          { name: `**NOTE**`, value: `**Only use "kick" when someone has a really bad behavior**`}
        )
        .setFooter(`${by} helps`)
        msg.channel.send(noTag);
      }
}

module.exports = {
    name: "kick",
    description: "Kick a member",
    example: prefix + "kick [member] [reason]",
    type: "moderation",
    execute(msg, args){
        if (args[0]) {return kickUser(msg, args)}
        if (!msg.member.permissions.has("KICK_MEMBERS")) return msg.channel.send(`You don't have the permission to kick members, ${msg.author}`)
        if(!msg.guild.me.hasPermission("KICK_MEMBERS")) return msg.channel.send(`I dont have the permission to kick members, ${msg.author}`)
        let authorid = msg.author.id;

        const filter1 = response1 => { return response1.author.id === authorid; }

        const User = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`${by} Commands`)
        .setDescription("Command: kick")
        .addFields(
            { name: "Username", value: `I need a member's username to continue` },
            { name: `**NOTE**`, value: `**Only use "kick" when someone has a bad behavior**`}
        )
        .setFooter(`${by} helps`)

        msg.channel.send(User).then(() => {
            msg.channel.awaitMessages(filter1, { max: 1 , time: 30000, errors: ['time']})
            .then(collected1 => {
                const response1 = collected1.first();
                const user = response1.mentions.users.first()
                const member = msg.guild.member(user);
                if (!member.manageable) return msg.channel.send(`I cant kick ${user}`);
                if (!member) {
                    const noMember = new Discord.MessageEmbed()
                    .setColor("#ff0000")
                    .setTitle(`:warning: CANCELED :warning:`)
                    .addFields(
                        { name: "No Member", value: `I need a valid member username.` },
                        { name: "Command Canceled", value: `Wrong answer concelation`},
                        { name: `**NOTE**`, value: `**Only use "kick" when someone has a really bad behavior**`}
                    )
                    .setFooter(`${by} helps`)
                    msg.channel.send(noMember);
                }

                const filter2 = response2 => { return response2.author.id === authorid; }

                const Reason = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setTitle(`${by} Commands`)
                .setDescription("Command: kick")
                .addFields(
                    { name: "Reason", value: `I need a reason to continue` },
                    { name: `**NOTE**`, value: `**Only use "kick" when someone has a really bad behavior**`}
                )
                .setFooter(`${by} helps`)

                msg.channel.send(Reason).then(() => {
                    msg.channel.awaitMessages(filter2, { max: 1 , time: 30000, errors: ['time']})
                    .then(collected2 => {
                        const response2 = collected2.first();
                        const reason = response2.content;
  
                        //member.kick(reason);
                        const Kick = new Discord.MessageEmbed()
                        .setColor("#00ff00")
                        .setTitle(`:white_check_mark: KICKED MEMBER :bust_in_silhouette::outbox_tray:`)
                        .setDescription("Moderation")
                        .addFields(
                            { name: "Kicked Member", value: `\`\`\`${user.tag}\`\`\`` },
                            { name: "Reason", value: `\`\`\`${reason}\`\`\``},
                            { name: `**NOTE**`, value: `**Only use "kick" when someone has a really bad behavior**`}
                        )
                        .setFooter(`${by} helps`)
                        msg.channel.send(Kick)
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