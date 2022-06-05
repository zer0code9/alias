const { MessageEmbed } = require('discord.js');
const { prefix, by } = require('./config.json');
function Error(msg, name1, value1, name2, value2, emoji) {
    const Error = new MessageEmbed()
    .setColor("#ff0000")
    .setTitle(`:${emoji}: CANCELED :${emoji}:`)
    .addFields(
        { name: `${name1}`, value: `${value1}` },
        { name: `${name2}`, value: `${value2}` }
    )
    .setFooter({ text: `${by} helps` })
    return msg.reply({ embeds: [Error] });
}
function Timeout(msg) {
    const Error = new MessageEmbed()
    .setColor("#ff0000")
    .setTitle(":x: CANCELED :x:")
    .addFields(
        { name: "Command Canceled", value: `Timeout cancelation`}
    )
    .setFooter({ text: `${by} helps` })
    return msg.channel.send({ embeds: [Error] });
}
function Wronganswer(msg, name, value) {
    return Error(msg, `${name}`, `${value}`, `Command Canceled`, `Wrong Answer Cancelation`, `warning`);
}
function Perm(msg, name, value) {
    return Error(msg, `${name}`, `${value}`, `Command Canceled`, `Invalid Permission cancelation`, `no_entry_sign`);
}
function Cancel(msg) {
    var Cancel = new MessageEmbed()
    .setColor("#ff0000")
    .setTitle(":stop_sign: CANCELED :stop_sign:")
    .addFields(
        { name: "Command Canceled", value: `Ordered cancelation`}
    )
    .setFooter({ text: `${by} helps` })
    return msg.channel.send({ embeds: [Cancel] });
}
function Invalid(msg, name, value, use) {
    return Error(msg, `${name}`, `${value}`, `Command`, `\`${use}\``, `warning`);
}
function Unknown(msg, error) {
    Error(msg, `Something went wrong`, `\`\`\`${error}\`\`\``, `Command Canceled`, `Unknown Error cancelation`, `question`);
}


module.exports = { Timeout, Wronganswer, Perm, Cancel, Invalid, Unknown }