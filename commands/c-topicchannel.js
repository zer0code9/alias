const { prefix, by } = require("./../config.json");
const Discord = require("discord.js");
const { Timeout, Wronganswer, Perm, Cancel } = require("../errors");
function topicChannel(msg, args) {
    if (!msg.member.hasPermission("MANAGE_CHANNELS")) return Perm(msg, `No Permission`, `You don't have the permission to manage channels`);
    if (!msg.guild.me.hasPermission("MANAGE_CHANNELS")) return Perm(msg, `No Permission`, `I don't have the permission to manage channels`);
    const channel = msg.mentions.channels.first();
    const topic = args.slice(1).join(" ");

    const noChannel = new Discord.MessageEmbed()
    .setColor("#ff0000")
    .setTitle(`:warning: CANCELED :warning:`)
    .addFields(
        { name: "No channel", value: `I need a channel in order to change its topic`},
        { name: "Command:", value: `\`${prefix}topicchannel [channel] [topic]\``}
    )
    .setFooter(`${by} helps`)
    if (!channel) return msg.channel.send(noChannel);

    const noTopic = new Discord.MessageEmbed()
    .setColor("#ff0000")
    .setTitle(`:warning: CANCELED :warning:`)
    .addFields(
        { name: "No topic", value: `I need a topic in order to change the topic of the channel`},
        { name: "Command:", value: `\`${prefix}topicchannel [channel] [topic]\``}
    )
    .setFooter(`${by} helps`)
    if (!topic) return msg.channel.send(noTopic);

    channel.setTopic(`${topic}`)
    const Topic = new Discord.MessageEmbed()
    .setColor("#00ff00")
    .setTitle(":white_check_mark: CHANGED TOPIC :file_folder::pencil:")
    .setDescription("Channel")
    .addFields(
        { name: "A channel has been changed its topic", value: `\`\`\`${channel.name}\`\`\`` },
        { name: "Topic sentence", value: `\`\`\`${topic}\`\`\``}
    )
    .setFooter(`${by} helps`)
    msg.channel.send(Topic);
}

module.exports = {
    name: "topicchannel",
    description: "Change the topic of a channel",
    example: prefix + "topicchannel [channel] [topic]",
    type: "channel",
    execute(msg, args) {
        if (args[0]) {return topicChannel(msg, args)}
        if (!msg.member.hasPermission("MANAGE_CHANNELS")) return Perm(msg, `No Permission`, `You don't have the permission to manage channels`);
        if (!msg.guild.me.hasPermission("MANAGE_CHANNELS")) return Perm(msg, `No Permission`, `I don't have the permission to manage channels`);
        let authorid = msg.author.id;

        const filter1 = response1 => { return response1.author.id === authorid; }
    
        const Channel = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`${by} Commands`)
        .setDescription("Command: topicchannel")
        .addFields(
            { name: "Channel Name", value: `I need a channel's name to continue` },
            { name: `Type \`cancel\` to cancel the command` }
        )
        .setFooter(`${by} helps`)
    
        msg.channel.send(Channel).then(() => {
            msg.channel.awaitMessages(filter1, { max: 1 , time: 30000, errors: ['time']})
            .then(collected1 => {
                const response1 = collected1.first();
                if (response1.toLowerCase() == `cancel`) return Cancel(msg);
                const channel = response1.mentions.channels.first();
                if (!channel) return Wronganswer(msg, `No Channel`, `I need a valid channel name`)
      
                const filter2 = response2 => { return response2.author.id === authorid; }
    
                const Topic = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setTitle(`${by} Commands`)
                .setDescription("Command: topicchannel")
                .addFields(
                    { name: "Name", value: `I need a topic sentence to continue` },
                    { name: `Type \`cancel\` to cancel the command` }
                )
                .setFooter(`${by} helps`)
      
                msg.channel.send(Topic).then(() => {
                    msg.channel.awaitMessages(filter2, { max: 1 , time: 30000, errors: ['time']})
                    .then(collected2 => {
                        const response2 = collected2.first();
                        if (response2.toLowerCase() == `cancel`) return Cancel(msg);
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
                        Timeout(msg);
                    });
                })
            }).catch(error => {
                Timeout(msg);
            });
        })
    }
}