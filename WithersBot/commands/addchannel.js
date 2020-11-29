const { prefix } = require("/home/asorinus/workspace/myFirstProject/WithersWorld/WithersBot/config.json");
const Discord = require("discord.js");
function lala(msg, args) {
    if (!msg.member.permissions.has("MANAGE_CHANNELS")) {msg.channel.send(`You don't have the permission to manage channels, ${msg.author}`); return;} else {
    const channel = msg.mentions.channels.first();
    if (args == 0) {
    const noAdd = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle("WithersBot Commands")
    .setDescription("Command: addchannel")
    .addFields(
        { name: "Command:", value: `Create a new channel\n\`\`\`${prefix}addchannel [name]\`\`\``}
    )
    .setFooter("WithersBot helps")
    msg.channel.send(noAdd);
    } else {
        if (args != 0) {
        let addchannel = msg.guild.channels.create({ name: `${args}` });
        const add = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("WithersBot Commands")
        .setDescription("Command: addchannel")
        .addFields(
            { name: "A new channel has been added", value: `New channel name: ${args}`}
        )
        .setFooter("WithersBot helps")
        msg.channel.send(add);
        }
    }
}
}

module.exports = {
    name: "addchannel",
    description: "Create a new channel",
    example: prefix + "addchannel [name]",
    type: "channel",
    execute(msg, args) {
        lala(msg, args)
    }
}