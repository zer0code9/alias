const { prefix } = require("/home/asorinus/workspace/myFirstProject/WithersWorld/WithersBot/config.json");
const Discord = require("discord.js");
function abc(msg, args) {
    if(!msg.guild.me.hasPermission("MANAGE_NICKNAMES")) return msg.channel.send(`I dont have the permission to change the nickname of someone, ${msg.author}`)
    const user = msg.mentions.users.first();
    if (user) {

        if (!msg.member.hasPermission("MANAGE_NICKNAMES")) return msg.channel.send(`You don't have the permission to nickname of someone, ${msg.author}`)
        const name = args.slice(1).join(" ");
        if (!name) return name = `${user.username}`
        user.setNickname(`${name}`)
            const change = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle("WithersBot Commands")
            .setDescription("Command: nick")
            .addFields(
                { name: `New Nickname for ${user.username}`, value: `New nickname: ${name}`}
            )
            .setFooter("WithersBot helps")
            msg.channel.send(change);

    } else {

        if (!msg.member.hasPermission("CHANGE_NICKNAME")) return msg.channel.send(`You don't have the permission to change your own nickname, ${msg.author}`)
        const name = args.join(" ");
        if (!name) return name = `${msg.author.name}`
        msg.member.setNickname(`${name}`)
            const newName = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle("WithersBot Commands")
            .setDescription("Command: nick")
            .addFields(
                { name: "New Nickname", value: `New nickname: ${name}`}
            )
            .setFooter("WithersBot helps")
            msg.channel.send(newName);
    }
}

module.exports = {
    name: "nick",
    description: "Change the nickname of a member",
    example: prefix + "nick [member] [name]",
    type: "moderation",
    execute(msg, args) {
        abc(msg, args);
    }
}