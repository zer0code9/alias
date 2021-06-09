const { prefix, by } = require("/home/asorinus/workspace/myFirstProject/splashy/SplashBot/config.json");
const Discord = require("discord.js");
function unbanUser(msg, args) {
  const user = args.slice(1).join(" ");

    if (!msg.member.hasPermission("BAN_MEMBERS")) return msg.channel.send(`You don't have the permission to unban someone, ${msg.author}`)
    if(!msg.guild.me.hasPermission("BAN_MEMBERS")) return msg.channel.send(`I dont have the permission to unban someone, ${msg.author}`)
      if (user) {
        msg.guild.members.unban(`${user}`)
        const unbanned = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("WithersBot Commands")
        .setDescription("Command: ban")
        .addFields(
          { name: "Successful", value: `${user.username} has been successfully unbanned from ${msg.guild.name}.` },
        )
        .setFooter("WithersBot helps")
        msg.channel.send(unbanned);

      } else {
        const noId = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("WithersBot Commands")
        .setDescription("Command: ban")
        .addFields(
          { name: "No Id", value: `I need a valid id in order to unban someone.` },
          { name: "Command", value: `Unban someone\n\`\`\`${prefix}unban [id]\`\`\``}
        )
        .setFooter("WithersBot helps")
        msg.channel.send(noId);
      }
}

module.exports = {
    name: "unban",
    description: "Unban someone",
    example: prefix + "unban [id]",
    type: "moderation",
    execute(msg, args){
        unbanUser(msg, args);
    }
}