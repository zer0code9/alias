const { bot } = require('./config');
const { discordjs } = require('./secure');
const { REST, Routes } = require('discord.js');
const fs = require("fs");
const alias = require('./client');

// EVENT HANDLER
alias.removeAllListeners();
for (const file of fs.readdirSync('./events/')) {
    const event = require(`./events/${file}`);
    const eventName = file.split(".")[0];
    try {
        alias.events.set(eventName, event);
        alias.on(eventName, event.bind(null));
    } catch(e) { console.log(e); }
}

// COMMAND HANDLER
const commands = [];
for (const folder of fs.readdirSync('./commands/')) {
    if (folder == ".DS_Store") continue;
    for (const file of fs.readdirSync(`./commands/${folder}`).filter(name => name.endsWith('.js'))) {
        const command = require(`./commands/${folder}/${file}`);
        alias.commands.set(command.settings.name, command);
        if (command.settings.existMsg) alias.msgCommands.set(command.settings.name, command);
        if (command.settings.existInt) {
            alias.intCommands.set(command.settings.name, command);
            commands.push(command.settings);
        }
    }
}

// SLASH HANDLER
const rest = new REST({ version: '10' }).setToken(discordjs.token);
(async () => {
    try {
        await rest.put(Routes.applicationCommands(bot.id), { body: commands });
        console.log(`Slash Commands Done`);
    } catch (error) {
        console.error(error);
    }
    console.log(`${alias.commands.size} with ${alias.events.size}: Msg ${alias.msgCommands.size} | Int ${alias.intCommands.size}`);
})();

alias.login(discordjs.token);