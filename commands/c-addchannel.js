const { prefix, by } = require("./../config.json");
const Discord = require("discord.js");
const { Timeout, Cancel } = require("../errors");
function addChannel(msg, args) {
    if (!msg.member.hasPermission("MANAGE_CHANNELS")) return msg.channel.send(`You don't have the permission to manage channels, ${msg.author}`)
    if (!msg.guild.me.hasPermission("MANAGE_CHANNELS")) return msg.channel.send(`I dont have the permissions to manage channels, ${msg.author}`)
    const channel = msg.mentions.channels.first();
    const name = args.join(" ");

    const noName = new Discord.MessageEmbed()
    .setColor("#ff0000")
    .setTitle(`:warning: CANCELED :warning:`)
    .addFields(
        { name: "No Name", value: `I need a name in order to create a new channel`},
        { name: "Command:", value: `\`${prefix}addchannel [name]\``}
    )
    .setFooter(`${by} helps`)
    if (!name) return msg.channel.send(noName);

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
        if (!msg.member.hasPermission("MANAGE_CHANNELS")) return msg.channel.send(`You don't have the permission to manage channels, ${msg.author}`)
        if (!msg.guild.me.hasPermission("MANAGE_CHANNELS")) return msg.channel.send(`I dont have the permissions to manage channels, ${msg.author}`)
        let authorid = msg.author.id;

        const filter1 = response1 => { return response1.author.id === authorid; }

        const Name = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`${by} Commands`)
        .setDescription("Command: addchannel")
        .addFields(
            { name: "Name", value: `I need a name to continue` },
            { name: `Type \`cancel\` to cancel the command` }
        )
        .setFooter(`${by} helps`)
    
        msg.channel.send(Name).then(() => {
            msg.channel.awaitMessages(filter1, { max: 1 , time: 30000, errors: ['time']})
            .then(collected1 => {
                const response1 = collected1.first();
                if (response1 === `cancel`) return Cancel(msg);
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
                Timeout(msg);
            });
        })
    }
}