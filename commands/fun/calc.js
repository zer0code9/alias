const { prefix, by } = require("../../config.json");
const { MessageEmbed } = require("discord.js");
const { Wronganswer, Invalid, Unabled, Unknown } = require('../../errors');
function bcalculator(msg, args, example) {
    let equation = args.join(" ");

    if (!equation) return Invalid(msg, `No Equation`, `I need an equation`, `${example}`);

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
                if (someError) return Unabled(msg, `You used \`${incorrect}\``, `This key can't be used`);
            }
        }

        answer = eval(equation);
        equation.replace("", " ");
        const Calc = new MessageEmbed()
        .setColor('#00ff00')
        .setTitle(`:white_check_mark: CALCULATED :abacus:`)
        .addFields(
            { name: "Calculation:", value: `\`\`\`${equation} = ${answer}\`\`\`` }
        )
        .setFooter({ text: `${by} helps` })
        msg.channel.send({ embeds: [Calc] });

    } catch (error) {
        msg.channel.send(`Oh no, something went wrong\n\`\`\`${error}\`\`\``);
    }
}
module.exports = {
    name: "calc",
    description: "Use the basic calculator on Alias",
    example: prefix + "calc [expression]",
    type: "fun",
    execute(msg, args){
        bcalculator(msg, args, this.example);
    }
}