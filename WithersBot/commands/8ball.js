const { prefix } = require("/home/asorinus/workspace/myFirstProject/WithersWorld/WithersBot/config.json");
const Discord = require("discord.js");
function abc(msg, args) {
    var types = ["no", "yes", "maybe", "sometimes", "never"];
    var answer = types.random();
    msg.channel.reply(answer);
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