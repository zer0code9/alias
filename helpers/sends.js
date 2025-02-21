const { colorEmbed, emojiType } = require('../config');
const { Message, ChatInputCommandInteraction, EmbedBuilder, GuildMember } = require('discord.js');
const AliasEmbeds = require('./embeds');
const AliasUtils = require('./utils');
const alias = require('../client');

module.exports = class AliasSends {
    /**
     * 
     * @param {Message | ChatInputCommandInteraction} type 
     * @param {EmbedBuilder} Embed 
     */
    static sendEmbed(type, Embed) {
        if (type.type == 0) {
            type.channel.send({ embeds: [Embed] });
        } else if (type.type == 2) {
            type.reply({ embeds: [Embed], ephemeral: true });
        }
    }

    /**
     * 
     * @param {Message | ChatInputCommandInteraction} type 
     * @param {EmbedBuilder} Embed 
     */
    static sendEmbedAlias(type, Embed) {
        const channelAlias = AliasUtils.getAliasChannel(type);
        if (!channelAlias) return;
        if (type.type == 0) {
            channelAlias.send({ embeds: [Embed] });
        } else if (type.type == 2) {
            channelAlias.reply({ embeds: [Embed], ephemeral: true });
        }
    }

    /**
     * 
     * @param {GuildMember} member 
     * @param {EmbedBuilder} Embed 
     */
    static sendEmbedUser(member, Embed) {
        if (member.user.bot) return;
        alias.users.send(member.user.id, { embeds: [Embed] })
    }

    /**
     * 
     * @param {Message | ChatInputCommandInteraction} type 
     * @param {String} name 
     */
    static sendError(type, name) {
        const Error = AliasEmbeds.embedError(colorEmbed.warning, "ERROR", emojiType.warning, [
            { name: `Command Failed`, value: `<@${type.member.user.id}>, the command \'${name}\' you ordered failed \nYou can retry the command` },
            { name: `If it still fails`, value: `We will see it and fix it or you can send an issue` }
        ])
        this.sendEmbed(type, Error);
    }

    /**
     * 
     * @param {Message | ChatInputCommandInteraction} type 
     * @param {String} name 
     */
    static sendErrorAlias(type, name) {
        const Error = AliasEmbeds.embedError(colorEmbed.warning, "ERROR", emojiType.warning, [
            { name: `Command Failed`, value: `<@${type.member.user.id}>, the command \'${name}\' you ordered failed \nYou can retry the command` },
            { name: `If it still fails`, value: `We will see it and fix it or you can send an issue` }
        ])
        this.sendEmbedAlias(type, Error);
    }
}