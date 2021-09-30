const { prefix, by } = require("./../config.json");
const Discord = require("discord.js");
const { Wronganswer, Invalid, Unknown } = require('../errors');
function sendHelp(msg, args, bot, example){
    var cmds = bot.botCommands;
    let docs = [];
    for (const [name, description, type] of cmds) {
        docs.push({
            name: prefix + name + " [" + type + "]",
            value: description.description + '```' + description.example + '```'
        });
    }
    const Help = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setTitle(`${by}`)
    .setDescription(`**${by} Commands:**`)
    .addFields(docs)
    .setFooter(`${by} helps`)
    if (!args[0]) return msg.channel.send({ embeds: [Help] });
    try {
        let selected = docs[args[0].toLowerCase()];
        const helpSelected = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`${by}`)
        .setDescription(`**${by} Command:**`)
        .addFields(docs.filter(cmds => cmds.name === args[0]))
        .setFooter(`${by} helps`)
        if (typeof selected == cmds) msg.channel.send({ embeds: [helpSelected] });
    } catch {
        Invalid(msg, `No Command`, `I can't find the command`, `${example}`);
    }
}

module.exports = {
    name: "help",
    description: "Get help on the commands of WithersBot",
    example: prefix + "help [command]",
    execute(msg, args, bot){
        sendHelp(msg, args, bot, this.example);
    }
}