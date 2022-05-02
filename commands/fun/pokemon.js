const { prefix, by } = require("../../config.json");
const Discord = require("discord.js");
//const pokeAPI = require('https://pokeapi.co/api/v2/pokemon/')
function abc(msg, args) {
    const pokename = args.join(" ");
    if (pokemon) {
        //const pokemon = pokeAPI + pokename;
        const poke = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`${by} Commands`)
        .setDescription("Command: pokemon")
        .addFields(
            { name: "Name", value: `hi`}
        )
        .setFooter(`${by} helps`)
        msg.channel.send(poke);
    } else {
        const noPokemon = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`${by} Commands`)
        .setDescription("Command: pokemon")
        .addFields(
            { name: "Command", value: `Get info on any pokemon\n\`\`\`${prefix}pokemon [pokemon]\`\`\``}
        )
        .setFooter(`${by} helps`)
        msg.channel.send(noPokemon);
    }
}

module.exports = {
    name: "pokemon",
    description: "Get info on any pokemon",
    example: prefix + "pokemon [pokemon]",
    type: "fun",
    execute(msg, args) {
        abc(msg, args);
    }
}