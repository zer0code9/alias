const { bot, event } = require('../config.js');
const AliasCancels = require("../helpers/cancels.js");
const AliasUtils = require("../helpers/utils.js");
const { permissions } = require('../helpers/collectors.js');

module.exports = async (alias, guild) => {
    if (!event.guildDel) return;
    if (!guild.available) return;
    if (!guild.members.cache.has(guild.ownerId)) console.log(":)");
    console.log(':)');
}