const { prefix } = require("/home/asorinus/workspace/myFirstProject/WithersWorld/WithersBot/config.json");
const Discord = require("discord.js");
function serverData(msg, args) {
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
return;
    }

    if (args == "role") {
        let member = msg.member;
        msg.channel.send(`Your roles are ${member.roles}`);
        return;
    }
    if (args == "banner") {
        msg.channel.send(`${guild.banner}`);
        return;
    }
if (`${msg.author}` !== `${guild.owner}`) {msg.channel.send(`You are not the owner, ${msg.author}`); return;} else {
    if (args == "region") {
        if (args[1] == 0) {
            msg.reply("I can't change with no value. Try again.\n ```zserver region [region]```");
            return;
        } else {
            guild.edit({
                region: `${args[1]}`
            })
            msg.channel.send(`${guild}'s region is now ${args[1]}`);
        }

        return;
    }
        if (args == "name"){
            if (args[1] == 0) {
                msg.reply("I can't change with no value. Try again.\n ```zserver name [string]```");
                return;
            } else {
                guild.edit({
                    name: `${args[1]}`
                })
                msg.channel.send(`${guild}'s `)
            }
        }
}
    if (args == "name") {
        msg.channel.send("What do you want the name of the guild to be?")
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
