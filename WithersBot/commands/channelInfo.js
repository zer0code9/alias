const { prefix } = require("/home/asorinus/workspace/myFirstProject/WithersWorld/WithersBot/config.json");
const Discord = require("discord.js");
function cInfo(msg, args) {
    const string = args.slice(1).join(" ");
    if (args == 0){
    const channelInfo = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setTitle(`WithersBot Commands`)
    .setDescription('Command: channel')
    .addFields(
        { name: "state", value: "get info on any channel - zchannel state [channelName]"}
    )
    .setFooter('The Bot of WithersWorld', new Date())
msg.channel.send(channelInfo);
    } else {
        if (args == "state") {
            const channeli = msg.guild.channels.cache.find("name", `${string}` - "#");
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
}
module.exports = {
    name: "channel",
    description: "Get info on any channel of a server!",
    example: prefix + "channelInfo [channelName]",
    execute(msg, args) {
        cInfo(msg, args);
    }
}