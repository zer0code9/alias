const { bot, colorEmbed, emojiType } = require('../config.js');
const { EmbedBuilder } = require('discord.js');

module.exports = class AliasEmbeds {
    static embedFull(a, th, c, ti, d, fi, fo) {
        const Embed = new EmbedBuilder()
        .setAuthor(a)
        .setThumbnail(th)
        .setColor(c)
        .setTitle(ti)
        .setDescription(d)
        .addFields(
            fi
        )
        .setFooter({ text: fo })
        return Embed;
    }

    static embed(color, title, description, fields, footer) {
        const Embed = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .addFields(fields)
        .setFooter({ text: footer })
        return Embed;
    }

    static embedError(color, title, emoji, fields) { return AliasEmbeds.embed(color, `:${emoji}: ${title} :${emoji}:`, `Error`, fields, `${bot.name} helps`); }

    static embedInfo(title, emoji, fields) { return AliasEmbeds.embed(colorEmbed.neutral, `:${emoji}: ${title} :${emoji}:`, `Info`, fields, `${bot.name} helps`); }

    static embedSuccess(title, emoji1, emoji2, description, fields) { 
        return AliasEmbeds.embed(colorEmbed.success, `:${emojiType.success}: ${title} :${emoji1}::${emoji2}:`, description, fields, `${bot.name} helps`); }
}