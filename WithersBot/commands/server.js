const { prefix } = require("./WithersBot/config.js");
const Discord = require("discord.js");
function serverData(msg, args) {
    if(args == 0){msg.channel.send(`Hello ${msg.author}! and Welcome to ! I'm WithersBot and I'm here to help you throughout your time in the server!`); return;}
    if (msg.content.endsWith("active")) {
        const Active = new Discord.MessageEmbed();
        Active.setTitle(`Active on Server`);
        Active.addField("Online Members", msg.guild.members.cache.filter(member => member.presence.status !== "offline").size);
        msg.channel.send(Active);
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
