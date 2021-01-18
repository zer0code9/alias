const { prefix } = require("/home/asorinus/workspace/myFirstProject/WithersWorld/WithersBot/config.json");
const Discord = require("discord.js");
function serverData(msg, args) {
    let guild = msg.guild;
    const member = msg.mentions.members.first();
    var cre = guild.createdAt;
    if(args == 0){
        var rc;
        var sc;
        var ro = guild.roles;

        const total = msg.guild.memberCount;
	    const bots = msg.guild.members.cache.filter(member => member.user.bot).size;
	    const users = msg.guild.members.cache.filter(member => !member.user.bot).size;
        if (guild.systemChannel = "null" || "undefined") { sc = "No system channel" } else { sc = `${guild.systemChannel.name}` }
        if (guild.rulesChannel = "null" || "undefined") { rc = "No rule channel" } else { rc = `${guild.rulesChannel.name}` }

        const categoryChannels = guild.channels.cache.filter(channel => channel.type === "category").size;
        const textChannels = guild.channels.cache.filter(channel => channel.type === "text").size;
        const voiceChannels = guild.channels.cache.filter(channel => channel.type === "voice").size;
        const newsChannels = guild.channels.cache.filter(channel => channel.type === "news").size;
        const storeChannels = guild.channels.cache.filter(channel => channel.type === "store").size;
        const ServerInfo = new Discord.MessageEmbed()
 .setColor('RANDOM')
 .setTitle(`WithersBot Commands`)
 .setThumbnail(`${guild.iconURL()}`)
 .setDescription(`Command: server`)
 .addFields(
  { name: "Server Name", value: `\`\`\`${guild.name}\`\`\``},
  { name: "Server Id", value: `\`\`\`${guild.id}\`\`\`` },
  { name: "Create on", value: `\`\`\`${cre.toDateString()}\`\`\`` },
  { name: `Server Members [${total}]`, value: `\`\`\`Members: ${users} | Bots: ${bots}\`\`\`` },
  { name: 'Server Region', value: `\`\`\`${guild.region}\`\`\`` },
  { name: 'Server Owner', value: `\`\`\`${guild.owner.username}\`\`\``},
  { name: `Server Channels [${guild.channels.cache.size}]`, value: `\`\`\`Categories: ${categoryChannels} | Text: ${textChannels} | Voice: ${voiceChannels} \nAnnouncement: ${newsChannels} | Store: ${storeChannels}\`\`\`` },
  { name: `Server Roles [${guild.roles.cache.size}]`, value: `\`\`\`Highest: ${ro.highest.name}\`\`\`` },
  { name: "System", value: `\`\`\`${sc}\`\`\``}, { name: "Rule", value: `\`\`\`${rc}\`\`\``}
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
