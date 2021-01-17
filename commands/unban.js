const { prefix } = require("/home/asorinus/workspace/myFirstProject/WithersWorld/WithersBot/config.json");
const Discord = require("discord.js");
function banUser(msg, args) {
  const user = args.slice(1).join(" ");

    if (!msg.member.hasPermission("BAN_MEMBERS")) return msg.channel.send(`You don't have the permission to unban someone, ${msg.author}`)
    if(!msg.guild.me.hasPermission("BAN_MEMBERS")) return msg.channel.send(`I dont have the permission to unban someone, ${msg.author}`)
      if (user) {
        const member = msg.guild.member(user);
        if (member) {
        //member.ban()
        const banned = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("WithersBot Commands")
        .setDescription("Command: ban")
        .addFields(
          { name: "Successful", value: `${user.username} has been successfully banned from ${msg.guild.name}.` },
          { name: "Reason:", value: `${reason}`},
          { name: `**NOTE**`, value: `**Only use "ban" when someone has a really really bad behavior**`}
        )
        .setFooter("WithersBot helps")
        msg.channel.send(banned);
        } else {
          const noMember = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("WithersBot Commands")
        .setDescription("Command: ban")
        .addFields(
          { name: "No Member", value: `I don't know that member` },
          { name: "Command", value: `Ban a member\n\`\`\`${prefix}ban [member] [reason]\`\`\``},
          { name: `**NOTE**`, value: `**Only use "kick" when someone has a really really bad behavior**`}
        )
        .setFooter("WithersBot helps")
        msg.channel.send(noMember);
        }

      } else {
        const noTag = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("WithersBot Commands")
        .setDescription("Command: ban")
        .addFields(
          { name: "No User", value: `I need an username in order to kick someone.` },
          { name: "Command", value: `Ban a member\n\`\`\`${prefix}ban [member] [reason]\`\`\``},
          { name: `**NOTE**`, value: `**Only use "kick" when someone has a really really bad behavior**`}
        )
        .setFooter("WithersBot helps")
        msg.channel.send(noTag);
      }
}

module.exports = {
    name: "unban",
    description: "Unban someone",
    example: prefix + "unban [id]",
    type: "moderation",
    execute(msg, args){
        banUser(msg, args);
    }
}