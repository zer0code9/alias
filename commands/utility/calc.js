const { bot, emojiType } = require('../../config.js');
const { ApplicationCommandOptionType } = require('discord.js');
const AliasCancels = require("../../helpers/cancels");
const AliasEmbeds = require("../../helpers/embeds");
const AliasUtils = require("../../helpers/utils");

module.exports = {
    name: "calc",
    description: "Use the basic calculator on Alias",
    type: "Utility",
    botPerms: [],
    memPerms: [],
    args: [
        { name: "equation", type: "phrase", required: true }
    ],
    msgCommand: {
        exist: true,
        usage: bot.prefix + "calc [expression:ph]"
    },
    intCommand: {
        exist: false,
        options: [
            {
                name: "expression",
                description: "The expression to evaluate",
                type: ApplicationCommandOptionType.String,
                required: true,
            }
        ]
    },

    async msgRun(msg, args){
        let equation = args.join(" ");

        try {
            const Calc = await this.Calc(equation);
            AliasUtils.sendEmbed(msg, Calc);
        } catch {
            AliasUtils.sendError(msg, this.name);
        }
        msg.delete();
    },

    async Calc(equation) {
        if (!equation) return AliasCancels.invalid(`No Expression`, `I need an expression \n(${this.args[0].type})`, this.msgCommand.usage);

        equation = equation
            .replace(/\n/g, "")
            .replace(/`/g, "")
            .replace(/--/g, " - -")
            .replace(/,/g, "")
            .replace(/\[/g, "(")
            .replace(/\]/g, ")");

        let someError = false;
        for (const letter of equation.replace(" ", "")) {
            if (!(".1234567890+-*/%() ".split("").includes(letter))) {
                someError = true;
            }
        }
        if (someError) return AliasCancels.unabled(`Invalid Character`, `You used a character that can't be processed`);

        answer = eval(equation);
        equation = equation.replace("", " ");

        const Calc = AliasEmbeds.embedSuccess('CALCULATED', emojiType.fun, 'abacus', this.type, [
            { name: "Calculation:", value: `\`\`\`${equation} = ${answer}\`\`\`` }
        ])
        return Calc;
    }
}