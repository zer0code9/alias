const { prefix } = require("/home/asorinus/workspace/myFirstProject/WithersWorld/WithersBot/config.json");
const Discord = require("discord.js");
function userInfo(msg, args) {
    const user = msg.mentions.users.first();
    var bo;
    if (args == 0) {
        const author = msg.author;
        var cre = author.createdAt;
        const noUser = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("WithersBot Commands")
        .setDescription("Command: user")
        .addFields(
            { name: "Username", value: `${author.username}`},
            { name : "Id", value: `${author.id}`},
            { name: "Created on", value: `${cre.toDateString()}`},
            { name: "Tag", value: `${author.tag}`},
            { name: "Bot?", value: `Not a bot`}
        )
        .setFooter("WithersBot helps")
        msg.channel.send(noUser);
    } else {
        if (args[0] !=0) {
            var cre = user.createdAt;
            if (user.bot = false) { bo = `${user.username} is not a bot` } else { if (user.bot = true) { bo = `${user.username} is a bot` }}
            const userOn = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle("WithersBot Commands")
            .setDescription("Command: user")
            .addFields(
                { name: "Username", value: `${user.username}`},
                { name : "Id", value: `${user.id}`},
                { name: "Created on", value: `${cre.toDateString()}`},
                { name: "Tag", value: `${user.tag}`},
                { name: "Bot?", value: `${bo}`}
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