const { prefix, by } = require("../../config.json");
const { MessageEmbed } = require("discord.js");
const { Invalid } = require('../../errors');
const { timeDifference } = require('../../functions');
async function todayInfo(msg, args) {
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

    const todayDate = new MessageEmbed()
        .setColor("#00ff00")
        .setTitle(":clock12: TIME INFO :clock12:")
        .setDescription(`Info`)
        .addFields(
            { name: "Date:", value: `\`\`\`${dates}\`\`\``},
            { name: "Computer Date:", value: `\`\`\`Day: ${day} | Month: ${month} | Date: ${date} | Year: ${year}\`\`\``},
            { name: "Time:", value: `\`\`\`${hour}:${minute}.${second}\`\`\``}
        )
        .setFooter({ text: `${by} helps` })
    await msg.channel.send({ embeds: [todayDate] });
    msg.delete();
}

module.exports = {
    name: "today",
    description: "Get info on today",
    example: prefix + "today",
    type: "info",
    execute(msg, args) {
        todayInfo(msg, args)
    }
}