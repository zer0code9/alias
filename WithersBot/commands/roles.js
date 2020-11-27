const { prefix } = require("/home/asorinus/workspace/myFirstProject/WithersWorld/WithersBot/config.json");
const Discord = require("discord.js");
function cInfo(msg, args) {
    let user = msg.mentions.members.first();
    let rolei = args.slice(1).join(" ");
    if (args == 0){
    const channelInfo = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setTitle(`WithersBot Commands`)
    .setDescription('Commands: roles')
    .addFields(
        { name: "Roles", value: `${msg.guild.roles}`}
    )
    .setFooter('The Bot of WithersWorld')
msg.channel.send(channelInfo);
}
}
module.exports = {
    name: "roles",
    description: "Get a embed message with all the roles of the server",
    example: prefix + "roles",
    execute(msg, args) {
        cInfo(msg, args);
    }
}