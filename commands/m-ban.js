const { DiscordAPIError } = require("discord.js");
const { prefix, by } = require("./../config.json");
const Discord = require("discord.js");
function banUser(msg, args) {
  const user = msg.mentions.users.first();
  const reason = args.slice(1).join(" ");
  const days = 1;

    if (!msg.member.hasPermission("BAN_MEMBERS")) return msg.channel.send(`You don't have the permission to ban members, ${msg.author}`)
    if(!msg.guild.me.hasPermission("BAN_MEMBERS")) return msg.channel.send(`I dont have the permission to ban members, ${msg.author}`)
    if (user) {
        if (!msg.guild.member(user).bannable) return msg.channel.send(`I cant ban ${user}`);
        const member = msg.guild.member(user);
        if (member) {
        const noReason = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("BANNED MEMBER :bust_in_silhouette::no_entry_sign:")
        .setDescription("Command: ban")
        .addFields(
          { name: "No Reason", value: `I need a reason in order to ban someone`},
          { name: "Command", value: `Ban a member\n\`\`\`${prefix}ban [member] [reason]\`\`\``},
          { name: `**NOTE**`, value: `**Only use "ban" when someone has a really bad behavior**`}
        )
        .setFooter(`${by} helps`)
        if(!reason) return msg.channel.send(noReason)
        
        member.ban({ days, reason: `${reason}`})
        const banned = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`${by} Commands`)
        .setDescription("Command: ban")
        .addFields(
          { name: "Successful", value: `${user.username} has been successfully banned from ${msg.guild.name}.` },
          { name: "Reason:", value: `${reason}`},
          { name: `**NOTE**`, value: `**Only use "ban" when someone has a really really bad behavior**`}
        )
        .setFooter(`${by} helps`)
        msg.channel.send(banned);
        } else {
          const noMember = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`${by} Commands`)
        .setDescription("Command: ban")
        .addFields(
          { name: "No Member", value: `I don't know that member` },
          { name: "Command", value: `Ban a member\n\`\`\`${prefix}ban [member] [reason]\`\`\``},
          { name: `**NOTE**`, value: `**Only use "kick" when someone has a really really bad behavior**`}
        )
        .setFooter(`${by} helps`)
        msg.channel.send(noMember);
        }
        
      } else {
        const noTag = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`${by} Commands`)
        .setDescription("Command: ban")
        .addFields(
          { name: "No User", value: `I need an username in order to kick someone.` },
          { name: "Command", value: `Ban a member\n\`\`\`${prefix}ban [member] [reason]\`\`\``},
          { name: `**NOTE**`, value: `**Only use "kick" when someone has a really really bad behavior**`}
        )
        .setFooter(`${by} helps`)
        msg.channel.send(noTag);
      }
}

module.exports = {
    name: "ban",
    description: "Ban a member",
    example: prefix + "ban [member] [reason]",
    type: "moderation",
    execute(msg, args){
        banUser(msg, args);
    }
}