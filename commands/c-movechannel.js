const { prefix, by } = require("/home/asorinus/workspace/myFirstProject/splashy/SplashBot/config.json");
const Discord = require("discord.js");
function moveChannel(msg, args) {
    if (!msg.member.hasPermission("MANAGE_CHANNELS")) return msg.channel.send(`You don't have the permission to manage channels, ${msg.author}`)
    if (!msg.guild.me.hasPermission("MANAGE_CHANNELS")) return msg.channel.send(`I dont have the permissions to manage channels, ${msg.author}`)
    const channel = msg.mentions.channels.first();
    const category = args[1];
    const position = args[2];

    const noChannel = new Discord.MessageEmbed()
    .setColor("#ff0000")
    .setTitle(`:warning: CANCELED :warning:`)
    .addFields(
        { name: "No Channel", value: `I need a channel in order to move it`},
        { name: "Command", value: `\`${prefix}movechannel [channel] [category:id] [place]\``}
    )
    .setFooter(`${by} helps`)
    if (!channel) return msg.channel.send(noChannel);

    const noCategory = new Discord.MessageEmbed()
    .setColor("#ff0000")
    .setTitle(`:warning: CANCELED :warning:`)
    .addFields(
        { name: "No Category", value: `I need a category in order to move the channel`},
        { name: "Command", value: `\`${prefix}movechannel [channel] [category:id] [place]\``}
    )
    .setFooter(`${by} helps`)
    if (!category) return msg.channel.send(noCategory);

    const noPosition = new Discord.MessageEmbed()
    .setColor("#ff0000")
    .setTitle(`:warning: CANCELED :warning:`)
    .addFields(
        { name: "No Position", value: `I need a position in order to move the channel`},
        { name: "Command", value: `\`${prefix}movechannel [channel] [category:id] [place]\``}
    )
    .setFooter(`${by} helps`)
    if (!position) return msg.channel.send(noPosition);

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
        if (!msg.member.hasPermission("MANAGE_CHANNELS")) return msg.channel.send(`You don't have the permission to manage channels, ${msg.author}`)
        if (!msg.guild.me.hasPermission("MANAGE_CHANNELS")) return msg.channel.send(`I dont have the permissions to manage channels, ${msg.author}`)
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
                        { name: "Canceled", value: `Wrong answer cancelation`}
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
                    { name: "Category", value: `I need a category id to continue` }
                )
                .setFooter(`${by} helps`)
      
                msg.channel.send(Category).then(() => {
                    msg.channel.awaitMessages(filter2, { max: 1 , time: 30000, errors: ['time']})
                    .then(collected2 => {
                        const response2 = collected2.first();
                        const category = response2.content;

                        const filter2 = response3 => { return response3.author.id === authorid; }
        
                        const Position = new Discord.MessageEmbed()
                        .setColor("RANDOM")
                        .setTitle(`${by} Commands`)
                        .setDescription("Command: movechannel")
                        .addFields(
                            { name: "Position", value: `I need a number to continue` }
                        )
                        .setFooter(`${by} helps`)

                        msg.channel.send(Position).then(() => {
                            msg.channel.awaitMessages(filter2, { max: 1 , time: 30000, errors: ['time']})
                            .then(collected3 => {
                                const response3 = collected3.first();
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