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
module.exports = {Timeout, Wronganswer, Cancel}