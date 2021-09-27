const { prefix, by } = require("./../config.json");
const Discord = require("discord.js");
const { Timeout, Wronganswer, Cancel, Perm, Invalid, Unknown } = require("../errors");
function addChannel(msg, args) {
    if (!msg.member.hasPermission("MANAGE_CHANNELS")) return Perm(msg, `No Permission`, `You don't have the permission to manage channels`);
    if (!msg.guild.me.hasPermission("MANAGE_CHANNELS")) return Perm(msg, `No Permission`, `I don't have the permission to manage channels`);
    const channel = msg.mentions.channels.first();
    const name = args[0];
    var type = args[1];

    if (!name) return Invalid(msg, `No name`, `I need a name in order to create a new channel`, `addchannel [name] [type?]`);

    msg.guild.channels.create(`${name}`, {type: `${type}`});
    const Add = new Discord.MessageEmbed()
    .setColor("#00ff00")
    .setTitle(":white_check_mark: CREATED CHANNEL :file_folder::heavy_plus_sign:")
    .setDescription("Channel")
    .addFields(
        { name: "A new channel has been created", value: `\`\`\`${name}\`\`\``},
        { name: "To change channel position:", value: `Use \`zmovechannel\``}
    )
    .setFooter(`${by} helps`)
    msg.channel.send(Add);
}

module.exports = {
    name: "addchannel",
    description: "Create a new channel",
    example: prefix + "addchannel [name] [type?]",
    type: "channel",
    execute(msg, args) {
        if (args[0]) {return addChannel(msg, args);}
        if (!msg.member.hasPermission("MANAGE_CHANNELS")) return Perm(msg, `No Permission`, `You don't have the permission to manage channels`);
        if (!msg.guild.me.hasPermission("MANAGE_CHANNELS")) return Perm(msg, `No Permission`, `I don't have the permission to manage channels`);
        let authorid = msg.author.id;

        const filter1 = response1 => { return response1.author.id === authorid; }

        const Name = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`${by} Commands`)
        .setDescription("Command: addchannel")
        .addFields(
            { name: "Name", value: `I need a name to continue` },
            { name: `Cancel Command`, value: `Type \`cancel\`` }
        )
        .setFooter(`${by} helps`)
    
        msg.channel.send(Name).then(() => {
            msg.channel.awaitMessages(filter1, { max: 1, time: 30000, errors: ['time']})
            .then(collected1 => {
                const response1 = collected1.first();
                if (response1.content == "cancel") return Cancel(msg);
                const name = response1;

                const filter2 = response2 => { return response2.author.id === authorid; }

                const Type = new Discord.MessageEmbed()
                .setColor("Random")
                .setTitle(`${by} Commands`)
                .setDescription("Command: addchannel")
                .addFields(
                    { name: "Type", value: `I need a type to continue` },
                    { name: "Types:", value: "\`\`\`text | voice | store | category | news | stage" },
                    { name: `Cancel Command`, value: `Type \`cancel\`` }
                )
                .setFooter(`${by} helps`)

                msg.channel.send(Type).then(() => {
                    msg.channel.awaitMessages(filter2, { max: 1, time: 30000, errors: ['time']})
                    .then(collected2 => {
                        const response2 = collected2.first();
                        if (response1.content == "cancel") return Cancel(msg);
                        const type = response2;

                        //if (type != "text" || "voice" || "store" || "category" || "news" || "stage") return Wronganswer(msg, `Unknown Type`, `${type} is not a channel type`)

                        msg.guild.channels.create(`${name}`, {type: `${type}`});
                        const Add = new Discord.MessageEmbed()
                        .setColor("#00ff00")
                        .setTitle(":white_check_mark: CREATED CHANNEL :file_folder::heavy_plus_sign:")
                        .setDescription("Channel")
                        .addFields(
                            { name: "A new channel has been created", value: `\`\`\`${name}\`\`\`` },
                            { name: "The channel is of type", value: `\`\`\`${type}\`\`\`` },
                            { name: "To change channel position:", value: `Use \`zmovechannel\`` }
                        )
                        .setFooter(`${by} helps`)
                        msg.channel.send(Add);

                    }).catch(error => {
                        if (error == '[object Map]') Timeout(msg);
                        else Unknown(msg, error);
                    });
                })
            }).catch(error => {
                if (error == '[object Map]') Timeout(msg);
                else Unknown(msg, error);
            });
        })
    }
}