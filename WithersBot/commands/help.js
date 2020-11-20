const { prefix } = require("/home/asorinus/workspace/myFirstProject/WithersWorld/WithersBot/config.json");
const Discord = require("discord.js");
function sendHelp(msg, args, cmds){
    let docs = [];
    for (const cmds of cmds.entries()) {
        docs.push({
            name: prefix + cmds,
            value: cmds.description + '```' + cmds.example + '```'
        });
    }
    if (args.length == 0) {
        const help = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle(`WithersBot`)
        .setDescription('**WithersBot Commands:**')
        .addFields(docs);
    msg.channel.send(help)
    } else {

        const help2 = new Discord.MessageEmbed();
            help2.setColor("#0099ff");
            help2.setTitle('WithersBot');
            help2.setDescription('**WithersBot Commands:**');
            help2.addFields(docs.filter(cmds => cmds.name === args[0]));
            help2.setTimestamp(new Date());
            help2.setFooter('The Bot of WithersWorld');
        msg.channel.send(help2);
    }
    if (args.length > 0) {

        let selected = docs[args[0].toLowerCase()];

        if (typeof selected == "undefined")
            selected = {
                name: "I can't find what command you're looking for.",
                value: "You can get the full list of command by typing:\n```pc-help [command]```"
            };

        const selectiveDocs = {
            color: "#474747",
            title: 'WithersBot',
            description: `**❌ ERROR**`,
            timestamp: new Date(),
            fields: [selected],
            footer: {
                text: 'The Bot of WithersWorld',
            },
        };

        msg.channel.send({ embed: selectiveDocs });
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