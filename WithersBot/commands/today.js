const { prefix } = require("/home/asorinus/workspace/myFirstProject/WithersWorld/WithersBot/config.json");
const Discord = require("discord.js");
function today(msg, args) {
    let tdy = new Date();
    let date = tdy.getDate();
    let day = tdy.getDay();
    let month = tdy.getMonth();
    let year = tdy.getFullYear();
    let time = tdy.getTime();
    let msecond = tdy.getMilliseconds();
    let second = tdy.getSeconds();
    let minute = tdy.getMinutes();
    let hour = tdy.getHours();
    let dates = tdy.toDateString();

    const todayDate = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("WithersBot Commands")
        .setDescription(`Command: today`)
        .addFields(
            { name: "Date:", value: `${dates}`},
            { name: "Computer Date:", value: `${day} ${month} ${date} ${year}`},
            { name: "Time:", value: `${hour}:${minute}:${second}:${msecond}`}
        )
        .setFooter('WithersBot helps')
    msg.channel.send(todayDate);


}
module.exports = {
    name: "today",
    description: "Get the time and day of today",
    example: prefix + "today",
    execute(msg, args) {
        today(msg, args)
    }
}