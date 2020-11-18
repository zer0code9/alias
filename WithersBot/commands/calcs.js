function bcalculator(msg, args) {
    if (args.length == 0) {
        msg.channel.send("**How to use**\n```pc-calc [expression]```");
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
    execute(msg, args){
        bcalculator(msg, args);
    }
}