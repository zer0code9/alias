const { bot, colorEmbed } = require("../config");
const { ApplicationCommandOptionType } = require('discord.js');
const AliasCancels = require("../helpers/cancels");
const AliasEmbeds = require("../helpers/embeds");
const AliasUtils = require("../helpers/utils");
const alias = require('../client');

module.exports = {
    name: "help",
    description: "Get help on the commands of " + bot.name,
    type: "Info",
    botPerms: [],
    memPerms: [],
    args: [
        { name: "command", type: "phrase", required: false }
    ],
    msgCommand: { exist: true, },
    intCommand: { exist: false, },
    settings: {
        existMsg: true,
        existInt: false,
        sub: false,
        options: [
            {
                name: "command",
                description: "The command to get info on",
                type: ApplicationCommandOptionType.String,
                required: false,
            }
        ]
    },

    async msgRun(msg, args){
        let docs = [];
        let list = ["moderation", "utility", "info"];
    
        if (list.includes(args[0]?.toLowerCase())) {
            for (const [name, description] of alias.commands) {
                if (args[0].toLowerCase() === description.type) {
                    docs.push({
                        name: bot.prefix + name + " [" + description.type + "]",
                        value: description.description + '```' + description.msgCommand.usage + '```' + "\nSlash Command: " + description.intCommand?.exist
                    });
                }
            }
            try {
                const Help = await this.Help(docs, args[0]);
                AliasUtils.sendEmbed(msg, Help);
            } catch {
                AliasUtils.sendError(msg, this.name);
            }
        }
        else if (args[0]) {
            for (const [name, description] of alias.commands) {
                if (args[0].toLowerCase() === name) {
                    docs.push({
                        name: bot.prefix + name + " [" + description.type + "]",
                        value: description.description + '```' + description.msgCommand.usage + '```' + "\nSlash Command: " + description.intCommand?.exist
                    });
                    break;
                }
            }
            try {
                const Help = await this.Help(docs, args[0]);
                AliasUtils.sendEmbed(msg, Help);
            } catch {
                AliasUtils.sendError(msg, this.name);
            }
        }
        else {
            for (const command of alias.commands) {
                docs.push({
                    name: bot.prefix + command.name + " [" + command.type + "]",
                    value: command.description + '```' + description.msgCommand.usage + '```' + "\nSlash Command: " + description.intCommand?.exist
                });
            }
            const docs1 = docs.slice(0, 24);
            const docs2 = docs.slice(25, docs.length)
            const Help1 = AliasEmbeds.embed(colorEmbed.success, `:mag: ${bot.name.toUpperCase()} COMMANDS :mag_right:`, this.type, docs1, `${bot.name} helps | (1/2)`)
            const Help2 = AliasEmbeds.embed(colorEmbed.success, `${bot.name.toUpperCase()} COMMANDS Continued`, this.type, docs2, `${bot.name} helps | (2/2)`)
            await alias.users.send(msg.member.user.id, { embeds: [Help1, Help2] })
        }

        msg.delete();
    },

    async Help(docs, search) {
        if (docs.length == 0) return AliasCancels.invalid(msg, `No Command or Category`, `I can't find the command or category ${search} \n(${this.args[0].type})`, this.msgCommand.usage);

        const Help = AliasEmbeds.embed(colorEmbed.success, `:mag: ${bot.name.toUpperCase()} COMMANDS :mag_right:`, this.type, docs, `${bot.name} helps`);
        return Help;
    }
}