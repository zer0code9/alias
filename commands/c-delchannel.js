const { prefix, by } = require("./../config.json");
const Discord = require("discord.js");
const { Timeout, Wronganswer, Perm, Cancel, Invalid, Unknown } = require("../errors");
function delChannel(msg, args) {
    if (!msg.member.hasPermission("MANAGE_CHANNELS")) return Perm(msg, `No Permission`, `You don't have the permission to manage channels`);
    if (!msg.guild.me.hasPermission("MANAGE_CHANNELS")) return Perm(msg, `No Permission`, `I don't have the permission to manage channels`);
    const channel = msg.mentions.channels.first();
    let reason = args.slice(1).join(" ");

    if (!channel) return Invalid(msg, `No Channel`, `I need a channel in order to delete it`, `delchannel [channel] [reason]`);
    
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
        if (!msg.member.hasPermission("MANAGE_CHANNELS")) return Perm(msg, `No Permission`, `You don't have the permission to manage channels`);
        if (!msg.guild.me.hasPermission("MANAGE_CHANNELS")) return Perm(msg, `No Permission`, `I don't have the permission to manage channels`);
        let authorid = msg.author.id;

        const filter1 = response1 => { return response1.author.id === authorid; }
    
        const Channel = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`${by} Commands`)
        .setDescription("Command: delchannel")
        .addFields(
            { name: "Channel Name", value: `I need a channel's name to continue` },
            { name: `Cancel Command`, value: `Type \`cancel\`` }
        )
        .setFooter(`${by} helps`)
    
        msg.channel.send(Channel).then(() => {
            msg.channel.awaitMessages(filter1, { max: 1 , time: 30000, errors: ['time']})
            .then(collected1 => {
                const response1 = collected1.first();
                if (response1.content == "cancel") return Cancel(msg);
                const channel = response1.mentions.channels.first();
                if (!channel) return Wronganswer(msg, `No Channel`, `I need a valid channel name`);
                let channelN = channel.name;
      
                const filter2 = response2 => { return response2.author.id === authorid; }
    
                const Reason = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setTitle(`${by} Commands`)
                .setDescription("Command: delchannel")
                .addFields(
                    { name: "Reason", value: `I need a reason to continue` },
                    { name: `Cancel Command`, value: `Type \`cancel\`` }
                )
                .setFooter(`${by} helps`)
      
                msg.channel.send(Reason).then(() => {
                    msg.channel.awaitMessages(filter2, { max: 1 , time: 30000, errors: ['time']})
                    .then(collected2 => {
                        const response2 = collected2.first();
                        if (response2.content == "cancel") return Cancel(msg);
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