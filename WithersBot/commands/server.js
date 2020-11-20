const { prefix } = require("/home/asorinus/workspace/myFirstProject/WithersWorld/WithersBot/config.json");
const Discord = require("discord.js");
function serverData(msg, args) {
    const args2 = msg.content.slice(prefix.length).slice(args.length).split(/ +/);
    let guild = msg.guild;
    if(args == 0){msg.channel.send(`Hello ${msg.author}! and Welcome to ${guild}! I'm WithersBot and I'm here to help you throughout your time in the server!`); return;}
    if(args == "status"){
        const ServerInfo = new Discord.MessageEmbed()
 .setColor('RANDOM')
 .setTitle(`Server infomation of ${guild.name}`)
 .setDescription(`Hello and welcome to ${guild.name} :D`)
 .addFields(
  { name: 'Members', value: `${guild.memberCount}` },
  { name: 'Region', value: `${guild.region}` },
  { name: 'Owner', value: `${guild.owner}`},
  { name: "Verified?", value: `${guild.verified}`},
  { name: "Description", value: `${guild.description}`},
  { name: "Roles", value: `${guild.roles}`}
 );
msg.channel.send(ServerInfo);
    }
    if (args == "role") {
        msg.channel.send(`Your roles are ${role.name}`);
        return;
    }
    if (args == "member") {
        msg.channel.send(`There are ${guild.memberCount} members`);
    }
    if (args == "banner") {
        msg.channel.send(`${guild.banner}`);
    }
    if (args == "region") {
        if (args2 > 0) {
        guild.edit({
            region: `${args2}`
        })
        msg.channel.send(`${guild}'s region is now ${args2}`);
        return;
    }
    }
}

module.exports = {
    name: "server",
    description: "WithersWorld to WithersBot",
    example: prefix + "server [data-on-server]",
    execute(msg, args){
        serverData(msg, args);
    }
}
