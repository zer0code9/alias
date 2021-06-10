const { DiscordAPIError } = require("discord.js");
const { prefix, by } = require("./../config.jsonn");
const Discord = require("discord.js");
function kickUser(msg, args) {
  const user = msg.mentions.users.first();
  const reason = args.slice(1).join(" ");

  if (!msg.member.permissions.has("KICK_MEMBERS")) return msg.channel.send(`You don't have the permission to kick members, ${msg.author}`)
  if(!msg.guild.me.hasPermission("BAN_MEMBERS")) return msg.channel.send(`I dont have the permission to kick members, ${msg.author}`)
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
        kickUser(msg, args);
    }
}