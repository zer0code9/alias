const { prefix, by } = require("./../config.json");
const Discord = require("discord.js");
const { Timeout, Wronganswer, Cancel } = require("../errors");
function delChannel(msg, args) {
    if (!msg.member.hasPermission("MANAGE_CHANNELS")) return msg.channel.send(`You don't have the permission to manage channels, ${msg.author}`)
    if (!msg.guild.me.hasPermission("MANAGE_CHANNELS")) return msg.channel.send(`I dont have the permission to manage channels, ${msg.author}`)
    const channel = msg.mentions.channels.first();
    let reason = args.slice(1).join(" ");

    const noChannel = new Discord.MessageEmbed()
    .setColor('#ff0000')
    .setTitle(`:warning: CANCELED :warning:`)
    .addFields(
        { name: "No Channel", value: `I need a channel in order to delete it`},
        { name: "Command:", value: `\`${prefix}delchannel [channel]\``}
    )
    .setFooter(`${by} helps`)
    if (!channel) return msg.channel.send(noChannel);

    if (!reason) reason = "No reason";

    channel.delete();
    const Remove = new Discord.MessageEmbed()
    .setColor('#00ff00')
    .setTitle(`:white_check_mark: :DELETED CHANNEL :file_folder::heavy_minus_sign:`)
    .setDescription('Channel')
    .addFields(
        { name: "A channel has been deleted", value: `\`\`\`${args[0]}\`\`\`` },
        { name: "Reason", value: `\`\`\`${reason}\`\`\``}
    )
    .setFooter(`${by} helps`)
    msg.channel.send(Remove);
}
module.exports = {
    name: "delchannel",
    description: "Delete a channel",
    example: prefix + "delchannel [channel]",
    type: "channel",
    execute(msg, args) {
        if (args[0]) {return delChannel(msg, args)}
        if (!msg.member.hasPermission("MANAGE_CHANNELS")) return msg.channel.send(`You don't have the permission to manage channels, ${msg.author}`)
        if (!msg.guild.me.hasPermission("MANAGE_CHANNELS")) return msg.channel.send(`I dont have the permission to manage channels, ${msg.author}`)
        let authorid = msg.author.id;

        const filter1 = response1 => { return response1.author.id === authorid; }
    
        const Channel = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`${by} Commands`)
        .setDescription("Command: delchannel")
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
                let channelN = channel.name;
                if (!channel) return Wronganswer(msg, `No Channel`, `I need a valid channel name`);
      
                const filter2 = response2 => { return response2.author.id === authorid; }
    
                const Reason = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setTitle(`${by} Commands`)
                .setDescription("Command: delchannel")
                .addFields(
                    { name: "Reason", value: `I need a reason to continue` },
                    { name: `Type \`cancel\` to cancel the command` }
                )
                .setFooter(`${by} helps`)
      
                msg.channel.send(Reason).then(() => {
                    msg.channel.awaitMessages(filter2, { max: 1 , time: 30000, errors: ['time']})
                    .then(collected2 => {
                        const response2 = collected2.first();
                        if (response2.toLowerCase() == `cancel`) return Cancel(msg);
                        const reason = response2.content;
        
                        channel.delete();
                        const Remove = new Discord.MessageEmbed()
                        .setColor('#00ff00')
                        .setTitle(`:white_check_mark: DELETED CHANNEL :file_folder::heavy_minus_sign:`)
                        .setDescription('Channel')
                        .addFields(
                            { name: "A channel has been deleted", value: `\`\`\`${channelN}\`\`\`` },
                            { name: "Reason", value: `\`\`\`${reason}\`\`\``}
                        )
                        .setFooter(`${by} helps`)
                        msg.channel.send(Remove);

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