const { prefix, by } = require("./../config.json");
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
    .setColor('#00ff00')
    .setTitle(`:file_folder: CHANNEL INFO :file_folder: `)
    .setDescription('Channel')
    .addFields(
        { name: `All Channels of ${msg.guild.name}`, value: `${channelmap}`}
    )
    .setFooter(`${by} helps`)
    msg.channel.send(channels);
}
}
module.exports = {
    name: "channels",
    description: "Get a list of all the channels of the server",
    example: prefix + "channels",
    type: "Channel",
    execute(msg, args) {
        channels(msg, args);
    }
}