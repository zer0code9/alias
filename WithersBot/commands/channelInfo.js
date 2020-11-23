const { prefix } = require("/home/asorinus/workspace/myFirstProject/WithersWorld/WithersBot/config.json");
const Discord = require("discord.js");
function cInfo(msg, args) {
    if (args == 0){
    const channeli = msg.channels.find("id", `${args}`);
    msg.channel.send(channeli);
    //const channelIi = channeli.toString();
    const channelInfo = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setTitle(`Info on`)
    .setDescription('**WithersBot Commands:**')
    .addFields(
        { name: "Id", value: `${channeli.id}` }
    )
    .setFooter('The Bot of WithersWorld', new Date())
msg.channel.send(channelInfo);
    }
}
module.exports = {
    name: "channel",
    description: "Get info on any channel of a server!",
    example: prefix + "channelInfo [channelName]",
    execute(msg, args) {
        cInfo(msg, args);
    }
}