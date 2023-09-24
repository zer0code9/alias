const { colorEmbed, emojiType } = require('../config.js');
const AliasEmbeds = require('./embeds');
const AliasUtils = require('./utils');

module.exports = class AliasCancels {
    static error1(name, value, emoji) {
        const Error = AliasEmbeds.embedError(colorEmbed.error, "CANCELED", emoji, [
            { name: `${name}`, value: `${value}` }
        ])
        return Error;
    }

    static error2(name1, value1, name2, value2, emoji) {
        const Error = AliasEmbeds.embedError(colorEmbed.error, "CANCELED", emoji, [
            { name: `${name1}`, value: `${value1}` },
            { name: `${name2}`, value: `${value2}` }
        ])
        return Error;
    }

    //static invalid(type, name, value, use) { return AliasUtils.sendEmbed(type, AliasCancels.error2(name, value, `Command`, `\`${use}\``, emojiType.warning)); }
    //static unabled(type, name, value) { return AliasUtils.sendEmbed(type, AliasCancels.error2(name, value, `Command Canceled`, `Unabled To Do cancelation`, emojiType.warning)); }
    //static permission(type, name, value) { return AliasUtils.sendEmbed(type, AliasCancels.error2(name, value, `Command Canceled`, `Missing Permission cancelation`, emojiType.warning)); }

    static cancel(type) { return AliasUtils.sendEmbed(type, AliasCancels.error1(`Command Canceled`, `Ordered cancelation`, emojiType.stop)); }

    static timeout(type) { return AliasUtils.sendEmbed(type, AliasCancels.error1(`Command Canceled`, `Timeout cancelation`, emojiType.error)); }


    static invalid(name, value, use) { return AliasCancels.error2(name, value, `Command`, `\`${use}\``, emojiType.warning); }
    static unabled(name, value) { return AliasCancels.error2(name, value, `Command Canceled`, `Unabled To Do cancelation`, emojiType.warning); }
    static permission(name, value) { return AliasCancels.error2(name, value, `Command Canceled`, `Missing Permission cancelation`, emojiType.warning); }
}