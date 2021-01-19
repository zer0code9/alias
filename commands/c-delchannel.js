const { prefix } = require("/home/asorinus/workspace/myFirstProject/WithersWorld/WithersBot/config.json");
const Discord = require("discord.js");
function cdel(msg, args) {
    if (!msg.member.hasPermission("MANAGE_CHANNELS")) return msg.channel.send(`You don't have the permission to manage channels, ${msg.author}`)
    if(!msg.guild.me.hasPermission("MANAGE_CHANNELS")) return msg.channel.send(`I dont have the permission to manage channels, ${msg.author}`)
    const channel = msg.mentions.channels.first();
    var reason = args.slice(1).join(" ");
    if (channel) {
        if (!reason) return reason = "No reason"
        channel.delete();
        const remove = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle(`DELETED CHANNEL :file_folder::heavy_minus_sign:`)
        .setDescription('Channel')
        .addFields(
            { name: "A channel has been deleted", value: `\`\`\`${args}\`\`\`` },
            { name: "Reason", value: `\`\`\`${reason}\`\`\``}
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
module.exports = {
    name: "delchannel",
    description: "Delete a channel",
    example: prefix + "delchannel [channel]",
    type: "channel",
    execute(msg, args) {
        cdel(msg, args);
    }
}