const { bot, colorEmbed } = require('../config');
const { Message, ChatInputCommandInteraction, EmbedBuilder, GuildMember, GuildChannel } = require('discord.js');
const AliasEmbeds = require('./embeds');
const AliasCollectors = require('./collectors');
const AliasSends = require('./sends');

module.exports = class AliasUtils {
    /**
     * 
     * @param {GuildMember} issuer 
     * @param {GuildMember} member 
     * @returns {Boolean}
     */
    static userInteract(issuer, member) {
        if (issuer.user.id === member.user.id) return false;
        if (issuer.guild.ownerId === issuer.user.id) return true;
        if (issuer.guild.ownerId === member.user.id) return false;
        return issuer.roles.highest.position > member.roles.highest.position;
    }

    /**
     * 
     * @param {Message | ChatInputCommandInteraction} type 
     * @returns {GuildChannel | undefined}
     */
    static getAliasChannel(type) {
        let channelAlias = type.guild.channels.cache.find(c => c.name.toLowerCase() === "for-alias");
        if (!channelAlias) {
            const Warning = AliasEmbeds.embed(colorEmbed.warning, "No Alias Setup", "Setup", [
                { name: "Please set up the log channel for Alias", value: `\`${bot.prefix}setup\`` },
                { name: "Note", value: "Please don't change the name of the log channel \`for-alias\`" }
            ])
            AliasSends.sendEmbed(type, Warning);
            return;
        }
        return channelAlias;
    }

    /**
     * 
     * @param {GuildMember} member 
     * @param {String} word 
     * @param {String} reason 
     * @returns {EmbedBuilder}
     */
    static getMesage(member, word, reason) {
        const Message = AliasEmbeds.embed(colorEmbed.neutral, `You got ${word}`, `This message is automatically sent when ${word}`, [
            { name: `Looks like you were ${word} from ${member.guild.name}`, value: `You won't be able to know who ${word} you` },
            { name: `You're ${word} because`, value: `\`\`\`${reason}\`\`\`` }
        ], `${bot.name} helps`)
        return Message;
    }

    /**
     * 
     * @param {String} data 
     * @returns {String}
     */
    static getValue(data) {
        if (!data.includes(':')) return data;
        return data.slice(data.indexOf(`:`) + 1, data.length);
    }

    /**
     * 
     * @param {String} data 
     * @returns {String}
     */
    static getDataType(data) {
        if (!data.includes(':')) return data;
        return data.slice(0, data.indexOf(`:`));
    }
    
    static getSplitedValue(value) {
        if (!value.includes(bot.seperator)) return value;
        const parts = value.split(bot.seperator);
        let newValue = "";
        parts.forEach(part => {
            newValue += part + " "
        });
        return newValue;
    }

    static getUsage(command, subcommand, subsubcommand) {
        let cmd;
        let usage = bot.prefix + command.name;
        if (subname) {
            cmd = command.settings.options.find(sub => sub.name == subcommand);
            usage += " " + cmd.name;
            if (subsubcommand) {
                cmd = cmd.options.find(sub => sub.name == subsubcommand);
                usage += " " + cmd.name;
            }
        }
        else cmd = command.settings;
        cmd.options.forEach(option => {
            usage += " [" + option.name + ": " + option.specific;
            if (!option.required) usage += "?";
            usage += "]";
        })
        return usage;
    }

    static getType(type) {
        for (let option in AliasCollectors.optionType) {
            if (AliasCollectors.optionType[option] == type)
                return option;
        }
        return;
    }

    static generateNumbers() {
        const characters = '1234567890';
        let result = "";
        for ( let i = 0; i < 10; i++ )
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        return result;
    }

    static generateId(type, adder) {
        return type + adder?.substring(0, 2) + AliasUtils.generateNumbers();
    }
}