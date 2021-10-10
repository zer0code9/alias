const { prefix, by } = require("./../config.json");
const { MessageEmbed } = require("discord.js");
function channels(msg, args) {
    const channel = msg.mentions.channels.first();

    let channelmap = msg.guild.channels.cache
    .sort((a, b) => b.position + a.position)
    .map(c => c)
    .join(`\n`);
    if (channelmap.length > 1024) channelmap = "To many channels to display";
    if (!channelmap) rolemap = "No channels";

    const channels = new MessageEmbed()
    .setColor('#00ff00')
    .setTitle(`:white_check_mark: CHANNEL COUNT :file_folder::1234:`)
    .setDescription('Channel')
    .addFields(
        { name: `All Channels of ${msg.guild.name} [${msg.guild.channels.cache.size}]`, value: `${channelmap}`}
    )
    .setFooter(`${by} helps`)
    msg.channel.send({ embeds: [channels] });
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