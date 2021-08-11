const { prefix, by } = require("/home/asorinus/workspace/myFirstProject/splashy/SplashBot/config.json");
const Discord = require("discord.js");
function lala(msg, args) {
    if (!msg.member.hasPermission("MANAGE_CHANNELS")) return msg.channel.send(`You don't have the permission to manage channels, ${msg.author}`)
    if(!msg.guild.me.hasPermission("MANAGE_CHANNELS")) return msg.channel.send(`I dont have the permissions to manage channels, ${msg.author}`)
    const channel = msg.mentions.channels.first();
    const name = args.slice(1).join(" ");
    if (channel) {
        if (name) {
            channel.setName(`${name}`)
            const change = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle("RENAMED CHANNEL :file_folder::pencil2:")
            .setDescription("Channel")
            .addFields(
                { name: `The name of the channel ${channel.name} has changed`, value: `\`\`\`New channel name: ${name}\`\`\``}
            )
            .setFooter(`${by} helps`)
            msg.channel.send(change);
        } else {
            const noName = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle("WithersBot Commands")
            .setDescription("Command: namechannel")
            .addFields(
                { name: "No name", value: `I need a name in order to rename the channel`},
                { name: "Command:", value: `Change the name of a channel\n\`\`\`${prefix}namechannel [channel] [name]\`\`\``}
            )
            .setFooter(`${by} helps`)
            msg.channel.send(noName);
        }
} else {
    const noRole = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle("WithersBot Commands")
    .setDescription("Command: namechannel")
    .addFields(
        { name: `No channel`, value: `I need a channel in order to rename it`},
        { name: "Command:", value: `Change the name of a channel\n\`\`\`${prefix}namechannel [channel] [name]\`\`\`` }
    )
    .setFooter(`${by} helps`)
    msg.channel.send(noRole);
}
}

module.exports = {
    name: "namechannel",
    description: "Change the name of a channel",
    example: prefix + "namechannel [channel] [name]",
    type: "channel",
    execute(msg, args) {
        if (!msg.member.hasPermission("MANAGE_CHANNELS")) return msg.channel.send(`You don't have the permission to manage channels, ${msg.author}`)
        if(!msg.guild.me.hasPermission("MANAGE_CHANNELS")) return msg.channel.send(`I dont have the permissions to manage channels, ${msg.author}`)
        let authorid = msg.author.id;

        const filter1 = response1 => { return response1.author.id === authorid; }
    
        const Channel = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`${by} Commands`)
        .setDescription("Command: namechannel")
        .addFields(
          { name: "Channel Name", value: `I need a channel's name to continue` }
        )
        .setFooter(`${by} helps`)
    
        msg.channel.send(Channel).then(() => {
          msg.channel.awaitMessages(filter1, { max: 1 })
          .then(collected1 => {
            const response1 = collected1.first();
            const channel = response1.mentions.channels.first();
            let channelN = channel;
              if (!channel) {
                const noChannel = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setTitle(`${by} Commands`)
                .setDescription("Command: namechannel")
                .addFields(
                  { name: "No Channel", value: `I need a valid channel name` },
                  { name: "Canceled", value: `Wrong answer`}
                )
                .setFooter(`${by} helps`)
                return msg.channel.send(noChannel);
              }
      
            const filter2 = response2 => { return response2.author.id === authorid; }
    
            const Name = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`${by} Commands`)
            .setDescription("Command: namechannel")
            .addFields(
              { name: "Name", value: `I need a name to continue` }
            )
            .setFooter(`${by} helps`)
      
            msg.channel.send(Name).then(() => {
              msg.channel.awaitMessages(filter2, { max: 1 })
              .then(collected2 => {
                const response2 = collected2.first();
                const name = response2.content;
        
                channel.setName(`${name}`)
                const Name = new Discord.MessageEmbed()
                .setColor('RANDOM')
                .setTitle(`RENAMED CHANNEL :file_folder::pencil2:`)
                .setDescription('Channel')
                .addFields(
                    { name: "A channel has been renamed", value: `\`\`\`${channelN}\`\`\`` },
                    { name: "Name", value: `\`\`\`${name}\`\`\``}
                )
                .setFooter(`${by} helps`)
                msg.channel.send(Name);
              });
            })
            
          });
        })
    }
}