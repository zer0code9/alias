const { prefix } = require("/home/asorinus/workspace/myFirstProject/WithersWorld/WithersBot/config.json");
const Discord = require("discord.js");
async function abc(msg, args) {
    const test = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("WithersBot Commands")
        .setDescription("Command: test")
        .addFields(
            { name: "Test", value: `test`}
        )
        .setFooter("WithersBot helps")
        msg.channel.send(test);
        setTimeout(function() {
            
        })
    const name = await args.slice(1).join(" ");
    if (name) {
        const change = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("WithersBot Commands")
        .setDescription("Command: ")
        .addFields(
            { name: "Command", value: `here\n\`\`\`${prefix}\`\`\``}
        )
        .setFooter("WithersBot helps")
        msg.channel.send(change);
    } else {
            const no = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle("WithersBot Commands")
            .setDescription("Command: ")
            .addFields(
                { name: "here", value: `here`}
            )
            .setFooter("WithersBot helps")
            msg.channel.send(no);
    }
}

module.exports = {
    name: "test",
    description: "test",
    example: prefix + "test",
    type: "test",
    execute(msg, args) {
        abc(msg, args);
    }
}