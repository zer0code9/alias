const { prefix } = require("/home/asorinus/workspace/myFirstProject/WithersWorld/WithersBot/config.json");
const Discord = require("discord.js");
function userInfo(msg, args) {
    if (args == 0) {
        const noUser = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("WithersBot Commands")
        .setDescription("Command: user")
        .addFields(
            { name: "Command: ", value: `Get info on an user\n\`\`\`${prefix}user [user]\`\`\``}
        )
        .setFooter("WithersBot helps")
        msg.channel.send(noUser);
    } else {
        if (args !=0) {
            const user = msg.mentions.users.first();
            const userOn = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle("WithersBot Commands")
            .setDescription("Command: user")
            .addFields(
                { name: "Username", value: `${user.username}`},
                { name: "Tag", value: `${user.tag}`},
                { name : "Id", value: `${user.id}`},
                { name: "Bot?", value: `${user.bot}`},
                { name: "Created on", value: `${user.createdAt}`}
            )
            .setFooter("WithersBot helps")
            msg.channel.send(userOn);
        }
    }
}

module.exports = {
    name: "user",
    description: "Get info on an user",
    example: prefix + "user [user]",
    type: "info",
    execute(msg, args) {
        userInfo(msg, args);
    }
}