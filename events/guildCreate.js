const { event } = require('../config.js');
const AliasCancels = require("../helpers/cancels");
const { permissions } = require('../helpers/collectors');
const AliasDB = require('../database/functions');

module.exports = async (alias, guild) => {
    if (!event.guildCre) return;
    if (!guild.available) return;
    if (!guild.members.cache.has(guild.ownerId));

    try {
		AliasDB.guildLogin(guild);
	} catch (error) {
		console.error(error);
		return;
	}
}