const { bot, emojiType } = require('../../config.js');
const { ApplicationCommandOptionType } = require('discord.js');
const AliasCancels = require("../../helpers/cancels");
const AliasEmbeds = require("../../helpers/embeds");
const AliasUtils = require("../../helpers/utils");

module.exports = {
    name: "calc",
    id: "922500535916",
    description: "Use the basic calculator on Alias",
    type: "Utility",
    botPerms: [],
    memPerms: [],
    args: [
        { name: "equation", type: "phrase", required: true }
    ],
    msgCommand: { exist: true },
    intCommand: { exist: true },
    settings: {
        existMsg: true,
        existInt: true,
        sub: false,
        options: [
            {
                name: "expression",
                description: "The expression to evaluate [phrase]",
                type: ApplicationCommandOptionType.String,
                specific: "phrase",
                options: [],
                required: true,
            }
        ]
    },

    async msgRun(msg, args){
        const expression = args.join(" ");

        try {
            const Calc = await this.Calc(expression);
            AliasUtils.sendEmbed(msg, Calc);
        } catch {
            AliasUtils.sendError(msg, this.name);
        }
        msg.delete();
    },

    async intRun(int) {
        const expression = int.options.getString("expression");

        try {
            const Calc = await this.Calc(expression);
            AliasUtils.sendEmbed(int, Calc);
        } catch {
            AliasUtils.sendError(int, this.name);
        }
    },

    async Calc(expression) {
        const settings = this.settings;
        if (!expression)
return AliasCancels.invalid(`No Expression`, `I need an expression \n(${settings.options[0].specific})`, AliasUtils.getUsage(this));

        expression = expression
            .replace(/\n/g, "")
            .replace(/`/g, "")
            .replace(/--/g, " - -")
            .replace(/,/g, "")
            .replace(/\[/g, "(")
            .replace(/\]/g, ")");

        let someError = false;
        for (const letter of expression.replace(" ", "")) {
            if (!(".1234567890+-*/%() ".split("").includes(letter))) {
                someError = true;
            }
        }
        if (someError) return AliasCancels.unabled(`Invalid Character`, `You used a character that can't be processed`);

        answer = eval(expression);
        expression = expression.replace("", " ");

        const Calc = AliasEmbeds.embedSuccess('CALCULATED', emojiType.fun, 'abacus', this.type, [
            { name: "Calculation:", value: `\`\`\`${expression} = ${answer}\`\`\`` }
        ])
        return Calc;
    }
}