const { DiscordAPIError } = require("discord.js");
const { prefix } = require("/home/asorinus/workspace/myFirstProject/WithersWorld/WithersBot/config.json");
const Discord = require("discord.js");
function kickUser(msg, args) {
  const user = msg.mentions.users.first();
  const reason = args.slice(1).join(" ");

  if (!msg.member.permissions.has("KICK_MEMBERS")) {msg.channel.send(`You don't have the permission to kick members, ${msg.author}`); return;} else {

    if (user) {
        const member = msg.guild.member(user);
        if (member) {
        //member.kick()
        const kicked = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("WithersBot Commands")
        .setDescription("Command: kick")
        .addFields(
          { name: "Successful", value: `${user.username} has been successfully kicked from ${msg.guild.name}.` },
          { name: "Reason:", value: `${reason}`},
          { name: `**NOTE**`, value: `**Only use "kick" when someone has a really bad behavior**`}
        )
        .setFooter("WithersBot helps")
        msg.channel.send(kicked);
        } else {
          const noMember = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("WithersBot Commands")
        .setDescription("Command: kick")
        .addFields(
          { name: "No Member", value: `I don't know that member` },
          { name: "Command", value: `Kick a member\n\`\`\`${prefix}kick [member] [reason]\`\`\``},
          { name: `**NOTE**`, value: `**Only use "kick" when someone has a really bad behavior**`}
        )
        .setFooter("WithersBot helps")
        msg.channel.send(noMember);
        }

      } else {
        const noTag = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("WithersBot Commands")
        .setDescription("Command: kick")
        .addFields(
          { name: "No User", value: `I need an username in order to kick someone.` },
          { name: "Command", value: `Kick a member\n\`\`\`${prefix}kick [member] [reason]\`\`\``},
          { name: `**NOTE**`, value: `**Only use "kick" when someone has a really bad behavior**`}
        )
        .setFooter("WithersBot helps")
        msg.channel.send(noTag);
      }
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