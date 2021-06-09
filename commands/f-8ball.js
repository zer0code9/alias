const { prefix, by } = require("./../config.json");
const Discord = require("discord.js");
function abc(msg, args) {
    var num = Math.floor(Math.random() * 5) + 1;
    var answer;
    if (num == 1){answer = "no"}
    if (num == 2){answer = "yes"}
    if (num == 3){answer = "maybe"}
    if (num == 4){answer = "sometimes"}
    if (num == 5){answer = "never"}
    msg.channel.send(answer);
    /*if (args == 0) {
        const no = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("WithersBot Commands")
        .setDescription("Command: ")
        .addFields(
            { name: "Command", value: `here\n\`\`\`${prefix}\`\`\``}
        )
        .setFooter("WithersBot helps")
        msg.channel.send(no);
    } else {
        if (args !=0) {
            const yes = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle("WithersBot Commands")
            .setDescription("Command: ")
            .addFields(
                { name: "here", value: `here`}
            )
            .setFooter("WithersBot helps")
            msg.channel.send(yes);
        }
    }*/
}

module.exports = {
    name: "8ball",
    description: "The 8ball you love!",
    example: prefix + "8ball",
    type: "fun",
    execute(msg, args) {
        abc(msg, args);
    }
}