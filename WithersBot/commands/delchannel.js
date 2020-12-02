const { prefix } = require("/home/asorinus/workspace/myFirstProject/WithersWorld/WithersBot/config.json");
const Discord = require("discord.js");
function cdel(msg, args) {
    if (!msg.member.permissions.has("MANAGE_CHANNELS")) {msg.channel.send(`You don't have the permission to manage channels, ${msg.author}`); return;} else {
    const channel = msg.mentions.channels.first();
    if (args == 0){
    const noDelete = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setTitle(`WithersBot Commands`)
    .setDescription('Command: delchannel')
    .addFields(
        { name: "Command:", value: `Delete a channel\n\`\`\`${prefix}delchannel [channel]\`\`\``}
    )
    .setFooter('WithersBot helps')
msg.channel.send(noDelete);
    } else {
        if (args[0] == channel) {
            msg.guild.channels.delete(channel);
            const remove = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTitle(`WithersBot Commands`)
            .setDescription('Commands: delchannel')
            .addFields(
                { name: "A channel has been deleted", value: `Deleted channel: ${args}` }
            )
            .setFooter('WithersBot helps')
         msg.channel.send(remove);
        } else {
            if (args != msg.guild.channels.name) {
            const noRemove = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTitle(`WithersBot Commands`)
            .setDescription('Commands: delchannel')
            .addFields(
                { name: "Can't delete channel", value: `There is no channel ${args}` }
            )
            .setFooter('WithersBot helps')
            msg.channel.send(noRemove);
            }
        }
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