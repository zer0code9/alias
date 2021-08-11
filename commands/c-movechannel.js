const { prefix, by } = require("/home/asorinus/workspace/myFirstProject/splashy/SplashBot/config.json");
const Discord = require("discord.js");
function moveChannel(msg, args) {
    if (!msg.member.hasPermission("MANAGE_CHANNELS")) return msg.channel.send(`You don't have the permission to manage channels, ${msg.author}`)
    if(!msg.guild.me.hasPermission("MANAGE_CHANNELS")) return msg.channel.send(`I dont have the permissions to manage channels, ${msg.author}`)
    const channel = msg.mentions.channels.first();
    const category = args[1];
    const position = args[2];
    if (channel) {
        if (category) {
            if (position) {
                channel.setParent(`${category}`);
                channel.setPosition(`${position}`);
                const yes = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setTitle("MOVED CHANNEL :file_folder::arrow_heading_up:")
                .setDescription("Channel")
                .addFields(
                    { name: `The channel has changed places`, value: `\`\`\`Category: ${category} Position: ${position}\`\`\``}
                )
                .setFooter(`${by} helps`)
                msg.channel.send(yes);
            } else {
                const noPosition = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setTitle(`${by} Commands`)
                .setDescription("Command: movechannel")
                .addFields(
                    { name: "No Position", value: `I need a position in order to move the channel`},
                    { name: "Command", value: `Move the channel to a different place\n\`\`\`${prefix}movechannel [channel] [category:id] [place]\`\`\``}
                )
                .setFooter(`${by} helps`)
                msg.channel.send(noPosition);
            }
        } else {
            const noCategory = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`${by} Commands`)
            .setDescription("Command: movechannel")
            .addFields(
                { name: "No Category", value: `I need a category in order to move the channel`},
                { name: "Command", value: `Move the channel to a different place\n\`\`\`${prefix}movechannel [channel] [category:id] [place]\`\`\``}
            )
            .setFooter(`${by} helps`)
            msg.channel.send(noCategory);
        }
    } else {
            
        const noChannel = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`${by} Commands`)
        .setDescription("Command: movechannel")
        .addFields(
            { name: "No Channel", value: `I need a channel in order to move it`},
            { name: "Command", value: `Move the channel to a different place\n\`\`\`${prefix}movechannel [channel] [category:id] [place]\`\`\``}
        )
        .setFooter(`${by} helps`)
        msg.channel.send(noChannel);
    }
}

module.exports = {
    name: "movechannel",
    description: "Move the channel to a different place",
    example: prefix + "movechannel [channel] [category:id] [place]",
    type: "channel",
    execute(msg, args) {
        if (!msg.member.hasPermission("MANAGE_CHANNELS")) return msg.channel.send(`You don't have the permission to manage channels, ${msg.author}`)
        if(!msg.guild.me.hasPermission("MANAGE_CHANNELS")) return msg.channel.send(`I dont have the permissions to manage channels, ${msg.author}`)
        let authorid = msg.author.id;

        const filter1 = response1 => { return response1.author.id === authorid; }
    
        const Channel = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`${by} Commands`)
        .setDescription("Command: movechannel")
        .addFields(
          { name: "Channel Name", value: `I need a channel's name to continue` }
        )
        .setFooter(`${by} helps`)
    
        msg.channel.send(Channel).then(() => {
          msg.channel.awaitMessages(filter1, { max: 1 })
          .then(collected1 => {
            const response1 = collected1.first();
            const channel = response1.mentions.channels.first();
              if (!channel) {
                const noChannel = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setTitle(`${by} Commands`)
                .setDescription("Command: movechannel")
                .addFields(
                  { name: "No Channel", value: `I need a valid channel name` },
                  { name: "Canceled", value: `Wrong answer`}
                )
                .setFooter(`${by} helps`)
                return msg.channel.send(noChannel);
              }
      
            const filter2 = response2 => { return response2.author.id === authorid; }
    
            const Category = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`${by} Commands`)
            .setDescription("Command: movechannel")
            .addFields(
              { name: "Reason", value: `I need a reason to continue` }
            )
            .setFooter(`${by} helps`)
      
            msg.channel.send(Category).then(() => {
              msg.channel.awaitMessages(filter2, { max: 1 })
              .then(collected2 => {
                const response2 = collected2.first();
                const category = response2.content;

                const filter2 = response3 => { return response3.author.id === authorid; }
        
                const Position = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setTitle(`${by} Commands`)
                .setDescription("Command: movechannel")
                .addFields(
                  { name: "Reason", value: `I need a reason to continue` }
                )
                .setFooter(`${by} helps`)

                msg.channel.send(Position).then(() => {
                    msg.channel.awaitMessages(filter2, { max: 1 })
                    .then(collected3 => {
                      const response3 = collected3.first();
                      const position = response3.content;

                      channel.setParent(`${category}`);
                      channel.setPosition(`${position}`);
                      const move = new Discord.MessageEmbed()
                      .setColor("RANDOM")
                      .setTitle("MOVED CHANNEL :file_folder::arrow_up_down:")
                      .setDescription("Channel")
                      .addFields(
                          { name: `The channel has changed places`, value: `\`\`\`Category: ${category} Position: ${position}\`\`\``}
                      )
                      .setFooter(`${by} helps`)
                      msg.channel.send(move);
                    });
                })
            
              });
            })
        })
})
    }
}