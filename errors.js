const Discord = require("discord.js");
const { prefix, by } = require('./config.json');
function Error(msg, name1, value1, name2, value2, emoji) {
    const Error = new Discord.MessageEmbed()
    .setColor("#ff0000")
    .setTitle(`:${emoji}: CANCELED :${emoji}:`)
    .addFields(
        { name: `${name1}`, value: `${value1}` },
        { name: `${name2}`, value: `${value2}` }
    )
    .setFooter(`${by} helps`)
    return msg.channel.send(Error);
}
function Timeout(msg, error) {
    const Error = new Discord.MessageEmbed()
    .setColor("#ff0000")
    .setTitle(":x: CANCELED :x:")
    .addFields(
        { name: "Command Canceled", value: `Timeout cancelation`}
    )
    .setFooter(`${by} helps`)
    return msg.channel.send(Error);
}
function Wronganswer(msg, name, value) {
    return Error(msg, `${name}`, `${value}`, `Command Canceled`, `Wrong Answer Cancelation`, `warning`);
}
function Perm(msg, name, value) {
    return Error(msg, `${name}`, `${value}`, `Command Canceled`, `Invalid Permission cancelation`, `no_entry_sign`);
}
function Cancel(msg) {
    var Cancel = new Discord.MessageEmbed()
    .setColor("#ff0000")
    .setTitle(":stop_sign: CANCELED :stop_sign:")
    .addFields(
        { name: "Command Canceled", value: `Ordered cancelation`}
    )
    .setFooter(`${by} helps`)
    return msg.channel.send(Cancel);
}
function Unknown(msg) {
    var Unknown = new Discord.MessageEmbed()
    .setColor("#ff0000")
    .setTitle(":stop_sign: CANCELED :stop_sign:")
    .addFields(
        { name: "Something went ", value: `Ordered cancelation`}
    )
    .setFooter(`${by} helps`)
    return msg.channel.send(Unknown);
}
function Invalid(msg, name, value, use) {
    return Error(msg, `${name}`, `${value}`, `Command`, `\`${prefix}${use}\``, `warning`);
}
module.exports = {Timeout, Wronganswer, Perm, Cancel, Invalid}