const { SlashCommandBuilder } = require('@discordjs/builders');
const { by } = require('../config.json');
const { MessageEmbed } = require('discord.js');
const { Invalid } = require('../errors');
const { timeDifference } = require('../functions');

//.addSubcommand(t => t.setName("").setDescription(""))
//else if (interaction.options.getSubcommand() === "") {temote = "";}
module.exports = {
    data: new SlashCommandBuilder()
    .setName("temote")
    .setDescription("Use the best type emotes to show your expressions!")
    .addSubcommand(t => t.setName("tableflip").setDescription("Flip the table!"))
    .addSubcommand(t => t.setName("untableflip").setDescription("Put that table back!"))
    .addSubcommand(t => t.setName("happyrun").setDescription("Run with happiness!"))
    .addSubcommand(t => t.setName("toosus").setDescription("Way too sus!"))
    ,

    async execute(interaction) {
        let temote = "";
        if (interaction.options.getSubcommand() === "tableflip") {temote = "(╯°□°)╯︵ ┻━┻";}
        else if (interaction.options.getSubcommand() === "untableflip") {temote = "┬─┬ノ(°_°ノ)";}
        else if (interaction.options.getSubcommand() === "happyrun") {temote = "ᕕ(ᐛ)ᕗ";}
        else if (interaction.options.getSubcommand() === "toosus") {temote = "(;¬_¬)";}
        interaction.reply(temote)
    }
}