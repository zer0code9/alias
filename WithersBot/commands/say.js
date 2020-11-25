const { prefix } = require("/home/asorinus/workspace/myFirstProject/WithersWorld/WithersBot/config.json");
const Discord = require("discord.js");

function sayIt(msg, args) {
    const string = args.slice(1).join(" ");
    if (args == 0){
        const noSay = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("WithersBot Commands")
        .setDescription(`Command: say`)
        .addFields(
            { name: "Command:", value: `\n\`\`\`$${prefix}say [word]\`\`\``},
            { name: "Only one word can be used", value: "More in the future :D"}
        )
        .setFooter('WithersBot helps')
    msg.channel.send(noSay);
    msg.channel.send(`${args}`);
    msg.delete();
        return;
    }else {
        if (args == "do") {
        msg.channel.send(`${args}`);
        msg.delete();
        }
    }
}

module.exports = {
    name: "say",
    description: "Make WithersBot say something",
    example: prefix + "say [word]",
    execute(msg, args){
        sayIt(msg, args)
    }
}