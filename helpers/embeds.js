const { bot, colorEmbed, emojiType } = require('../config.js');
const { EmbedBuilder } = require('discord.js');

module.exports = class AliasEmbeds {
    static embed(color, title, description, fields, footer) {
        const Embed = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .addFields(fields)
        .setFooter({ text: footer })
        return Embed;
    }

    static error2(name1, value1, name2, value2, emoji) {
        const Error = AliasEmbeds.embedError(colorEmbed.error, "CANCELED", emoji, [
            { name: `${name1}`, value: `${value1}` },
            { name: `${name2}`, value: `${value2}` }
        ])
        return Error;
    }

    static embedSuccess(title, emoji1, emoji2, description, fields) { 
        return this.embed(colorEmbed.success, `:${emojiType.success}: ${title} :${emoji1}::${emoji2}:`, description, fields, `${bot.name} helps`);
    }

    static embedError(color, title, emoji, fields) {
        return this.embed(color, `:${emoji}: ${title} :${emoji}:`, `Error`, fields, `${bot.name} helps`);
    }

    static embedInfo(title, emoji, fields) {
        return this.embed(colorEmbed.neutral, `:${emoji}: ${title} :${emoji}:`, `Info`, fields, `${bot.name} helps`); 
    }

    static error(name1, value1, name2, value2, emoji) {
        const Error = this.embedError(colorEmbed.error, "CANCELED", emoji, [
            { name: `${name1}`, value: `${value1}` },
            { name: `${name2}`, value: `${value2}` }
        ])
        return Error;
    }

    static invalid(name, value, use) {
        return this.error(name, value, `Command`, `\`${use}\``, emojiType.warning);
    }

    static unabled(name, value) {
        return this.error(name, value, `Command Canceled`, `Unabled To Do cancelation`, emojiType.warning);
    }

    static permission(name, value) {
        return this.error(name, value, `Command Canceled`, `Missing Permission cancelation`, emojiType.warning);
    }
}