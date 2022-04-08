const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { id, token } = require('./config.json');

const commands = [
	new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
	new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
	new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
]
	.map(command => command.toJSON());
	console.log("Here");

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands("768214696019886121", "759949225861054466"), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);