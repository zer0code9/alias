const { prefix } = require("/home/asorinus/workspace/myFirstProject/WithersWorld/WithersBot/config.json");
const Discord = require("discord.js");
function serverData(msg, args) {
    let guild = msg.guild;
    const member = msg.mentions.members.first();

    if(args == 0){
        const ServerInfo = new Discord.MessageEmbed()
 .setColor('RANDOM')
 .setTitle(`Server infomation of ${guild.name}`)
 .setDescription(`Hello and welcome to ${guild.name} :D`)
 .addFields(
  { name: 'Members', value: `${guild.memberCount}` },
  { name: 'Region', value: `${guild.region}` },
  { name: 'Owner', value: `${guild.owner}`},
  { name: "Verified?", value: `${guild.verified}` },
  { name: "Channels", value: `${guild.channels}` },
  { name: "Roles", value: `${guild.roles}` },
  { name: "Create on", value: `${guild.createdAt}` },
  { name: "Id", value: `${guild.id}` }
 )
 .setFooter('WithersBot helps')
msg.channel.send(ServerInfo);
return;
    }
}


module.exports = {
    name: "server",
    description: "WithersWorld to WithersBot",
    example: prefix + "server [data-on-server]",
    type: "info",
    execute(msg, args){
        serverData(msg, args);
    }
}
