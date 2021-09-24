const Discord = require("discord.js");
const { prefix, by } = require('./config.json');
function Timeout(msg) {
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
    var Wrong = new Discord.MessageEmbed()
    .setColor("#ff0000")
    .setTitle(":warning: CANCELED :warning:")
    .addFields(
        { name: `${name}`, value: `${value}`},
        { name: "Command Canceled", value: `Wrong answer cancelation`}
    )
    .setFooter(`${by} helps`)
    return msg.channel.send(Wrong);
}
function Perm(msg, name, value) {
    var Permission = new Discord.MessageEmbed()
    .setColor("#ff0000")
    .setTitle(":no_entry_sign: CANCELED :no_entry_sign:")
    .addFields(
        { name: `${name}`, value: `${value}`},
        { name: "Command Canceled", value: `Invalid Permission cancelation`}
    )
    .setFooter(`${by} helps`)
    return msg.channel.send(Permission);
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
function Invalid(msg, name, value, use) {
    var Invalid = new Discord.MessageEmbed()
    .setColor("#ff0000")
    .setTitle(":warning: CANCELED :warning:")
    .addFields(
        { name: `${name}`, value: `${value}`},
        {name: "Command:", value: `\`${prefix}${use}\``}
    )
    .setFooter(`${by} helps`)
    return msg.channel.send(Invalid);
}
module.exports = {Timeout, Wronganswer, Perm, Cancel, Invalid}