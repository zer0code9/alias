const { prefix, by } = require("./../config.json");
const Discord = require("discord.js");
function lala(msg, args) {
    if (!msg.member.hasPermission("MANAGE_CHANNELS")) return msg.channel.send(`You don't have the permission to manage channels, ${msg.author}`)
    if(!msg.guild.me.hasPermission("MANAGE_CHANNELS")) return msg.channel.send(`I dont have the permissions to manage channels, ${msg.author}`)
    const channel = msg.mentions.channels.first();
    const name = args.join(" ");
    if (name) {
        msg.guild.channels.create(`${name}`);
        const add = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("CREATED VOICE :file_folder::heavy_plus_sign:")
        .setDescription("Voice")
        .addFields(
            { name: "A new voice channel has been created", value: `\`\`\`New voice channel name: ${name}\`\`\``}
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
    name: "addvoice",
    description: "Create a new voice channel",
    example: prefix + "addvoice [name]",
    type: "voice",
    execute(msg, args) {
        lala(msg, args)
    }
}