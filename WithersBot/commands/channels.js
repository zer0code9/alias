const { prefix } = require("/home/asorinus/workspace/myFirstProject/WithersWorld/WithersBot/config.json");
const Discord = require("discord.js");
function channels(msg, args) {
    const channel = msg.mentions.channels.first();
    if (args == 0){
        let channelmap = msg.guild.channels.cache
            .sort((a, b) => b.position + a.position)
            .map(c => c)
            .join(`\n`);
            if (channelmap.length > 1024) channelmap = "To many channels to display";
            if (!channelmap) rolemap = "No channels"; 
    const channels = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setTitle(`WithersBot Commands`)
    .setDescription('Commands: channels')
    .addFields(
        { name: `All Channels of ${msg.guild}`, value: `${channelmap}`}
    )
    .setFooter('WithersBot helps')
    msg.channel.send(channels);
}
}
module.exports = {
    name: "channels",
    description: "Get a list of all the channels of the server",
    example: prefix + "channels",
    type: "rank",
    execute(msg, args) {
        channels(msg, args);
    }
}