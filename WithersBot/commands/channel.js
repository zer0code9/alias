const { prefix } = require("/home/asorinus/workspace/myFirstProject/WithersWorld/WithersBot/config.json");
const Discord = require("discord.js");
function cInfo(msg, args) {
    if (args == 0){
    const channelInfo = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setTitle(`WithersBot Commands`)
    .setDescription('Command: channel')
    .addFields(
        { name: "state", value: `get info on any channel\n\`\`\`${prefix}channel state [channel]\`\`\``},
        { name: "Create", value: `Create a channel\n\`\`\`${prefix}channel create [channel]\`\`\``},
        { name: "Delete", value: `Delete a channel\n\`\`\`${prefix}channel delete [channel]\`\`\``},
        { name: "Name", value: `Change the name of a channel\n\`\`\`${prefix}channel name [channel] [channnelName]\`\`\``}
    )
    .setFooter('WithersBot helps')
msg.channel.send(channelInfo);
    } else {
        if (args == "state") {
            const channelInfo = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTitle(`Info on`)
            .setDescription('WithersBot Commands: channel')
            .addFields(
                { name: "Id", value: `e` }
            )
            .setFooter('WithersBot helps')
        msg.channel.send(channelInfo);
        }
    }
}
module.exports = {
    name: "channel",
    description: "Get info on any channel of a server!",
    example: prefix + "channel",
    execute(msg, args) {
        cInfo(msg, args);
    }
}