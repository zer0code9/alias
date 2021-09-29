const { prefix, by } = require("../config.json");
const Discord = require("discord.js");
const { Timeout, Wronganswer, Cancel, Perm, Invalid, Unknown } = require("../errors");
function createChannel(msg, args) {
    if (!msg.member.permissions.has("MANAGE_CHANNELS")) return Perm(msg, `No Permission`, `You don't have the permission to manage channels`);
    if (!msg.guild.me.permissions.has("MANAGE_CHANNELS")) return Perm(msg, `No Permission`, `I don't have the permission to manage channels`);
    const channel = msg.mentions.channels.first();
    const type = args[0]
    const name = args.slice(1).join(" ");

    if (!name) return Invalid(msg, `No Name`, `I need a name in order to create a new channel`, `createchannel [name] [type]`);

    if (!type) return Invalid(msg, `No Type`, `I need a type in order to create a new channel`, `createchannel [name] [type]`);
    if (type != "text" || "voice") return Wronganswer(msg, `Wrong Type`, `${type} is not a type for a channel`);

    msg.guild.channels.create(`${name}`, {type: `${type}`});
    const Add = new Discord.MessageEmbed()
    .setColor("#00ff00")
    .setTitle(":white_check_mark: CREATED CHANNEL :file_folder::heavy_plus_sign:")
    .setDescription("Channel")
    .addFields(
        { name: "A new channel has been created", value: `\`\`\`${name}\`\`\``},
        { name: "The new channel is of type", value: `\`${type}\`` },
        { name: "To change channel position:", value: `Use \`zmovechannel\``}
    )
    .setFooter(`${by} helps`)
    msg.channel.send(Add);
}

module.exports = {
    name: "createchannel",
    description: "Create a new channel of a different type",
    example: prefix + "createchannel [name] [type]",
    type: "voice",
    execute(msg, args) {
        if (args[0]) {return createChannel(msg, args);}
        if (!msg.member.permissions.has("MANAGE_CHANNELS")) return Perm(msg, `No Permission`, `You don't have the permission to manage channels`);
        if (!msg.guild.me.permissions.has("MANAGE_CHANNELS")) return Perm(msg, `No Permission`, `I don't have the permission to manage channels`);
        let authorid = msg.author.id;

        const filter1 = (m) => m.author.id === authorid;

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
            msg.channel.awaitMessages(filter1, { max: 1 , time: 30000, errors: ['time']})
            .then(collected1 => {
                const response1 = collected1.first();
                if (response1.content == "cancel") return Cancel(msg);
                const name = response1;

                const filter2 = response2 => { return response2.author.id === authorid; }

                const Type = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setTitle(`${by} Commands`)
                .setDescription("Command: addchannel")
                .addFields(
                    { name: "Type", value: `I need a type to continue` },
                    { name: `Cancel Command`, value: `Type \`cancel\`` }
                )
                .setFooter(`${by} helps`)

                msg.channel.send(Type).then(() => {
                    msg.channel.awaitMessages(filter2, { max: 1, time: 30000, errors: ['time']})
                    .then(collected2 => {
                        const response2 = collected2.first();
                        if (response2.content == "cancel") return Cancel(msg);
                        const type = response2;
                        if (type != "text" || "voice") return Wronganswer(msg, `Wrong Type`, `${type} is not a type for a channel`);

                        msg.guild.channels.create(`${name}`, {type: `${type}`});
                        const Add = new Discord.MessageEmbed()
                        .setColor("#00ff00")
                        .setTitle(":white_check_mark: CREATED CHANNEL :file_folder::heavy_plus_sign:")
                        .setDescription("Channel")
                        .addFields(
                            { name: "A new channel has been created", value: `\`\`\`${name}\`\`\``},
                            { name: "The new channel is of type", value: `\`${type}\`` },
                            { name: "To change channel position:", value: `Use \`zmovechannel\``}
                        )
                        .setFooter(`${by} helps`)
                        msg.channel.send(Add);

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