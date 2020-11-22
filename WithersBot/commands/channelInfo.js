const { prefix } = require("/home/asorinus/workspace/myFirstProject/WithersWorld/WithersBot/config.json");
const Discord = require("discord.js");
function cInfo(msg, args) {
    const channel = msg.channels.get("name", `${args}`);
    const channelInfo = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setTitle(`Info on`)
    .setDescription('**WithersBot Commands:**')
    .addFields(
        { name: "Id", value: `${channel.id}` }
    )
    .setFooter('The Bot of WithersWorld')
msg.channel.send(`${channelInfo}`);
}
module.exports = {
    name: "channel",
    description: "Get info on any channel of a server!",
    example: prefix + "channelInfo [channelName]",
    execute(msg, args) {
        cInfo(msg, args);
    }
}