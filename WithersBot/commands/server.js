const { prefix } = require("/home/asorinus/workspace/myFirstProject/WithersWorld/WithersBot/config.json");
const Discord = require("discord.js");
function serverData(msg, args) {
    let guild = msg.guild;
    if(args == 0){msg.channel.send(`Hello ${msg.author}! and Welcome to ${guild}! I'm WithersBot and I'm here to help you throughout your time in the server!`); return;}
    if(args == "status"){
        const ServerInfo = new Discord.MessageEmbed()
 .setColor('RANDOM')
 .setTitle(`Server infomation on ${guild.name}`)
 .setDescription(`Hello and welcome to ${guild.name} :D`)
 .addFields(
  { name: 'Members', value: `${guild.memberCount}` },
  { name: 'Region', value: `${guild.region}` },
  { name: 'Owner', value: `${guild.owner}`},
  { name: "Description", value: `${guild.description}`}
 );
msg.channel.send(ServerInfo);
    }
    if (args == "active") {
        msg.channel.send("Online Members: " + `${guild.presences.memberCount}`);
        return;
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
}

module.exports = {
    name: "server",
    description: "WithersWorld to WithersBot",
    example: prefix + "server [data-on-server]",
    execute(msg, args){
        serverData(msg, args);
    }
}
