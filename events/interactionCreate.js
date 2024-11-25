const { event } = require('../config');
const { ChatInputCommandInteraction } = require('discord.js');
const AliasCancels = require("../helpers/cancels");
const { permissions } = require('../helpers/collectors');
const AliasDB = require('../database/functions');
const alias = require('../client');

/**
 * 
 * @param {ChatInputCommandInteraction} int 
 * @returns 
 */
module.exports = async (int) => {
	if (!event.interactionCre) return;
    if (!int.isCommand()) return;

	const command = await alias.intCommands.get(int.commandName);
	if (!command || !command.settings.existInt) return;

	let noperm = false;
    if (command.memPerms) {
        command.memPerms.forEach(perm => {
            if (!int.member.permissions.has(permissions[perm])) {
                const Perm = AliasCancels.permission(`No Permission`, `<@${int.member.user.id}> doesn't have the permission to ${perm.toLowerCase()}`);
				AliasUtils.sendEmbed(int, Perm);
                noperm = true;
            }
        });
        if (noperm) { return; }
    }
	
	try {
		AliasDB.userLogin(int.member.user);
		AliasDB.guildLogin(int.member.guild);
		AliasDB.memberLogin(int.member);
		await command.intRun(int);
	} catch (error) {
		console.error(error);
		int.reply({ content: `There was an error while executing the command!`, ephemeral: true });
		return;
	}
}