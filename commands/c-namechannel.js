const { prefix, by } = require("./../config.json");
const Discord = require("discord.js");
const { Timeout, Wronganswer, Perm, Cancel, Invalid, Unknown } = require("../errors");
function nameChannel(msg, args) {
    if (!msg.member.hasPermission("MANAGE_CHANNELS")) return Perm(msg, `No Permission`, `You don't have the permission to manage channels`);
    if (!msg.guild.me.hasPermission("MANAGE_CHANNELS")) return Perm(msg, `No Permission`, `I don't have the permission to manage channels`);
    const channel = msg.mentions.channels.first();
    const name = args.slice(1).join(" ");

    if (!channel) return Invalid(msg, `No Channel`, `I need a channel in order to rename it`, `namechannel [channel] [name]`);

    if (!name) return Invalid(msg, `No Name`, `I need a name in order to rename the channel`, `namechannel [channel] [name]`);

    channel.setName(`${name}`)
    const Name = new Discord.MessageEmbed()
    .setColor('#00ff00')
    .setTitle(`:white_check_mark: RENAMED CHANNEL :file_folder::pencil2:`)
    .setDescription('Channel')
    .addFields(
        { name: "A channel has been renamed", value: `\`\`\`${channel.name}\`\`\`` },
        { name: "New Name", value: `\`\`\`${name}\`\`\``}
    )
    .setFooter(`${by} helps`)
    msg.channel.send(Name);
}

module.exports = {
    name: "namechannel",
    description: "Change the name of a channel",
    example: prefix + "namechannel [channel] [name]",
    type: "channel",
    execute(msg, args) {
        if (args[0]) {return nameChannel(msg, args)}
        if (!msg.member.hasPermission("MANAGE_CHANNELS")) return Perm(msg, `No Permission`, `You don't have the permission to manage channels`);
        if (!msg.guild.me.hasPermission("MANAGE_CHANNELS")) return Perm(msg, `No Permission`, `I don't have the permission to manage channels`);
        let authorid = msg.author.id;

        const filter1 = response1 => { return response1.author.id === authorid; }
    
        const Channel = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`${by} Commands`)
        .setDescription("Command: namechannel")
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
                if (!channel) return Wronganswer(msg, `No Channel`, `I need a valid channel name`)
      
                const filter2 = response2 => { return response2.author.id === authorid; }
    
                const Name = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setTitle(`${by} Commands`)
                .setDescription("Command: namechannel")
                .addFields(
                    { name: "Name", value: `I need a name to continue` },
                    { name: `Cancel Command`, value: `Type \`cancel\`` }
                )
                .setFooter(`${by} helps`)
      
                msg.channel.send(Name).then(() => {
                    msg.channel.awaitMessages(filter2, { max: 1 , time: 30000, errors: ['time']})
                    .then(collected2 => {
                        const response2 = collected2.first();
                        if (response2.content == "cancel") return Cancel(msg);
                        const name = response2.content;
        
                        channel.setName(`${name}`)
                        const Name = new Discord.MessageEmbed()
                        .setColor('#00ff00')
                        .setTitle(`:white_check_mark: RENAMED CHANNEL :file_folder::pencil2:`)
                        .setDescription('Channel')
                        .addFields(
                            { name: "A channel has been renamed", value: `\`\`\`${channel.name}\`\`\`` },
                            { name: "New Name", value: `\`\`\`${name}\`\`\``}
                        )
                        .setFooter(`${by} helps`)
                        msg.channel.send(Name);

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