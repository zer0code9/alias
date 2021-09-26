const { prefix, by } = require("./../config.json");
const Discord = require("discord.js");
const { Timeout, Wronganswer, Cancel, Perm, Invalid, Unknown } = require("../errors");
function addChannel(msg, args) {
    if (!msg.member.hasPermission("MANAGE_CHANNELS")) return Perm(msg, `No Permission`, `You don't have the permission to manage channels`);
    if (!msg.guild.me.hasPermission("MANAGE_CHANNELS")) return Perm(msg, `No Permission`, `I don't have the permission to manage channels`);
    const channel = msg.mentions.channels.first();
    const name = args.join(" ");

    if (!name) return Invalid(msg, `No name`, `I need a name in order to create a new channel`, `addchannel [name]`);

    msg.guild.channels.create(`${name}`);
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
    example: prefix + "addchannel [name]",
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
            msg.channel.awaitMessages(filter1, { max: 1 , time: 30000, errors: ['time']})
            .then(collected1 => {
                const response1 = collected1.first();
                if (response1.content == "cancel") return Cancel(msg);
                const name = response1;

                msg.guild.channels.create(`${name}`);
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

            }).catch(error => {
                if (error == '[object Map]') Timeout(msg);
                else Unknown(msg);
            });
        })
    }
}