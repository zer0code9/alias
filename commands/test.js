const { prefix, by } = require("/home/asorinus/workspace/myFirstProject/splashy/SplashBot/config.json");
const Discord = require("discord.js");
async function abc(msg, args) {
    const test = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("WithersBot Commands")
        .setDescription("Command: test")
        .addFields(
            { name: "Test", value: `test`},
            { name: "Ok", value: "ok"}
        )
        .setFooter("WithersBot helps")
        msg.channel.send(test);
        
    const option = args;
    switch (option) {
        case "test":
            const change = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle("WithersBot Commands")
            .setDescription("Command: ")
            .addFields(
                { name: "Command", value: `here\n\`\`\`${prefix}\`\`\``}
            )
            .setFooter("WithersBot helps")
            msg.channel.send(change);
            break;
        case "ok":
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