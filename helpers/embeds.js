const { bot, colorEmbed, emojiType } = require('../config.js');
const { EmbedBuilder } = require('discord.js');

module.exports = class AliasEmbeds {
    /**
     * 
     * @param {String} color 
     * @param {String} title 
     * @param {String} description 
     * @param {Array} fields 
     * @param {String} footer 
     * @returns {EmbedBuilder}
     */
    static embed(color, title, description, fields, footer) {
        const Embed = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .addFields(fields)
        .setFooter({ text: footer })
        return Embed;
    }

    /**
     * 
     * @param {String} title 
     * @param {String} emoji1 
     * @param {String} emoji2 
     * @param {String} description 
     * @param {Array} fields 
     * @returns {EmbedBuilder}
     */
    static embedSuccess(title, emoji1, emoji2, description, fields) { 
        return this.embed(colorEmbed.success, `:${emojiType.success}: ${title} :${emoji1}::${emoji2}:`, description, fields, `${bot.name} helps`);
    }

    /**
     * 
     * @param {String} color 
     * @param {String} title 
     * @param {String} emoji 
     * @param {Array} fields 
     * @returns {EmbedBuilder}
     */
    static embedError(color, title, emoji, fields) {
        return this.embed(color, `:${emoji}: ${title} :${emoji}:`, `Error`, fields, `${bot.name} helps`);
    }

    /**
     * 
     * @param {String} title 
     * @param {String} emoji 
     * @param {Array} fields 
     * @returns {EmbedBuilder}
     */
    static embedInfo(title, emoji, fields) {
        return this.embed(colorEmbed.neutral, `:${emoji}: ${title} :${emoji}:`, `Info`, fields, `${bot.name} helps`); 
    }

    /**
     * 
     * @param {String} color
     * @param {String} name1 
     * @param {String} value1 
     * @param {String} name2 
     * @param {String} value2 
     * @param {String} emoji 
     * @returns {EmbedBuilder} 
     */
    static error(color, name1, value1, name2, value2, emoji) {
        const Error = this.embedError(color, "CANCELED", emoji, [
            { name: `${name1}`, value: `${value1}` },
            { name: `${name2}`, value: `${value2}` }
        ])
        return Error;
    }

    /**
     * 
     * @param {String} name 
     * @param {String} value 
     * @param {String} use 
     * @returns {EmbedBuilder} 
     */
    static invalid(name, value, use) {
        return this.error(colorEmbed.error, name, value, `Command Canceled`, `Invalid Argument cancelation:\`${use}\``, emojiType.error);
    }

    /**
     * 
     * @param {String} name 
     * @param {String} value 
     * @returns {EmbedBuilder} 
     */
    static unabled(name, value) {
        return this.error(colorEmbed.warning, name, value, `Command Canceled`, `Unabled To Do cancelation`, emojiType.warning);
    }

    /**
     * 
     * @param {String} name 
     * @param {String} value 
     * @returns {EmbedBuilder} 
     */
    static permission(name, value) {
        return this.error(colorEmbed.stop, name, value, `Command Canceled`, `Missing Permission cancelation`, emojiType.stop);
    }
}