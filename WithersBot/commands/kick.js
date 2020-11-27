const { DiscordAPIError } = require("discord.js");
const { prefix } = require("/home/asorinus/workspace/myFirstProject/WithersWorld/WithersBot/config.json");
const Discord = require("discord.js");
function kickUser(msg, args) {
  let guild = msg.guild;
  const taggedUser = msg.mentions.users.first();
  const reason = args.slice(1).join(" ");

    if (!msg.member.permissions.has("KICK_MEMBERS")) {msg.channel.send(`You don't have the permission to kick members, ${msg.author}`); return;} else {

    if (msg.mentions.users.size) {
        taggedUser.kick();
        const kicked = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("WithersBot Commands")
        .setDescription("Command: kick")
        .addFields(
          { name: "Successful", value: `${taggedUser.username} has been successfully kicked.` },
          { name: "Reason:", value: `${reason}`},
          { name: `**NOTE**`, value: `**Only use "kick" when someone has a bad behavior**`}
        )
        .setFooter("WithersBot helps")
        msg.channel.send(kicked);

      } else {

        if (!msg.mentions.users.size) {
        const noTag = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("WithersBot Commands")
        .setDescription("Command: kick")
        .addFields(
          { name: "No User", value: `I need an username in order to kick someone.` },
          { name: `**NOTE**`, value: `**Only use "kick" when someone has a bad behavior**`}
        )
        .setFooter("WithersBot helps")
        msg.channel.send(noTag);

        } else {
          msg.reply(`I don't know that person`);
        }
      }
}
}

module.exports = {
    name: "kick",
    description: "Only use it when someone has a bad behavior",
    example: prefix + "kick [@username]",
    type: "moderation",
    execute(msg, args){
        kickUser(msg, args);
    }
}