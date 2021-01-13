const { prefix } = require("/home/asorinus/workspace/myFirstProject/WithersWorld/WithersBot/config.json");
const Discord = require("discord.js");
function lala(msg, args) {
    if (!msg.member.permissions.has("MANAGE_CHANNELS")) {msg.channel.send(`You don't have the permission to manage channels, ${msg.author}`); return;} else {
    const channel = msg.mentions.channels.first();
    const type = args[1];
    const name = args.slice(1).join(" ");
    if (name) {
        msg.guild.channels.create(`${name}`, {type: `${type}`});
        const add = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("WithersBot Commands")
        .setDescription("Command: addchannel")
        .addFields(
            { name: "A new channel has been created", value: `New channel name: ${name}`}
        )
        .setFooter("WithersBot helps")
        msg.channel.send(add);
    } else {
        const noAdd = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("WithersBot Commands")
        .setDescription("Command: addchannel")
        .addFields(
            { name: "No Name", value: `I need a name in order to create a new channel`},
            { name: "Command:", value: `Create a new channel\n\`\`\`${prefix}addchannel [name]\`\`\``}
        )
        .setFooter("WithersBot helps")
        msg.channel.send(noAdd);
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