const { prefix, by } = require("./../config.json");
const Discord = require("discord.js");
const { Timeout, Wronganswer, Perm, Cancel, Invalid, Unknown } = require("../errors");
function moveChannel(msg, args) {
    if (!msg.member.hasPermission("MANAGE_CHANNELS")) return Perm(msg, `No Permission`, `You don't have the permission to manage channels`);
    if (!msg.guild.me.hasPermission("MANAGE_CHANNELS")) return Perm(msg, `No Permission`, `I don't have the permission to manage channels`);
    const channel = msg.mentions.channels.first();
    const category = args[1];
    const position = args[2];

    if (!channel) return Invalid(msg, `No Channel`, `I need a channel in order to move it`, `movechannel [channel] [category:id] [place]`);

    if (!category) return Invalid(msg, `No Category`, `I need a category in order to move the channel`, `movechannel [channel] [category:id] [place]`);

    if (!position) return Invalid(msg, `No Position`, `I need a position in order to move the channel`, `movechannel [channel] [category:id] [place]`);

    channel.setParent(`${category}`);
    channel.setPosition(`${position}`);
    const Move = new Discord.MessageEmbed()
    .setColor("#00ff00")
    .setTitle(":white_check_mark: :MOVED CHANNEL :file_folder::arrow_heading_up:")
    .setDescription("Channel")
    .addFields(
        { name: `A channel has changed place`, value: `\`\`\`${channel.name}\`\`\``},
        { name: "New placement", value: `\`\`\`Category: ${category.name} Position: ${position}\`\`\``}
    )
    .setFooter(`${by} helps`)
    msg.channel.send(Move);
}

module.exports = {
    name: "movechannel",
    description: "Move the channel to a different place",
    example: prefix + "movechannel [channel] [category:id] [place]",
    type: "channel",
    execute(msg, args) {
        if (args[0]) {return moveChannel(msg, args);}
        if (!msg.member.hasPermission("MANAGE_CHANNELS")) return Perm(msg, `No Permission`, `You don't have the permission to manage channels`);
        if (!msg.guild.me.hasPermission("MANAGE_CHANNELS")) return Perm(msg, `No Permission`, `I don't have the permission to manage channels`);
        let authorid = msg.author.id;

        const filter1 = response1 => { return response1.author.id === authorid; }
    
        const Channel = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`${by} Commands`)
        .setDescription("Command: movechannel")
        .addFields(
            { name: "Channel Name", value: `I need a channel's name to continue` },
            { name: `Type \`cancel\` to cancel the command` }
        )
        .setFooter(`${by} helps`)
    
        msg.channel.send(Channel).then(() => {
            msg.channel.awaitMessages(filter1, { max: 1 , time: 30000, errors: ['time']})
            .then(collected1 => {
                const response1 = collected1.first();
                if (response1 == `cancel`) return Cancel(msg);
                const channel = response1.mentions.channels.first();
                if (!channel) return Wronganswer(msg, `No Channel`, `I need a valid channel name`)
      
                const filter2 = response2 => { return response2.author.id === authorid; }
    
                const Category = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setTitle(`${by} Commands`)
                .setDescription("Command: movechannel")
                .addFields(
                    { name: "Category", value: `I need a category id to continue` },
                    { name: `Type \`cancel\` to cancel the command` }
                )
                .setFooter(`${by} helps`)
      
                msg.channel.send(Category).then(() => {
                    msg.channel.awaitMessages(filter2, { max: 1 , time: 30000, errors: ['time']})
                    .then(collected2 => {
                        const response2 = collected2.first();
                        if (response1.content == "cancel") return Cancel(msg);
                        const category = response2.content;

                        const filter2 = response3 => { return response3.author.id === authorid; }
        
                        const Position = new Discord.MessageEmbed()
                        .setColor("RANDOM")
                        .setTitle(`${by} Commands`)
                        .setDescription("Command: movechannel")
                        .addFields(
                            { name: "Position", value: `I need a number to continue` },
                            { name: `Type \`cancel\` to cancel the command` }
                        )
                        .setFooter(`${by} helps`)

                        msg.channel.send(Position).then(() => {
                            msg.channel.awaitMessages(filter2, { max: 1 , time: 30000, errors: ['time']})
                            .then(collected3 => {
                                const response3 = collected3.first();
                                if (response1.content == "cancel") return Cancel(msg);
                                const position = response3.content;

                                channel.setParent(`${category}`);
                                channel.setPosition(`${position}`);
                                const move = new Discord.MessageEmbed()
                                .setColor("#00ff00")
                                .setTitle(":white_check_mark: MOVED CHANNEL :file_folder::arrow_up_down:")
                                .setDescription("Channel")
                                .addFields(
                                    { name: `A channel has changed place`, value: `\`\`\`${channel.name}\`\`\``},
                                    { name: "New placement", value: `\`\`\`Category: ${category.name} Position: ${position}\`\`\``}
                                )
                                .setFooter(`${by} helps`)
                                msg.channel.send(move);

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