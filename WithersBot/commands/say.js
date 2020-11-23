const { prefix } = require("/home/asorinus/workspace/myFirstProject/WithersWorld/WithersBot/config.json");
const Discord = require("discord.js");

function sayIt(msg, args) {
    const string = args.slice(1).join(" ");
    if (args == 0){
        msg.channel.send("**How to use**\n```zsay + [word]```");
        const noSay = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("WithersBot Commands")
        .setDescription(`Command: say`)
        .addFields({ name: "Command:", value: `${prefix}say + [word]`})
        .setFooter('WithersBot helps')
    msg.channel.send(noSay);
        return;
    }else {
        if (args == "+") {
        msg.channel.send(`${string}`);
        msg.delete();
        }
    }
}

module.exports = {
    name: "say",
    description: "Make WithersBot say something",
    example: prefix + "say + [word]",
    execute(msg, args){
        sayIt(msg, args)
    }
}