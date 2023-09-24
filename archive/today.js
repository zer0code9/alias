const { bot, emojiType, colorEmbed } = require('../config.js');
const AliasEmbeds = require("../helpers/embeds");

module.exports = {
    name: "today",
    description: "Get info on today",
    type: "Info",
    botPerms: [],
    memPerms: [],
    msgCommand: {
        exist: true,
        usage: bot.prefix + "today"
    },
    intCommand: {
        exist: false,
        options: []
    },

    async msgRun(msg, args) {
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
    
        const Today = AliasEmbeds.embedInfo("BOT INFO", emojiType.bot,
        [
            { name: "Date:", value: `\`\`\`${dates}\`\`\``},
            { name: "Computer Date:", value: `\`\`\`Day: ${day} | Month: ${month} | Date: ${date} | Year: ${year}\`\`\``},
            { name: "Time:", value: `\`\`\`${hour}:${minute}.${second}\`\`\``}
        ], `${bot.name} helps`)
        await msg.channel.send({ embeds: [Today] });
        msg.delete();
    }
}