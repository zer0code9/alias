const { DiscordAPIError } = require("discord.js");
const { prefix } = require("/home/asorinus/workspace/myFirstProject/WithersWorld/WithersBot/config.json");
const Discord = require("discord.js");
function banUser(msg, args) {
  let guild = msg.guild;
  const taggedUser = msg.mentions.users.first();
  const reason = args.slice(1).join(" ");

    if (!msg.member.permissions.has("BAN_MEMBERS")) {msg.channel.send(`You don't have the permission to kick members, ${msg.author}`); return;} else {

    if (msg.mentions.users.size) {
        taggedUser.ban();
        const banned = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("WithersBot Commands")
        .setDescription("Command: ban")
        .addFields(
          { name: "Successful", value: `${taggedUser.username} has been successfully banned.` },
          { name: "Reason:", value: `${reason}`},
          { name: `**NOTE**`, value: `**Only use "ban" when someone has a really really bad behavior**`}
        )
        .setFooter("WithersBot helps")
        msg.channel.send(banned);

      } else {

        if (!msg.mentions.users.size) {
        const noTag = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("WithersBot Commands")
        .setDescription("Command: ban")
        .addFields(
          { name: "No User", value: `I need an username in order to ban someone.` },
          { name: `**NOTE**`, value: `**Only use "ban" when someone has a really really bad behavior**`}
        )
        .setFooter("WithersBot helps")
        msg.channel.send(noTag);

        }
      }
}
}

module.exports = {
    name: "ban",
    description: "Ban a member",
    example: prefix + "ban [user]",
    type: "moderation",
    execute(msg, args){
        banUser(msg, args);
    }
}