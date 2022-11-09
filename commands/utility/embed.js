const { prefix, by } = require("../../config.json");
const { MessageEmbed, Permissions } = require('discord.js');
const { Timeout, Wronganswer, Perm, Cancel, Invalid, Unknown } = require("../../errors");
async function delChannel(msg, args, example) {
    // variables

    // ifs

    // action
    const Name = new MessageEmbed()
    .setColor('#00ff00')
    .setTitle(`:: NAME ::::`)
    .setDescription('type')
    .addFields(
        { name: "", value: `\`\`\`${}\`\`\`` },
        { name: "", value: ``}
    )
    .setFooter({ text: `${by} helps` })
    await msg.channel.send({ embeds: [Name] });
    msg.delete();
}
module.exports = {
    name: "",
    description: "",
    example: prefix + "",
    type: "",
    execute(msg, args) {
        if (!msg.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) return Perm(msg, `No Permission`, `You don't have the permission to manage channels`);
        if (!msg.guild.me.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) return Perm(msg, `No Permission`, `I don't have the permission to manage channels`);
        const example = this.example;
        if (args[0]) return delChannel(msg, args, example);
        const filter = (m) => m.author.id === msg.author.id;
    
        const Channel = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`${by} Commands`)
        .setDescription("Command: delchannel")
        .addFields(
            { name: "Channel Name", value: `I need a channel's name to continue \n(mention:channel or channel:id` },
            { name: `Cancel Command`, value: `Type \`cancel\`` }
        )
        .setFooter({ text: `${by} helps` })
    
        msg.channel.send({ embeds: [Channel] }).then(() => {
            msg.channel.awaitMessages({filter, max: 1 , time: 30000, errors: ['time']})
            .then(collected1 => {
                const response1 = collected1.first();
                if (response1.content == `cancel`) return Cancel(msg);
                const channel = msg.guild.channels.cache.get(response1.content) || response1.mentions.channels.first();
                if (!channel) return Invalid(msg, `No Channel`, `I need a channel in order to delete it \n(mention:channel or channel:id)`, `${example}`);
                let channelName = channel.name;
    
                const Reason = new MessageEmbed()
                .setColor("RANDOM")
                .setTitle(`${by} Commands`)
                .setDescription("Command: delchannel")
                .addFields(
                    { name: "Reason", value: `I need a reason to continue` },
                    { name: `Cancel Command`, value: `Type \`cancel\`` }
                )
                .setFooter({ text: `${by} helps` })
      
                msg.channel.send({ embeds: [Reason] }).then(() => {
                    msg.channel.awaitMessages({filter, max: 1 , time: 30000, errors: ['time']})
                    .then(collected2 => {
                        const response2 = collected2.first();
                        if (response2.content == `cancel`) return Cancel(msg);
                        const reason = response2;
                        if (!reason) reason = "No reason";
        
                        channel.delete();
                        const Remove = new MessageEmbed()
                        .setColor('#00ff00')
                        .setTitle(`:white_check_mark: DELETED CHANNEL :file_folder::heavy_minus_sign:`)
                        .setDescription('Channel')
                        .addFields(
                            { name: "A channel has been deleted", value: `\`\`\`${channelName}\`\`\`` },
                            { name: "Reason", value: `\`\`\`${reason}\`\`\``}
                        )
                        .setFooter({ text: `${by} helps` })
                        msg.channel.send({ embeds: [Remove] });

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