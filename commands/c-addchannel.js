const { prefix, by } = require("./../config.json");
const Discord = require("discord.js");
function addChannel(msg, args) {
    if (!msg.member.hasPermission("MANAGE_CHANNELS")) return msg.channel.send(`You don't have the permission to manage channels, ${msg.author}`)
    if(!msg.guild.me.hasPermission("MANAGE_CHANNELS")) return msg.channel.send(`I dont have the permissions to manage channels, ${msg.author}`)
    const channel = msg.mentions.channels.first();
    const name = args.join(" ");
    if (name) {
        msg.guild.channels.create(`${name}`);
        const add = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("CREATED CHANNEL :file_folder::heavy_plus_sign:")
        .setDescription("Channel")
        .addFields(
            { name: "A new channel has been created", value: `\`\`\`New channel name: ${name}\`\`\``}
        )
        .setFooter(`${by} helps`)
        msg.channel.send(add);
    } else {
        const noAdd = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`${by} Commands`)
        .setDescription("Command: addchannel")
        .addFields(
            { name: "No Name", value: `I need a name in order to create a new channel`},
            { name: "Command:", value: `Create a new channel\n\`\`\`${prefix}addchannel [name]\`\`\``}
        )
        .setFooter(`${by} helps`)
        msg.channel.send(noAdd);
    }
}

module.exports = {
    name: "addchannel",
    description: "Create a new channel",
    example: prefix + "addchannel [name]",
    type: "channel",
    execute(msg, args) {
        if (!msg.member.hasPermission("MANAGE_CHANNELS")) return msg.channel.send(`You don't have the permission to manage channels, ${msg.author}`)
        if(!msg.guild.me.hasPermission("MANAGE_CHANNELS")) return msg.channel.send(`I dont have the permissions to manage channels, ${msg.author}`)
        let authorid = msg.author.id;

        const filter1 = response1 => { return response1.author.id === authorid; }

        const Name = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`${by} Commands`)
        .setDescription("Command: addchannel")
        .addFields(
            { name: "Name", value: `I need a name to continue` }
        )
        .setFooter(`${by} helps`)
    
        msg.channel.send(Name).then(() => {
            msg.channel.awaitMessages(filter1, { max: 1 , time: 30000, errors: ['time']})
            .then(collected1 => {
                const name = collected1.first();
                msg.guild.channels.create(`${name}`);

                const Add = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setTitle("CREATED CHANNEL :file_folder::heavy_plus_sign:")
                .setDescription("Channel")
                .addFields(
                    { name: "A new channel has been created", value: `\`\`\`${name}\`\`\``}
                )
                .setFooter(`${by} helps`)
                msg.channel.send(Add);       
            }).catch(error => {
                const Error = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setTitle("Canceled")
                .addFields(
                    { name: "Command Canceled", value: `Automatic cancelation`}
                )
                .setFooter(`${by} helps`)
                msg.channel.send(Error);  
            });
        })
    }
}