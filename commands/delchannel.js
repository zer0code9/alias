const { prefix } = require("/home/asorinus/workspace/myFirstProject/WithersWorld/WithersBot/config.json");
const Discord = require("discord.js");
function cdel(msg, args) {
    if (!msg.member.permissions.has("MANAGE_CHANNELS")) {msg.channel.send(`You don't have the permission to manage channels, ${msg.author}`); return;} else {
    const channel = msg.mentions.channels.first();
    const reason = args.slice(1).join(" ");
    if (channel) {
        channel.delete();
        const remove = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle(`WithersBot Commands`)
        .setDescription('Commands: delchannel')
        .addFields(
            { name: "A channel has been deleted", value: `Deleted channel: ${args}` },
            { name: "Reason", value: `${reason}`}
        )
        .setFooter('WithersBot helps')
        msg.channel.send(remove);
    } else {
        const noDelete = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle(`WithersBot Commands`)
        .setDescription('Command: delchannel')
        .addFields(
            { name: "No Channel", value: `I need a channel in order to delete it`},
            { name: "Command:", value: `Delete a channel\n\`\`\`${prefix}delchannel [channel]\`\`\``}
        )
        .setFooter('WithersBot helps')
        msg.channel.send(noDelete);
    }
}

}
module.exports = {
    name: "delchannel",
    description: "Delete a channel",
    example: prefix + "delchannel [channel]",
    type: "channel",
    execute(msg, args) {
        cdel(msg, args);
    }
}