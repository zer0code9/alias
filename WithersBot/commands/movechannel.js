const { prefix } = require("/home/asorinus/workspace/myFirstProject/WithersWorld/WithersBot/config.json");
const Discord = require("discord.js");
function abc(msg, args) {
    if (!msg.member.permissions.has("MANAGE_CHANNELS")) {msg.channel.send(`You don't have the permission to manage channels, ${msg.author}`); return;} else {
    const channel = msg.mentions.channels.first();
    if (args == 0) {
        const no = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("WithersBot Commands")
        .setDescription("Command: movechannel")
        .addFields(
            { name: "Command", value: `Move the channel to a different place\n\`\`\`${prefix}movechannel [category] [place]\`\`\``}
        )
        .setFooter("WithersBot helps")
        msg.channel.send(no);
    } else {
        if (args !=0) {
            channel.setParent(`${args[0]}`);
            channel.setPosition(`${args[1]}`);
            const yes = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle("WithersBot Commands")
            .setDescription("Command: movechannel")
            .addFields(
                { name: "New category", value: `${args[0]}`}
            )
            .setFooter("WithersBot helps")
            msg.channel.send(yes);
        }
    }
}
}

module.exports = {
    name: "movechannel",
    description: "Move the channel to a different place",
    example: prefix + "movechannel [category] [place]",
    type: "channel",
    execute(msg, args) {
        abc(msg, args);
    }
}