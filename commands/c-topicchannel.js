const { prefix, by } = require("./../config.json");
const { MessageEmbed } = require('discord.js');
const { Timeout, Wronganswer, Perm, Cancel, Unknown } = require("../errors");
function topicChannel(msg, args, example) {
    if (!msg.member.permissions.has("MANAGE_CHANNELS")) return Perm(msg, `No Permission`, `You don't have the permission to manage channels`);
    if (!msg.guild.me.permissions.has("MANAGE_CHANNELS")) return Perm(msg, `No Permission`, `I don't have the permission to manage channels`);
    const channel = msg.mentions.channels.first();
    const topic = args.slice(1).join(" ");

    if (!channel) return Invalid(msg, `No Channel`, `I need a channel in order to change its topic`, `${example}`);

    if (!topic) return Invalid(msg, `No Topic`, `I need a topic in order to change the topic of the channel`, `${example}`);

    channel.setTopic(`${topic}`)
    const Topic = new MessageEmbed()
    .setColor("#00ff00")
    .setTitle(":white_check_mark: CHANGED TOPIC :file_folder::pencil:")
    .setDescription("Channel")
    .addFields(
        { name: "A channel has been changed its topic", value: `\`\`\`${channel.name}\`\`\`` },
        { name: "Topic sentence", value: `\`\`\`${topic}\`\`\``}
    )
    .setFooter(`${by} helps`)
    msg.channel.send({ embeds: [Topic] });
}

module.exports = {
    name: "topicchannel",
    description: "Change the topic of a channel",
    example: prefix + "topicchannel [channel] [topic]",
    type: "channel",
    execute(msg, args) {
        if (args[0]) return topicChannel(msg, args, this.example);
        if (!msg.member.permissions.has("MANAGE_CHANNELS")) return Perm(msg, `No Permission`, `You don't have the permission to manage channels`);
        if (!msg.guild.me.permissions.has("MANAGE_CHANNELS")) return Perm(msg, `No Permission`, `I don't have the permission to manage channels`);
        let authorid = msg.author.id;
        const filter = (m) => m.author.id === authorid;
    
        const Channel = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`${by} Commands`)
        .setDescription("Command: topicchannel")
        .addFields(
            { name: "Channel Name", value: `I need a channel's name to continue` },
            { name: `Cancel Command`, value: `Type \`cancel\`` }
        )
        .setFooter(`${by} helps`)
    
        msg.channel.send({ embeds: [Channel] }).then(() => {
            msg.channel.awaitMessages(filter, { max: 1 , time: 30000, errors: ['time']})
            .then(collected1 => {
                const response1 = collected1.first();
                if (response1.content == "cancel") return Cancel(msg);
                const channel = response1.mentions.channels.first();
                if (!channel) return Wronganswer(msg, `No Channel`, `I need a valid channel name`);
    
                const Topic = new MessageEmbed()
                .setColor("RANDOM")
                .setTitle(`${by} Commands`)
                .setDescription("Command: topicchannel")
                .addFields(
                    { name: "Name", value: `I need a topic sentence to continue` },
                    { name: `Cancel Command`, value: `Type \`cancel\`` }
                )
                .setFooter(`${by} helps`)
      
                msg.channel.send({ embeds: [Topic] }).then(() => {
                    msg.channel.awaitMessages(filter, { max: 1 , time: 30000, errors: ['time']})
                    .then(collected2 => {
                        const response2 = collected2.first();
                        if (response2.content == "cancel") return Cancel(msg);
                        const topic = response2.content;
        
                        channel.setTopic(`${topic}`)
                        const Topic = new MessageEmbed()
                        .setColor('#00ff00')
                        .setTitle(`:white_check_mark: CHANGED CHANNEL TOPIC :file_folder::pencil:`)
                        .setDescription('Channel')
                        .addFields(
                            { name: "A channel has been changed its topic", value: `\`\`\`${channel.name}\`\`\`` },
                            { name: "Topic sentence", value: `\`\`\`${topic}\`\`\``}
                        )
                        .setFooter(`${by} helps`)
                        msg.channel.send({ embeds: [Topic] });

                    }).catch(error => {
                        if (error == '[object Map]') Timeout(msg);
                        else Unknown(msg);
                    });
                })
            }).catch(error => {
                if (error == '[object Map]') Timeout(msg);
                else Unknown(msg);
            });
        })
    }
}