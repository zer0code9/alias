const { prefix } = require("/home/asorinus/workspace/myFirstProject/WithersWorld/WithersBot/config.json");
const Discord = require("discord.js");
function roles(msg, args) {
    let user = msg.mentions.members.first();
    if (args == 0){
    const channelInfo = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setTitle(`WithersBot Commands`)
    .setDescription('Commands: roles')
    .addFields(
        { name: "Roles", value: `${msg.guild.roles}`}
    )
    .setFooter('WithersBot')
msg.channel.send(channelInfo);
}
}
module.exports = {
    name: "roles",
    description: "Get a list of all the roles of the server",
    example: prefix + "roles",
    type: "rank",
    execute(msg, args) {
        roles(msg, args);
    }
}