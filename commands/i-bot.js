const { prefix, by, version, versiondescription } = require("./../config.json");
const Discord = require("discord.js");
function botUser(msg, args, bot) {
    const botInfo = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle(`${by} Commands`)
    .setDescription("Command: ")
    .addFields(
        [
            { name: "Version", value: `\`\`\`${version}\`\`\``, inline: true},
            { name: "Version Description", value: `\`\`\`${versiondescription}\`\`\``, inline: true}
        ],
        { name: "Guilds on", value: `${bot.guilds}`}
    )
    .setFooter(`${by} helps`)
    msg.channel.send({ embeds: [botInfo] });
}

module.exports = {
    name: "bot",
    description: "Get info on the bot",
    example: prefix + "bot",
    type: "info",
    execute(msg, args) {
        botUser(msg, args);
    }
}