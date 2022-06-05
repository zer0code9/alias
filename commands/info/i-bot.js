const { prefix, by, version, versiondescription } = require("../../config.json");
const { MessageEmbed} = require("discord.js");
const { timeDifference } = require('../../functions');
function botUser(msg, args, bot) {
    const botInfo = new MessageEmbed()
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
    .setFooter({ text: `${by} helps` })
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