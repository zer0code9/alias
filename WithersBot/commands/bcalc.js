const { prefix } = require("/home/asorinus/workspace/myFirstProject/WithersWorld/WithersBot/config.json");
const Discord = require("discord.js");
function bcalculator(msg, args) {
    if (args.length == 0) {
        const noCalc = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("WithersBot Commands")
        .setDescription(`Command: calc`)
        .addFields({ name: "Command:", value: `${prefix}calc [equation]`})
        .setFooter('WithersBot helps')
        msg.channel.send(noCalc);
        return;
    }

    let equation = args.join(" ");
    equation = equation
        .replace(/\n/g, "")
        .replace(/`/g, "")
        .replace(/--/g, " - -")
        .replace(/,/g, "")
        .replace(/\[/g, "(")
        .replace(/\]/g, ")");

    try {
        let someError = false;

        for (const letter of equation.replace(" ", "")) {
            if (!(".1234567890+-*/%() ".split("").includes(letter))) {
                someError = true;
                return;
            }
        }

        if (someError) {
            msg.channel.send("❌ You can only use: `1234567890+-*/%()`❌");
        } else {
            answer = eval(equation);
            msg.channel.send(`${equation} = \`${answer}\``);
        }
    } catch (error) {
        msg.channel.send(`Oh no, something went wrong\n\`\`\`${error}\`\`\``);
    }
}
module.exports = {
    name: "calc",
    description: "Use the basic calculator on WithersBot",
    example: prefix + "calc [expression]",
    execute(msg, args){
        bcalculator(msg, args);
    }
}