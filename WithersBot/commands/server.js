const { prefix } = require("/home/asorinus/workspace/myFirstProject/WithersWorld/WithersBot/config.json");
const Discord = require("discord.js");
function serverData(msg, args) {
    let guild = msg.guild;
    const member = msg.mentions.members.first();
    var cre = guild.createdAt;
    if(args == 0){
        var rc;
        var ve;
        var sc;
        if (guild.verified = "false") { ve = "Not verified" } else { ve = `${guild.verified}` }
        if (guild.systemChannel = "null" || "undefined") { sc = "No system channel" } else { sc = `${guild.systemChannel}` }
        if (guild.rulesChannel = "null" || "undefined") { rc = "No rule channel" } else { rc = `${guild.rulesChannel}` }
        const ServerInfo = new Discord.MessageEmbed()
 .setColor('RANDOM')
 .setTitle(`WithersBot Commands`)
 .setDescription(`Command: server`)
 .addFields(
  { name: "Name", value: `${guild.name}`},
  { name: "Id", value: `${guild.id}` },
  { name: "Create on", value: `${cre.toDateString()}` },
  { name: 'Members', value: `${guild.memberCount}` },
  { name: 'Region', value: `${guild.region}` },
  { name: 'Owner', value: `${guild.owner}`},
  { name: "Verified?", value: `${ve}` },
  { name: "Channels", value: `${guild.channels}` },
  { name: "Roles", value: `${guild.roles}` },
  { name: "System", value: `${guild.systemChannel}`}, { name: "Rule", value: `${rc}`}
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
