const { prefix, by } = require("/home/asorinus/workspace/myFirstProject/splashy/SplashBot/config.json");
const Discord = require("discord.js");
function topicChannel(msg, args) {
    if (!msg.member.hasPermission("MANAGE_CHANNELS")) return msg.channel.send(`You don't have the permission to manage channels, ${msg.author}`)
    if(!msg.guild.me.hasPermission("MANAGE_CHANNELS")) return msg.channel.send(`I dont have the permissions to manage channels, ${msg.author}`)
    const channel = msg.mentions.channels.first();
    const topic = args.slice(1).join(" ");
    if (channel) {
        if (topic) {
            channel.setTopic(`${topic}`)
            const change = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle("CHANGED TOPIC :file_folder::pencil:")
            .setDescription("Command: topicchannel")
            .addFields(
                { name: `The topic of the channel ${channel.name} has changed`, value: `The new topic: ${topic}`}
            )
            .setFooter("WithersBot helps")
            msg.channel.send(change);
        } else {
            const noTopic = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle("WithersBot Commands")
            .setDescription("Command: movechannel")
            .addFields(
                { name: "No topic", value: `I need a topic in order to change the topic of the channel`},
                { name: "Command:", value: `Change the topic of a channel\n\`\`\`${prefix}topicchannel [channel] [topic]\`\`\``}
            )
            .setFooter("WithersBot helps")
            msg.channel.send(noTopic);
        }
    } else {

        const noChannel = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("WithersBot Commands")
        .setDescription("Command: topicchannel")
        .addFields(
            { name: "No channel", value: `I need a channel in order to change its topic`},
            { name: "Command:", value: `Change the topic of a channel\n\`\`\`${prefix}topicchannel [channel] [topic]\`\`\``}
        )
        .setFooter("WithersBot helps")
        msg.channel.send(noChannel);
    }
}

module.exports = {
    name: "topicchannel",
    description: "Change the topic of a channel",
    example: prefix + "topicchannel [channel] [topic]",
    type: "channel",
    execute(msg, args) {
        if (args[0]) {return topicChannel(msg, args)}
        if (!msg.member.hasPermission("MANAGE_CHANNELS")) return msg.channel.send(`You don't have the permission to manage channels, ${msg.author}`)
        if(!msg.guild.me.hasPermission("MANAGE_CHANNELS")) return msg.channel.send(`I dont have the permissions to manage channels, ${msg.author}`)
        let authorid = msg.author.id;

        const filter1 = response1 => { return response1.author.id === authorid; }
    
        const Channel = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`${by} Commands`)
        .setDescription("Command: topicchannel")
        .addFields(
            { name: "Channel Name", value: `I need a channel's name to continue` }
        )
        .setFooter(`${by} helps`)
    
        msg.channel.send(Channel).then(() => {
            msg.channel.awaitMessages(filter1, { max: 1 , time: 30000, errors: ['time']})
            .then(collected1 => {
                const response1 = collected1.first();
                const channel = response1.mentions.channels.first();
                if (!channel) {
                    const noChannel = new Discord.MessageEmbed()
                    .setColor("#ff0000")
                    .setTitle(`:warning: CANCELED :warning:`)
                    .addFields(
                    { name: "No Channel", value: `I need a valid channel name` },
                    { name: "Command Canceled", value: `Wrong answer cancelation`}
                    )
                    .setFooter(`${by} helps`)
                    return msg.channel.send(noChannel);
                }
      
                const filter2 = response2 => { return response2.author.id === authorid; }
    
                const Topic = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setTitle(`${by} Commands`)
                .setDescription("Command: topicchannel")
                .addFields(
                { name: "Name", value: `I need a topic sentence to continue` }
                )
                .setFooter(`${by} helps`)
      
                msg.channel.send(Topic).then(() => {
                    msg.channel.awaitMessages(filter2, { max: 1 , time: 30000, errors: ['time']})
                    .then(collected2 => {
                        const response2 = collected2.first();
                        const topic = response2.content;
        
                        channel.setTopic(`${topic}`)
                        const Topic = new Discord.MessageEmbed()
                        .setColor('#00ff00')
                        .setTitle(`:white_check_mark: CHANGED CHANNEL TOPIC :file_folder::pencil:`)
                        .setDescription('Channel')
                        .addFields(
                            { name: "A channel has been changed its topic", value: `\`\`\`${channel.name}\`\`\`` },
                            { name: "Topic sentence", value: `\`\`\`${topic}\`\`\``}
                        )
                        .setFooter(`${by} helps`)
                        msg.channel.send(Topic);

                    }).catch(error => {
                        const Error = new Discord.MessageEmbed()
                        .setColor("#ff0000")
                        .setTitle(":x: CANCELED :x:")
                        .addFields(
                            { name: "Command Canceled", value: `Timeout cancelation`}
                        )
                        .setFooter(`${by} helps`)
                        msg.channel.send(Error);  
                    });
                })
            }).catch(error => {
                const Error = new Discord.MessageEmbed()
                .setColor("#ff0000")
                .setTitle(":x: CANCELED :x:")
                .addFields(
                    { name: "Command Canceled", value: `Timeout cancelation`}
                )
                .setFooter(`${by} helps`)
                msg.channel.send(Error);  
            });
        })
    }
}