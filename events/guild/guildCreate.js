const { bot, event } = require('../../config.js');
const { EmbedBuilder } = require('discord.js')
const AliasCancels = require("../../helpers/cancels");
const AliasUtils = require("../../helpers/utils");
const AliasEmbeds = require("../../helpers/embeds");
const { permissions } = require('../../helpers/collectors');

module.exports = async (alias, guild) => {
    if (!event.guildCre) return;
    if (!guild.available) return;
    if (!guild.members.cache.has(guild.ownerId));
}