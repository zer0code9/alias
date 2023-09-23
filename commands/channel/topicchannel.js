const { prefix, by } = require("../../config.json");
const { MessageEmbed } = require('discord.js');
const { Timeout, Wronganswer, Perm, Cancel, Invalid, Unknown } = require("../../errors");
async function topicChannel(msg, args, example) {
    if (!msg.member.permissions.has("MANAGE_CHANNELS")) return Perm(msg, `No Permission`, `You don't have the permission to manage channels`);
    if (!msg.guild.me.permissions.has("MANAGE_CHANNELS")) return Perm(msg, `No Permission`, `I don't have the permission to manage channels`);
    const channel = msg.guild.channels.cache.get(args[0]) || msg.mentions.channels.first();
    const topic = args.slice(1).join(" ");

    if (!channel) return Invalid(msg, `No Channel`, `I need a channel in order to change its topic \n(mention:channel or channel:id)`, `${example}`);
    if (!topic) return Invalid(msg, `No Topic`, `I need a topic in order to change the topic of the channel \n(phrase)`, `${example}`);

    await channel.setTopic(`${topic}`)
    const Topic = new MessageEmbed()
    .setColor("#00ff00")
    .setTitle(":white_check_mark: CHANGED CHANNEL TOPIC :file_folder::pencil:")
    .setDescription("Channel")
    .addFields(
        { name: "A channel has been changed its topic", value: `\`\`\`${channel.name}\`\`\`` },
        { name: "Topic sentence", value: `\`\`\`${topic}\`\`\``}
    )
    .setFooter({ text: `${by} helps` })
    await msg.channel.send({ embeds: [Topic] });
    msg.delete();
}

module.exports = {
    name: "topicchannel",
    description: "Change the topic of a channel",
    example: prefix + "topicchannel [channel:ch|id] [topic:p]",
    type: "channel",
    execute(msg, args) {
        if (!msg.member.permissions.has("MANAGE_CHANNELS")) return Perm(msg, `No Permission`, `You don't have the permission to manage channels`);
        if (!msg.guild.me.permissions.has("MANAGE_CHANNELS")) return Perm(msg, `No Permission`, `I don't have the permission to manage channels`);
        const example = this.example;
        if (args[0]) return topicChannel(msg, args, example);
        const filter = (m) => m.author.id === msg.author.id;
    
        const Channel = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`${by} Commands`)
        .setDescription("Command: topicchannel")
        .addFields(
            { name: "Channel Name", value: `I need a channel's name to continue \n(mention:channel or channel:id)` },
            { name: `Cancel Command`, value: `Type \`cancel\`` }
        )
        .setFooter({ text: `${by} helps` })
    
        msg.channel.send({ embeds: [Channel] }).then(() => {
            msg.channel.awaitMessages(filter, { max: 1 , time: 30000, errors: ['time']})
            .then(collected1 => {
                const response1 = collected1.first();
                if (response1.content == `cancel`) return Cancel(msg);
                const channel = msg.guild.channels.cache.get(response1.content) || response1.mentions.channels.first();
                if (!channel) return Invalid(msg, `No Channel`, `I need a channel in order to change its topic \n(mention:channel or channel:id)`, `${example}`);
    
                const Topic = new MessageEmbed()
                .setColor("RANDOM")
                .setTitle(`${by} Commands`)
                .setDescription("Command: topicchannel")
                .addFields(
                    { name: "Name", value: `I need a topic sentence to continue \n(phrase)` },
                    { name: `Cancel Command`, value: `Type \`cancel\`` }
                )
                .setFooter({ text: `${by} helps` })
      
                msg.channel.send({ embeds: [Topic] }).then(() => {
                    msg.channel.awaitMessages(filter, { max: 1 , time: 30000, errors: ['time']})
                    .then(collected2 => {
                        const response2 = collected2.first();
                        if (response2.content == `cancel`) return Cancel(msg);
                        const topic = response2;
                        if (!topic) return Invalid(msg, `No Topic`, `I need a topic in order to change the topic of the channel \n(phrase)`, `${example}`);
        
                        channel.setTopic(`${topic}`)
                        const Topic = new MessageEmbed()
                        .setColor('#00ff00')
                        .setTitle(`:white_check_mark: CHANGED CHANNEL TOPIC :file_folder::pencil:`)
                        .setDescription('Channel')
                        .addFields(
                            { name: "A channel has been changed its topic", value: `\`\`\`${channel.name}\`\`\`` },
                            { name: "Topic sentence", value: `\`\`\`${topic}\`\`\``}
                        )
                        .setFooter({ text: `${by} helps` })
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