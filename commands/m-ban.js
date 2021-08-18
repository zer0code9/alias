const { DiscordAPIError } = require("discord.js");
const { prefix, by } = require("./../config.json");
const { Timeout, Wronganswer, Perm, Cancel } = require("../errors");
const Discord = require("discord.js");
function banUser(msg, args) {
    if (!msg.member.hasPermission("BAN_MEMBERS")) return Perm(msg, `No permission`, `You dont have the permission to ban members`);
    if (!msg.guild.me.hasPermission("BAN_MEMBERS")) return Perm(msg, `No permission`, `I dont have the permission to ban members`);
    const user = msg.mentions.users.first();
    let days = args[1];
    let reason = args.slice(2).join(" ");

    const noTag = new Discord.MessageEmbed()
    .setColor("#ff0000")
    .setTitle(`:warning: CANCELED :warning:`)
    .addFields(
        { name: "No User", value: `I need an username in order to ban someone.` },
        { name: "Command:", value: `\`${prefix}ban [member] [days] [reason]\``}
    )
    .setFooter(`${by} helps`)
    if (!user) return msg.channel.send(noTag);

    const member = msg.guild.member(user);

    const noBan = new Discord.MessageEmbed()
    .setColor("#ffa500")
    .setTitle(`:warning: CANCELED :warning:`)
    .addFields(
        { name: "Not Manageable", value: `The user you are trying to mute is not manageable.` },
        { name: "Command:", value: `\`${prefix}ban [member] [days] [reason]\``}
    )
    .setFooter(`${by} helps`)
    if (!member.manageable) return msg.channel.send(noBan);

    const noMember = new Discord.MessageEmbed()
    .setColor("#ff0000")
    .setTitle(`:warning: CANCELED :warning:`)
    .addFields(
        { name: "No Member", value: `I don't know that member` },
        { name: "Command:", value: `\`${prefix}ban [member] [days] [reason]\``}
    )
    .setFooter(`${by} helps`)
    if (!member) return msg.channel.send(noMember);

    const noReason = new Discord.MessageEmbed()
    .setColor("#ff0000")
    .setTitle(`:warning: CANCELED :warning:`)
    .addFields(
        { name: "No Reason", value: `I need a reason in order to ban someone`},
        { name: "Command:", value: `\`${prefix}ban [member] [days] [reason]\``}
    )
    .setFooter(`${by} helps`)
    if (!reason) return msg.channel.send(noReason);

    if (isNaN(days)) {days = 1; reason = args.slice(1).join(" ");}

    member.ban({ days, reason: `${reason}`})
    const Ban = new Discord.MessageEmbed()
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
    msg.channel.send(Ban);
}

module.exports = {
    name: "ban",
    description: "Ban a member",
    example: prefix + "ban [member] [days] [reason]",
    type: "moderation",
    execute(msg, args){
      if (args[0]) {return banUser(msg, args)}
      if (!msg.member.hasPermission("BAN_MEMBERS")) return Perm(msg, `No permission`, `You dont have the permission to ban members`);
      if (!msg.guild.me.hasPermission("BAN_MEMBERS")) return Perm(msg, `No permission`, `I dont have the permission to ban members`);
      let authorid = msg.author.id;

      const filter1 = response1 => { return response1.author.id === authorid; }

      const User = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setTitle(`${by} Commands`)
      .setDescription("Command: ban")
      .addFields(
          { name: "Username", value: `I need a member's username to continue` }
      )
      .setFooter(`${by} helps`)

      msg.channel.send(User).then(() => {
          msg.channel.awaitMessages(filter1, { max: 1 , time: 30000, errors: ['time']})
          .then(collected1 => {
              const response1 = collected1.first();
              if (response1.toLowerCase() == `cancel`) return Cancel(msg);
              const user = response1.mentions.users.first();
              const member = msg.guild.member(user);
              if (!member.manageable) return Perm(msg, `Not manageable`, `That user cant be banned`);

              if (!member) return Wronganswer(msg, `No Member`, `I need a valid member username`);

              const filter2 = response2 => { return response2.author.id === authorid; }

              const Reason = new Discord.MessageEmbed()
              .setColor("RANDOM")
              .setTitle(`${by} Commands`)
              .setDescription("Command: ban")
              .addFields(
                  { name: "Reason", value: `I need a reason to continue` }
              )
              .setFooter(`${by} helps`)

              msg.channel.send(Reason).then(() => {
                  msg.channel.awaitMessages(filter2, { max: 1 , time: 30000, errors: ['time']})
                  .then(collected2 => {
                      const response2 = collected2.first();
                      if (response2.toLowerCase() == `cancel`) return Cancel(msg);
                      const reason = response2.content;

                      const filter3 = response3 => { return response3.author.id === authorid; }

                      const Day = new Discord.MessageEmbed()
                      .setColor("RANDOM")
                      .setTitle(`${by} Commands`)
                      .setDescription("Command: ban")
                      .addFields(
                          { name: "Days", value: `I need a number of days to continue` }
                      )
                      .setFooter(`${by} helps`)

                      msg.channel.send(Day).then(() => {
                          msg.channel.awaitMessages(filter3, { max: 1 , time: 30000, errors: ['time']})
                          .then(collected3 => {
                            const response3 = collected3.first();
                            if (response3.toLowerCase() == `cancel`) return Cancel(msg);
                            const days = response3.content;

                            member.ban({ days, reason: `${reason}`})
                            const Ban = new Discord.MessageEmbed()
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
                            msg.channel.send(Ban)

                          }).catch(error => {
                            Timeout(msg);
                          });
                      })
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