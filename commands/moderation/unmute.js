const { prefix, by } = require("../../config.json");
const { MessageEmbed, Permissions } = require('discord.js');
const { Timeout, Wronganswer, Perm, Cancel, Invalid, Unknown } = require("../../errors");
async function unmuteUser(msg, args) {
    const user = await msg.guild.members.cache.get(args[0]) || msg.mentions.users.first();

    if (!user) return Invalid(msg, 'No User', 'I need a user to mute them', `${example}`);
    if (!user.manageable) return Invalid(msg, `Not Manageable`, `The user you are trying to mute is not manageable`, `${example}`);

    await member.setMute(true, reason);
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
    await msg.channel.send({ embeds: [Mute] });
    msg.delete();
}

module.exports = {
    name: "unmute",
    description: "Unmute a member",
    example: prefix + "unmute [member]",
    type: "moderation",
    execute(msg, args){
        if (!msg.member.hasPermission("MUTE_MEMBERS")) return msg.channel.send(`You don't have the permission to mute members, ${msg.author}`);
        if (!msg.guild.me.hasPermission("MUTE_MEMBERS")) return msg.channel.send(`I dont have the permission to mute someone, ${msg.author}`);
        if (args[0]) return unmuteUser(msg, args);
        const filter = (m) => m.author.id === msg.author.id;

      const User = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle(`${by} Commands`)
      .setDescription("Command: unmute")
      .addFields(
          { name: "Username", value: `I need a member's username to continue` },
          { name: `Type \`cancel\` to cancel the command` }
      )
      .setFooter({ text: `${by} helps` })

      msg.channel.send({ embeds: [User] }).then(() => {
          msg.channel.awaitMessages(filter, { max: 1 , time: 30000, errors: ['time']})
          .then(collected1 => {
              const response1 = collected1.first();
              const user = response1.mentions.users.first()
              const member = msg.guild.member(user);
              if (!user.manageable) return msg.channel.send(`I cant mute ${user}`);
              if (!member) return Wronganswer(msg, )

              const filter2 = response2 => { return response2.author.id === authorid; }

              const Reason = new Discord.MessageEmbed()
              .setColor("RANDOM")
              .setTitle(`${by} Commands`)
              .setDescription("Command: mute")
              .addFields(
                  { name: "Reason", value: `I need a reason to continue` },
                  { name: `**NOTE**`, value: `**Only use "mute" when someone has a bad behavior**`}
              )
              .setFooter({ text: `${by} helps` })

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
                    .setFooter({ text: `${by} helps` })
                    msg.channel.send(mute)
                  }).catch(error => {
                      const Error = new Discord.MessageEmbed()
                      .setColor("#ff0000")
                      .setTitle(":x: CANCELED :x:")
                      .addFields(
                          { name: "Command Canceled", value: `Timeout cancelation`}
                      )
                      .setFooter({ text: `${by} helps` })
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
              .setFooter({ text: `${by} helps` })
              msg.channel.send(Error);  
          });
      })
    }
}