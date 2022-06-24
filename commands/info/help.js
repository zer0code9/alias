const { prefix, by } = require("../../config.json");
const { MessageEmbed, Permissions } = require('discord.js');
const { Timeout, Wronganswer, Perm, Cancel, Invalid, Unknown } = require("../../errors");
async function sendHelp(msg, args, bot, example){
    var cmds = await bot.botCommands;
    let docs = [];

    if (args[0]) {
        for (const [name, description] of cmds) {
            if (args[0].toLowerCase() === name) {
                docs.push({
                    name: prefix + name + " [" + description.type + "]",
                    value: description.description + '```' + description.example + '```'
                });
                break;
            }
        }
        if (docs.length == 0) return Invalid(msg, `No Command`, `I can't find the command ${args[0]} \n(phrase)`, `${example}`);
    }
    else {
        for (const [name, description] of cmds) {
            docs.push({
                name: prefix + name + " [" + description.type + "]",
                value: description.description + '```' + description.example + '```'
            });
        }
    }

    const Help = new MessageEmbed()
    .setColor('#00ff00')
    .setTitle(`:mag: ${by.toUpperCase()} COMMANDS :mag_right:`)
    .setDescription(`Info`)
    .addFields(docs)
    .setFooter({ text: `${by} helps` })
    await msg.channel.send({ embeds: [Help] });
    msg.delete();
}

module.exports = {
    name: "help",
    description: "Get help on the commands of " + by,
    example: prefix + "help [command:p?]",
    type: "info",
    execute(msg, args, bot){
        sendHelp(msg, args, bot, this.example);
    }
}