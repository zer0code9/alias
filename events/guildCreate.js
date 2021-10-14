const CONFIG = require('../config.json');
const { MessageEmbed } = require('discord.js');

module.exports = async (bot, guild) => {
    if (!guild.available) return;
    if (!guild.owner && guild.ownerID) await console.log(":/");
    console.log(':)');
}