const { prefix, by } = require("/home/asorinus/workspace/myFirstProject/splashy/SplashBot/config.json");
const Discord = require("discord.js");
function bcalculator(msg, args) {
    let equation = args.join(" ");

    const noCalc = new Discord.MessageEmbed()
    .setColor("#ff0000")
    .setTitle(":warning: CANCELED :warning:")
    .addFields(
        { name: "No Equation", value: `I need an equation to solve it.`},
        { name: "Command:", value: `\`${prefix}calc [equation]\``}
    )
    .setFooter(`${by} helps`)
    if (!equation) return msg.channel.send(noCalc);

    equation = equation
        .replace(/\n/g, "")
        .replace(/`/g, "")
        .replace(/--/g, " - -")
        .replace(/,/g, "")
        .replace(/\[/g, "(")
        .replace(/\]/g, ")");

    try {
        let someError = false;
        let incorrect;

        for (const letter of equation.replace(" ", "")) {
            if (!(".1234567890+-*/%() ".split("").includes(letter))) {
                someError = true;
                incorrect = letter;
                return;
            }
        }

        const Error = new Discord.MessageEmbed()
        .setColor("#ff0000")
        .setTitle(`:warning: CANCELED :warning:`)
        .addFields(
        { name: `You used \`${incorrect}\``, value: `I need a valid channel name` },
        { name: "Command Canceled", value: `Wrong usage cancelation`}
        )
        .setFooter(`${by} helps`)
        if (someError) return msg.channel.send(Error);

        answer = eval(equation);
        equation.replace("", " ");
        msg.channel.send(`${equation} = \`${answer}\``);

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