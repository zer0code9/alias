const { prefix } = require("/home/asorinus/workspace/myFirstProject/WithersWorld/WithersBot/config.json");
const Discord = require("discord.js");

function sayIt(msg, args) {
    const string = args.slice(1).join(" ");
    var enable;
    if (args[0] == "diasble"){enble == false; msg.channel.send("Disabled")} else {if (args[0] == "enable"){enable == true; msg.channel.send("Disabled")}}
    if (enable == false) {msg.channel.send("The command 'say' has been disable")} else
    if (args == 0){
        const noSay = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("WithersBot Commands")
        .setDescription(`Command: say`)
        .addFields(
            { name: "Command:", value: `\n\`\`\`${prefix}say [sentence]\`\`\``}
        )
        .setFooter('WithersBot helps')
    msg.channel.send(noSay);
        return;
    }else {
        if (args != 0) {
        const message = args.join(" ");
        msg.channel.send(`${message}`);
        msg.delete();
        }
    }
}

module.exports = {
    name: "say",
    description: "Make WithersBot say something",
    example: prefix + "say [sentence]",
    type: "info",
    execute(msg, args){
        sayIt(msg, args)
    }
}