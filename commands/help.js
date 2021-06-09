const { prefix, by } = require("./../config.json");
const Discord = require("discord.js");
function sendHelp(msg, args, cmds){
    let docs = [];
    for (const [name, description] of cmds) {
        docs.push({
            name: prefix + name,
            value: description.description + '```' + description.example + '```'
        });
    }
    if (args.length == 0) {
        const help = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle(`${by}`)
        .setDescription(`**${by} Commands:**`)
        .addFields(docs)
        .setFooter(`${by} helps`)
    msg.channel.send(help);
    } else {

    
    if (args.length > 0) {

        let selected = docs[args[0].toLowerCase()];

        if (typeof selected == "undefined") {
                const helpSelected = new Discord.MessageEmbed()
                .setColor("#922B21")
                .setTitle(`${by}`)
                .setDescription(`**❌ ERROR**`)
                .addFields({ name: "I can't find the command you're looking for.", value: "See all my commands by typing:\n```zhelp```" })
                .setFooter(`${by} helps`)
                msg.channel.send(helpSelected);
        } else {
            if (typeof selected == cmds) {
                const helpSelected = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setTitle(`${by}`)
                .setDescription(`**${by} Command:**`)
                .addFields(docs.filter(cmds => cmds.name === args[0]))
                .setFooter(`${by} helps`)
                msg.channel.send(helpSelected);
            }
        }
    }
}
}

module.exports = {
    name: "help",
    description: "Get help on the commands of WithersBot",
    example: prefix + "help [command]",
    execute(msg, args, cmds){
        sendHelp(msg, args, cmds);
    }
}