const { bot, event } = require('../config');
const { Message } = require('discord.js');
const AliasCancels = require("../helpers/cancels");
const AliasUtils = require("../helpers/utils");
const { permissions } = require('../helpers/collectors');
const AliasDB = require('../database/functions');
const alias = require('../client');

/**
 * 
 * @param {Message} msg 
 * @returns 
 */
module.exports = async (msg) => {
    if (!event.messageCre) return;
    if (msg.type === "DM" || msg.author.bot) return;
    if (!msg.content.toLowerCase().startsWith(bot.prefix)) return;

    const args = msg.content.slice(bot.prefix.length).trim().split(/ +/);

    const commandName = args.shift().toLowerCase();
    if (!commandName) return;
    
    const command = await alias.msgCommands.get(commandName);
    if (!command || !command.settings.existMsg) return;

    if (command.memPerms && !AliasUtils.hasPermission(msg.member, command)) {
        msg.channel.send({ content: `<@${msg.member.user.id}>, you don't have all the needed permissions!` });
        msg.delete();
        return;
    }

    try {
        command.msgRun(msg, args);
    } catch (error) {
        console.error(error);
        msg.channel.send({ content: `There was an error while executing the command!` });
        msg.delete();
        return;
    }
}