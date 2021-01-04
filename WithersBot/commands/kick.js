const { DiscordAPIError } = require("discord.js");
const { prefix } = require("/home/asorinus/workspace/myFirstProject/WithersWorld/WithersBot/config.json");
const Discord = require("discord.js");
function kickUser(msg, args) {
  const user = msg.mentions.users.first();
  const reason = args.slice(1).join(" ");

    if (!msg.member.permissions.has("KICK_MEMBERS")) {msg.channel.send(`You don't have the permission to kick members, ${msg.author}`); return;} else {

    if (user) {
        //user.kick()
        const kicked = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("WithersBot Commands")
        .setDescription("Command: kick")
        .addFields(
          { name: "Successful", value: `${user.username} has been successfully kicked.` },
          { name: "Reason:", value: `${reason}`},
          { name: `**NOTE**`, value: `**Only use "kick" when someone has a bad behavior**`}
        )
        .setFooter("WithersBot helps")
        msg.channel.send(kicked);

      } else {

        if (!user) {
        const noTag = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("WithersBot Commands")
        .setDescription("Command: kick")
        .addFields(
          { name: "No User", value: `I need an username in order to kick someone.` },
          { name: "Command", value: `Kick a member\n\`\`\`${prefix}kick [member] [reason]\`\`\``},
          { name: `**NOTE**`, value: `**Only use "kick" when someone has a bad behavior**`}
        )
        .setFooter("WithersBot helps")
        msg.channel.send(noTag);

        }
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