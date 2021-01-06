const { prefix } = require("/home/asorinus/workspace/myFirstProject/WithersWorld/WithersBot/config.json");
const Discord = require("discord.js");
function abc(msg, args) {
    const pokemon = args.join(" ");
    if (pokemon) {
        const poke = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("WithersBot Commands")
        .setDescription("Command: ")
        .addFields(
            { name: "here", value: `here`}
        )
        .setFooter("WithersBot helps")
        msg.channel.send(poke);
    } else {
        const no = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("WithersBot Commands")
        .setDescription("Command: ")
        .addFields(
            { name: "Command", value: `here\n\`\`\`${prefix}\`\`\``}
        )
        .setFooter("WithersBot helps")
        msg.channel.send(no);
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