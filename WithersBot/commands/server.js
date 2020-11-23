const { prefix } = require("/home/asorinus/workspace/myFirstProject/WithersWorld/WithersBot/config.json");
const Discord = require("discord.js");
function serverData(msg, args) {
    let guild = msg.guild;
    const member = msg.mentions.members.first();
    //const string = args.slice(1).join(" ");
    if(args == 0){
        const welcomeServer = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("WithersBot Commands")
        .setDescription(`Hello ${msg.author}! and Welcome to ${guild}! I'm WithersBot and I'm here to help you throughout your time in the server!`)
        .addFields(
            { name: "status", value: `get info on the server! - ${prefix}server`},
            { name: "region", value: `Set/change the region of the server - ${prefix}server region [region]`},
            { name: "name", value: `Set/change the name of the server - ${prefix}server name [name]`}
        )
        .setFooter("WithersBot helps")
        msg.channel.send(welcomeServer); 
        return;
    } else {

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
 )
 .setFooter('WithersBot helps')
msg.channel.send(ServerInfo);
return;
    }
    if (args == "banner") {
        msg.channel.send(`${guild.banner}`);
        return;
    }
    if (args == "test") {
        let argss = args.slice(args.length).join(" ");
        try {
            msg.channel.send(`${args}`, `${argss}`);
        } catch (error) {
            msg.reply(`${error}`);
        }
    }
if (`${msg.author}` !== `${guild.owner}`) {msg.channel.send(`You are not the owner, ${msg.author}`); return;} else {
    if (args == "region") {
        if (`${string}` > 0) {
            guild.edit({
                region: `${string}`
            })
            msg.channel.send(`${guild}'s region is now ${string}`);
        }
            return;
    }
        if (args == "name"){
            if (`${string}` > 0) {
                guild.edit({
                    name: `${string}`
                })
                msg.channel.send(`${guild}'s name is now ${string}`);
        }
            return;
        }
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
