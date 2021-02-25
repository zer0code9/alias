const { prefix } = require("/home/asorinus/workspace/myFirstProject/WithersWorld/WithersBot/config.json");
const Discord = require("discord.js");
function userInfo(msg, args) {
    const emoji = msg.guild.emojis.cache.first();
    var an;
    if (args == 0) {
        const noUser = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("WithersBot Commands")
        .setDescription("Command: emoji")
        .addFields(
            { name: "Command", value: `Get info on an emoji\n\`\`\`${prefix}emoji [emoji]\`\`\``}
        )
        .setFooter("WithersBot helps")
        msg.channel.send(noUser);
    } else {
        if (args[0] !=0) {
            var cre = emoji.createdAt;
            if (emoji.animated = false) { an = `${emoji.name} is not animated` } else { if (emoji.animated = true) { an = `${emoji.name} is an animated emoji` }}
            const userOn = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle("WithersBot Commands")
            .setDescription("Command: emoji")
            .addFields(
                [
                    { name: "Username", value: `\`\`\`${emoji.name}\`\`\``, inline: true},
                    { name: "Id", value: `\`\`\`${emoji.id}\`\`\``, inline: true},
                ],
                { name: "Created on", value: `${cre.toDateString()}`},
                { name: "Author", value: `${emoji.author}`},
                { name: "Identifier", value: `${emoji.identifier}`},
                { name: "Animated?", value: `${an}`},
                { name: "URL", value: `${emoji.url}`}
            )
            .setFooter("WithersBot helps")
            msg.channel.send(userOn);
        }
    }
}

module.exports = {
    name: "emoji",
    description: "Get info on an emoji",
    example: prefix + "emoji [emoji]",
    type: "info",
    execute(msg, args) {
        userInfo(msg, args);
    }
}