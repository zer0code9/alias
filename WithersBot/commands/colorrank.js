const { prefix } = require("/home/asorinus/workspace/myFirstProject/WithersWorld/WithersBot/config.json");
const Discord = require("discord.js");
function abc(msg, args) {
    if (args == 0) {
        const no = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("WithersBot Commands")
        .setDescription("Command: colorrank")
        .addFields(
            { name: "Command", value: `Change the color of a role\n\`\`\`${prefix}colorrank [role] [color]\`\`\``}
        )
        .setFooter("WithersBot helps")
        msg.channel.send(no);
    } else {
        if (args !=0) {
            const role = msg.mentions.roles.first();
            const yes = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle("WithersBot Commands")
            .setDescription("Command: colorrank")
            .addFields(
                { name: "here", value: `here`}
            )
            .setFooter("WithersBot helps")
            msg.channel.send(yes);
        }
    }
}

module.exports = {
    name: "",
    description: "",
    example: prefix + "",
    type: "",
    execute(msg, args) {
        abc(msg, args);
    }
}