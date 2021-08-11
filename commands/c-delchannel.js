const { prefix, by } = require("./../config.json");
const Discord = require("discord.js");
function cdel(msg, args) {
    if (!msg.member.hasPermission("MANAGE_CHANNELS")) return msg.channel.send(`You don't have the permission to manage channels, ${msg.author}`)
    if(!msg.guild.me.hasPermission("MANAGE_CHANNELS")) return msg.channel.send(`I dont have the permission to manage channels, ${msg.author}`)
    const channel = msg.mentions.channels.first();
    var reason = args.slice(1).join(" ");
    if (channel) {
        if (!reason) return reason = "No reason"
        channel.delete();
        const remove = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle(`DELETED CHANNEL :file_folder::heavy_minus_sign:`)
        .setDescription('Channel')
        .addFields(
            { name: "A channel has been deleted", value: `\`\`\`${args}\`\`\`` },
            { name: "Reason", value: `\`\`\`${reason}\`\`\``}
        )
        .setFooter(`${by} helps`)
        msg.channel.send(remove);
    } else {
        const noDelete = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle(`${by} Commands`)
        .setDescription('Command: delchannel')
        .addFields(
            { name: "No Channel", value: `I need a channel in order to delete it`},
            { name: "Command:", value: `Delete a channel\n\`\`\`${prefix}delchannel [channel]\`\`\``}
        )
        .setFooter(`${by} helps`)
        msg.channel.send(noDelete);
    }
}
module.exports = {
    name: "delchannel",
    description: "Delete a channel",
    example: prefix + "delchannel [channel]",
    type: "channel",
    execute(msg, args) {
        if (!msg.member.hasPermission("MANAGE_CHANNELS")) return msg.channel.send(`You don't have the permission to manage channels, ${msg.author}`)
        if(!msg.guild.me.hasPermission("MANAGE_CHANNELS")) return msg.channel.send(`I dont have the permission to manage channels, ${msg.author}`)
        let authorid = msg.author.id;

    const filter1 = response1 => { return response1.author.id === authorid; }

    const channel = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle(`${by} Commands`)
    .setDescription("Command: delchannel")
    .addFields(
      { name: "Channel Name", value: `I need a channel's name to continue` }
    )
    .setFooter(`${by} helps`)

    msg.channel.send(channel).then(() => {
      msg.channel.awaitMessages(filter1, { max: 1 })
      .then(collected1 => {
        const response1 = collected1.first();
        let Channel = response1.mentions.channels.first();
        let ChannelN = Channel;
          if (!Channel) {
            const noChannel = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`${by} Commands`)
            .setDescription("Command: delchannel")
            .addFields(
              { name: "No Channel", value: `I need a valid channel name` },
              { name: "Canceled", value: `Wrong answer`}
            )
            .setFooter(`${by} helps`)
            return msg.channel.send(noChannel);
          }
  
        const filter2 = response2 => { return response2.author.id === authorid; }

        const reason = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`${by} Commands`)
        .setDescription("Command: delchannel")
        .addFields(
          { name: "Reason", value: `I need a reason to continue` }
        )
        .setFooter(`${by} helps`)
  
        msg.channel.send(reason).then(() => {
          msg.channel.awaitMessages(filter2, { max: 1 })
          .then(collected2 => {
            const response2 = collected2.first();
            let Reason = response2.content;
    
            Channel.delete();
            const remove = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTitle(`DELETED CHANNEL :file_folder::heavy_minus_sign:`)
            .setDescription('Channel')
            .addFields(
                { name: "A channel has been deleted", value: `\`\`\`${ChannelN}\`\`\`` },
                { name: "Reason", value: `\`\`\`${Reason}\`\`\``}
            )
            .setFooter(`${by} helps`)
            msg.channel.send(remove);
          });
        })
        
      });
    })
    }
}