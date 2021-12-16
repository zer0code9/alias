const { prefix, by } = require("./../config.json");
const { MessageEmbed, Permissions } = require('discord.js');
const { Timeout, Wronganswer, Perm, Cancel, Invalid, Unknown } = require("../errors");
async function nameChannel(msg, args, example) {
    const channel = msg.guild.channels.cache.get(args[0]) || msg.mentions.channels.first();
    if (!channel) return Invalid(msg, `No Channel`, `I need a channel to change its name`, `${example}`);

    const name = args.slice(1).join(" ");

    if (!name) return Invalid(msg, `No Name`, `I need a name in order to rename the channel`, `${example}`);

    await channel.setName(`${name}`);
    const Name = new MessageEmbed()
    .setColor('#00ff00')
    .setTitle(`:white_check_mark: RENAMED CHANNEL :file_folder::pencil2:`)
    .setDescription('Channel')
    .addFields(
        { name: "A channel has been renamed", value: `\`\`\`${channel.name}\`\`\`` },
        { name: "New Name", value: `\`\`\`${name}\`\`\``}
    )
    .setFooter(`${by} helps`)
    await msg.channel.send({ embeds: [Name] });
    msg.delete();
}

module.exports = {
    name: "namechannel",
    description: "Change the name of a channel",
    example: prefix + "namechannel [channel] [name]",
    type: "channel",
    execute(msg, args) {
        if (!msg.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) return Perm(msg, `No Permission`, `You don't have the permission to manage channels`);
        if (!msg.guild.me.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) return Perm(msg, `No Permission`, `I don't have the permission to manage channels`);
        if (args[0]) return nameChannel(msg, args, this.example);
        let authorid = msg.author.id;
        const filter = (m) => m.author.id === authorid;
    
        const Channel = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`${by} Commands`)
        .setDescription("Command: namechannel")
        .addFields(
            { name: "Channel Name", value: `I need a channel's name to continue` },
            { name: `Cancel Command`, value: `Type \`cancel\`` }
        )
        .setFooter(`${by} helps`)
    
        msg.channel.send({ embeds: [Channel] }).then(() => {
            msg.channel.awaitMessages({filter, max: 1 , time: 30000, errors: ['time']})
            .then(collected1 => {
                const response1 = collected1.first();
                if (response1.content == "cancel") return Cancel(msg);
                const channel = msg.mentions.channels.first();
                if (!channel) return Wronganswer(msg, `No Channel`, `I need a valid channel name`);
    
                const Name = new MessageEmbed()
                .setColor("RANDOM")
                .setTitle(`${by} Commands`)
                .setDescription("Command: namechannel")
                .addFields(
                    { name: "Name", value: `I need a name to continue` },
                    { name: `Cancel Command`, value: `Type \`cancel\`` }
                )
                .setFooter(`${by} helps`)
      
                msg.channel.send({ embeds: [Name] }).then(() => {
                    msg.channel.awaitMessages({filter, max: 1 , time: 30000, errors: ['time']})
                    .then(collected2 => {
                        const response2 = collected2.first();
                        if (response2.content == "cancel") return Cancel(msg);
                        const name = response2.content;
        
                        channel.setName(`${name}`)
                        const Name = new MessageEmbed()
                        .setColor('#00ff00')
                        .setTitle(`:white_check_mark: RENAMED CHANNEL :file_folder::pencil2:`)
                        .setDescription('Channel')
                        .addFields(
                            { name: "A channel has been renamed", value: `\`\`\`${channel.name}\`\`\`` },
                            { name: "New Name", value: `\`\`\`${name}\`\`\``}
                        )
                        .setFooter(`${by} helps`)
                        msg.channel.send({ embeds: [Name] });

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