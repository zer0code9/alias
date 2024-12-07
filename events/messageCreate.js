const { bot } = require('../config');
const { Message } = require('discord.js');
const AliasCancels = require("../helpers/cancels");
const AliasSends = require("../helpers/sends");
const { permissions } = require('../helpers/collectors');
const AliasDB = require('../database/functions');
const alias = require('../client');

/**
 * 
 * @param {Message} msg
 */
module.exports = async (msg) => {
    if (msg.type === "DM" || msg.author.bot) return;
    if (!msg.content.toLowerCase().startsWith(bot.prefix)) return;

    const args = msg.content.slice(bot.prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    if (!commandName) return;
    
    const command = await alias.msgCommands.get(commandName);
    if (!command || !command.settings.existMsg) return;

	let noperm = false;
    if (command.settings.memPerms) {
        command.settings.memPerms.forEach(perm => {
            if (!msg.member.permissions.has(permissions[perm])) {
                const Perm = AliasCancels.permission(`No Permission`, `<@${msg.member.user.id}> doesn't have the permission to ${perm.toLowerCase()}`);
				AliasSends.sendEmbed(msg, Perm);
                noperm = true;
            }
        });
        if (noperm) { 
            msg.delete();
            return;
        }
    }

    try {
        AliasDB.userLogin(msg.member.user);
		AliasDB.guildLogin(msg.member.guild);
		AliasDB.memberLogin(msg.member);
        command.msgRun(msg, args);
    } catch (error) {
        console.error(error);
        msg.channel.send({ content: `There was an error while executing the command!` });
        msg.delete();
        return;
    }
}