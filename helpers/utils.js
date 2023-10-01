const { bot, colorEmbed, emojiType } = require('../config.js');
const AliasEmbeds = require('./embeds');
const AliasCollectors = require('./collectors');

module.exports = class AliasUtils {
    static userInteract(issuer, user) {
        if (issuer.user.id === user.user.id) return false;
        if (issuer.guild.ownerId === issuer.user.id) return true;
        if (issuer.guild.ownerId === user.user.id) return false;
        return issuer.roles.highest.position > user.roles.highest.position;
    }

    static sendEmbed(type, Embed) {
        if (type.type == 0) {
            type.channel.send({ embeds: [Embed] });
        } else if (type.type == 2) {
            type.reply({ embeds: [Embed], ephemeral: true });
        }
    }

    static sendEmbedAlias(type, Embed) {
        const channelAlias = AliasUtils.getAliasChannel(type);
        if (!channelAlias) return;
        channelAlias.send({ embeds: [Embed] });
    }

    static sendEmbedUser(alias, user, word, reason) {
        if (user.user.bot === true) return;

        const Embed = AliasEmbeds.embed(colorEmbed.neutral, `You got ${word}`, `This message is automatically sent when ${word}`, [
            { name: `Looks like you were ${word} from ${user.guild.name}`, value: `You won't be able to know who ${word} you` },
            { name: `You're ${word} because`, value: `\`\`\`${reason}\`\`\`` }
        ], `${bot.name} helps`)
        alias.users.send(user.user.id, { embeds: [Embed] })
    }

    static getAliasChannel(type) {
        let channelAlias = type.guild.channels.cache.find(c => c.name.toLowerCase() === "for-alias");
        //let guild = AliasUtils.getDoc('guilds', type.guild.id);
        if (!channelAlias) {
            const Warning = AliasEmbeds.embed(colorEmbed.warning, "No Alias Setup", "Setup", [
                { name: "Please set up the log channel for Alias", value: `\`${bot.prefix}setup\`` },
                { name: "Note", value: "Please don't change the name of the log channel \`for-alias\`" }
            ])
            AliasUtils.sendEmbed(type, Warning);
            return;
        }
        return channelAlias; //guild[0].modChannelId
    }

    static sendError(type, command) {
        const Error = AliasEmbeds.embedError(colorEmbed.warning, "ERROR", emojiType.warning, [
            { name: `Command Failed`, value: `<@${type.member.user.id}>, the command \'${command}\' you ordered failed \nYou can retry the command` },
            { name: `If it still fails`, value: `We will see it and fix it or you can send an issue` }
        ])
        AliasUtils.sendEmbed(type, Error);
    }

    static sendErrorAlias(type, command) {
        const Error = AliasEmbeds.embedError(colorEmbed.warning, "ERROR", emojiType.warning, [
            { name: `Command Failed`, value: `<@${type.member.user.id}>, the command \'${command}\' you ordered failed \nYou can retry the command` },
            { name: `If it still fails`, value: `We will see it and fix it or you can send an issue` }
        ])
        AliasUtils.sendEmbedAlias(type, Error);
    }

    static getValue(data) {
        if (!data.includes(':')) return data;
        return data.slice(data.indexOf(`:`) + 1, data.length);
    }

    static getDataType(data) {
        if (!data.includes(':')) return data;
        const type = data.slice(0, data.indexOf(`:`));
        return type;
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

    static getUsage(command, subname) {
        let cmd;
        let usage = bot.prefix + command.name;
        if (subname) cmd = command.settings.options.find(sub => sub.name == subname);
        else cmd = command.settings;
        usage += " " + cmd.name;
        cmd.options.forEach(option => {
            usage += " [" + option.name + ":";
            usage += AliasUtils.getTruncType(option.specific);
            if (!option.required) usage += "?"
            usage += "]";
        })
        return usage;
    }

    static getTruncType(type) {
        if (type == "channel") return "ch-me|id";
        else if (type == "role") return "ro-me|id";
        else if (type == "user") return "us-me|id";
        else return type.substring(0, 2);
    }

    static getType(type) {
        for (let option in AliasCollectors.optionType) {
            if (AliasCollectors.optionType[option] == type)
                return option;
        }
        return;
    }

    static hasPermission(user, command) {
        let has = true;
        command.memPerms.forEach(perm => {
            if (!user.permissions.has(AliasCollectors.permissions[perm])) {
                has = false;
            }
        });
        return has;
    }

    /*static hasRole(command) {
        let has = true;
        command.deniedRoles.forEach(role => {
            if ()
        })
    }*/

    static generateNumbers() {
        const characters = '1234567890';
        let result = "";
        for ( let i = 0; i <= 10; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }

    static generateId(first, guild) {
        var id = first;
        if (first.startsWith("g")) {
            id += guild.id.substring(0, 2);
            id += AliasUtils.generateNumbers().substring(0, 9);
        } else {
            id += AliasUtils.generateNumbers();
        }
    }

    static getDoc(collection, id) {
        let doc = db.getCollection(collection).find( { idD: { $gt: id } } );
        if (!doc) return;
        return doc;
    }
}