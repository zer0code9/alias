const { emojiType } = require('../../config');
const { ApplicationCommandOptionType, EmbedBuilder,Message, ChatInputCommandInteraction } = require('discord.js');
const AliasEmbeds = require("../../helpers/embeds");
const AliasUtils = require("../../helpers/utils");
const AliasSends = require("../../helpers/sends");

module.exports = {
    settings: {
        name: "calc",
        idDB: "922500535916",
        description: "Use the basic calculator on Alias",
        category: "Utility",
        botPerms: [],
        memPerms: [],
        existMsg: true,
        existInt: true,
        type: 1,
        options: [
            {
                name: "expression",
                description: "The expression to evaluate [string-phrase]",
                type: ApplicationCommandOptionType.String,
                specific: "string-phrase",
                required: true,
            }
        ]
    },

    /**
     * 
     * @param {Message} msg 
     * @param {String[]} args 
     */
    async msgRun(msg, args){
        const expression = args.join(" ");

        try {
            const Calc = await this.Calc(expression);
            AliasSends.sendEmbed(msg, Calc);
        } catch {
            AliasSends.sendError(msg, this.name);
        }
        msg.delete();
    },

    /**
     * 
     * @param {ChatInputCommandInteraction} int 
     */
    async intRun(int) {
        const expression = int.options.getString("expression");

        try {
            const Calc = await this.Calc(expression);
            AliasSends.sendEmbed(int, Calc);
        } catch {
            AliasSends.sendError(int, this.name);
        }
    },

    /**
     * 
     * @param {String} expression 
     * @returns {Promise<EmbedBuilder>}
     */
    async Calc(expression) {
        const settings = this.settings;
        if (!expression)
return AliasEmbeds.invalid(`No Expression`, `I need an expression \n(${settings.options[0].specific})`, AliasUtils.getUsage(this));

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
        if (someError) return AliasEmbeds.unabled(`Invalid Character`, `You used a character that can't be processed`);

        answer = eval(expression);
        expression = expression.replace("", " ");

        const Calc = AliasEmbeds.embedSuccess('CALCULATED', emojiType.fun, 'abacus', this.type, [
            { name: "Calculation:", value: `\`\`\`${expression} = ${answer}\`\`\`` }
        ])
        return Calc;
    }
}