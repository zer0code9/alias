const { prefix, by } = require("../../config.json");
const Discord = require("discord.js");
function sayIt(msg, args) {
    if (!args) return;
    const string = args.slice(1).join(" ");
    var enable;
    if (args[0] == "diasble"){enable == false; msg.channel.send("Disabled")} else {if (args[0] == "enable"){enable == true; msg.channel.send("Enabled")}}
    if (enable == false) {msg.channel.send("The command 'say' has been disable")} else
    if (args == 0){
        const noSay = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`${by} Commands`)
        .setDescription(`Command: say`)
        .addFields(
            { name: "Command:", value: `\n\`\`\`${prefix}say [sentence]\`\`\``}
        )
        .setFooter({ text: `${by} helps` })
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
    description: "Make the bot say something",
    example: prefix + "say [sentence]",
    type: "fun",
    execute(msg, args){
        sayIt(msg, args)
    }
}