const { prefix } = require("/home/asorinus/workspace/myFirstProject/WithersWorld/WithersBot/config.json");
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
        .setTitle(`WithersBot`)
        .setDescription('**WithersBot Commands:**')
        .addFields(docs)
        .setFooter('WithersBot helps')
    msg.channel.send(help);
    } else {

    
    if (args.length > 0) {

        let selected = docs[args[0].toLowerCase()];

        if (typeof selected == "undefined") {
                const helpSelected = new Discord.MessageEmbed()
                .setColor("#922B21")
                .setTitle(`WithersBot`)
                .setDescription(`**❌ ERROR**`)
                .addFields({ name: "I can't find the command you're looking for.", value: "See all my commands by typing:\n```zhelp```" })
                .setFooter('The Bot of WithersWorld', new Date())
        } else {
            if (typeof selected == cmds) {
                const helpSelected = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setTitle(`WithersBot`)
                .setDescription(`**WithersBot Command:**`)
                .addFields(docs.filter(cmds => cmds.name === args[0]))
                .setFooter('The Bot of WithersWorld', new Date())
            }
        }
        msg.channel.send(helpSelected);
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