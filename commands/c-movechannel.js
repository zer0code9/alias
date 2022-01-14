const { prefix, by } = require("../config.json");
const { MessageEmbed, Permissions } = require('discord.js');
const { Timeout, Wronganswer, Perm, Cancel, Invalid, Unknown } = require("../errors");
async function moveChannel(msg, args, example) {
    const channel = msg.guild.channels.cache.get(args[0]) || msg.mentions.channels.first();
    const category = args[1];
    const position = args[2];

    if (!channel) return Invalid(msg, `No Channel`, `I need a channel in order to move it`, `${example}`);

    if (!category) return Invalid(msg, `No Category`, `I need a category in order to move the channel`, `${example}`);
    if (isNaN(category)) return Wronganswer(msg, `Not An ID`, `The category must be a sequence of number`);

    if (!position) return Invalid(msg, `No Position`, `I need a position in order to move the channel`, `${example}`);
    if (isNaN(position)) return Wronganswer(msg, `Not A Number`, `The position must be a number`);

    await channel.setParent(`${category}`);
    await channel.setPosition(`${position - 1}`);
    const Move = new MessageEmbed()
    .setColor("#00ff00")
    .setTitle(":white_check_mark: MOVED CHANNEL :file_folder::arrow_heading_up:")
    .setDescription("Channel")
    .addFields(
        { name: `A channel has been moved`, value: `\`\`\`${channel.name}\`\`\`` },
        { name: "New placement", value: `\`\`\`Category: ${msg.guild.channels.cache.get(category).name}\nPosition: ${position}\`\`\`` }
    )
    .setFooter(`${by} helps`)
    await msg.channel.send({ embeds: [Move] });
    msg.delete();
}

module.exports = {
    name: "movechannel",
    description: "Move the channel to a different place",
    example: prefix + "movechannel [channel] [category:id] [place]",
    type: "channel",
    execute(msg, args) {
        if (!msg.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) return Perm(msg, `No Permission`, `You don't have the permission to manage channels`);
        if (!msg.guild.me.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) return Perm(msg, `No Permission`, `I don't have the permission to manage channels`);
        if (args[0]) return moveChannel(msg, args, this.example);
        let authorid = msg.author.id;
        const filter = (m) => m.author.id === authorid;
    
        const Channel = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`${by} Commands`)
        .setDescription("Command: movechannel")
        .addFields(
            { name: "Channel Name", value: `I need a channel's name to continue` },
            { name: `Cancel Command`, value: `Type \`cancel\`` }
        )
        .setFooter(`${by} helps`)
    
        msg.channel.send({ embeds: [Channel] }).then(() => {
            msg.channel.awaitMessages({filter, max: 1 , time: 30000, errors: ['time']})
            .then(collected1 => {
                const response1 = collected1.first();
                if (response1.content == `cancel`) return Cancel(msg);
                const channel = msg.guild.channels.cache.get(response1.content) || response1.mentions.channels.first();
                if (!channel) return Wronganswer(msg, `No Channel`, `I need a valid channel name`);
    
                const Category = new MessageEmbed()
                .setColor("RANDOM")
                .setTitle(`${by} Commands`)
                .setDescription("Command: movechannel")
                .addFields(
                    { name: "Category", value: `I need a category id to continue` },
                    { name: `Cancel Command`, value: `Type \`cancel\`` }
                )
                .setFooter(`${by} helps`)
      
                msg.channel.send({ embeds: [Category] }).then(() => {
                    msg.channel.awaitMessages({filter, max: 1 , time: 30000, errors: ['time']})
                    .then(collected2 => {
                        const response2 = collected2.first();
                        if (response2.content == "cancel") return Cancel(msg);
                        const category = response2;
        
                        const Position = new MessageEmbed()
                        .setColor("RANDOM")
                        .setTitle(`${by} Commands`)
                        .setDescription("Command: movechannel")
                        .addFields(
                            { name: "Position", value: `I need a number to continue` },
                            { name: `Cancel Command`, value: `Type \`cancel\`` }
                        )
                        .setFooter(`${by} helps`)

                        msg.channel.send({ embeds: [Position] }).then(() => {
                            msg.channel.awaitMessages({filter, max: 1 , time: 30000, errors: ['time']})
                            .then(collected3 => {
                                const response3 = collected3.first();
                                if (response3.content == "cancel") return Cancel(msg);
                                const position = response3;

                                channel.setParent(`${category}`);
                                channel.setPosition(`${position - 1}`);
                                const Move = new MessageEmbed()
                                .setColor("#00ff00")
                                .setTitle(":white_check_mark: MOVED CHANNEL :file_folder::arrow_up_down:")
                                .setDescription("Channel")
                                .addFields(
                                    { name: `A channel has been moved`, value: `\`\`\`${channel.name}\`\`\``},
                                    { name: "New placement", value: `\`\`\`Category: ${msg.guild.channels.cache.get(category).name}\nPosition: ${position}\`\`\``}
                                )
                                .setFooter(`${by} helps`)
                                msg.channel.send({ embeds: [Move] });

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
            }).catch(error => {
                if (error == '[object Map]') Timeout(msg);
                else Unknown(msg);
            });
        })
    }
}