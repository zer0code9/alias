const { prefix } = require("/home/asorinus/workspace/myFirstProject/WithersWorld/WithersBot/config.json");
const Discord = require("discord.js");
function unmuteUser(msg, args) {
  const user = msg.mentions.users.first();

  if (!msg.member.hasPermission("MUTE_MEMBERS")) return msg.channel.send(`You don't have the permission to unmute members, ${msg.author}`)
  if(!msg.guild.me.hasPermission("MUTE_MEMBERS")) return msg.channel.send(`I dont have the permission to unmute someone, ${msg.author}`)
    if (user) {
        const member = msg.guild.member(user);
        if (member) {
        //member.unmute()
        const unmuted = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("UNMUTED MEMBER :bust_in_silhouette::speaker:")
        .setDescription("Moderation")
        .addFields(
          { name: "Successful", value: `${user.username} has been successfully unmuted on ${msg.channel.name}.` }
        )
        .setFooter("WithersBot helps")
        msg.channel.send(unmuted);
        } else {
          const noMember = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("WithersBot Commands")
        .setDescription("Command: unmute")
        .addFields(
          { name: "No Member", value: `I don't know that member` },
          { name: "Command", value: `Unmute a member\n\`\`\`${prefix}unmute [member]\`\`\``}
        )
        .setFooter("WithersBot helps")
        msg.channel.send(noMember);
        }

      } else {
        const noTag = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("WithersBot Commands")
        .setDescription("Command: unmute")
        .addFields(
          { name: "No User", value: `I need an username in order to unmute someone.` },
          { name: "Command", value: `Unmute a member\n\`\`\`${prefix}unmute [member]\`\`\``}
        )
        .setFooter("WithersBot helps")
        msg.channel.send(noTag);
      }
}

module.exports = {
    name: "unmute",
    description: "Unmute a member",
    example: prefix + "unmute [member]",
    type: "moderation",
    execute(msg, args){
        unmuteUser(msg, args);
    }
}