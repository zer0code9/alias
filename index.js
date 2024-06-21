const { bot } = require('./config.js');
const { REST, Routes } = require('discord.js');
const fs = require("fs");
const alias = require('./client');
const { initializeMongoose } = require('./database/database.js');

//EVENT HANDLER
fs.readdir('./events/', (error, files) => {
    if (error) return console.error(error);
    alias.removeAllListeners();
    files.forEach(file => {
        var event; var eventName;
        if (fs.lstatSync(`./events/${file}`).isDirectory()) {
            fs.readdir(`./events/${file}`, (suberror, subfiles) => {
                if (suberror) return console.error(suberror);
                subfiles.forEach(subfile => {
                    event = require(`./events/${file}/${subfile}`);
                    eventName = subfile.split(".")[0];
                    try {
                        alias.on(eventName, event.bind(null, alias));
                    } catch(e) { console.log(e); }
                });
            });
        } else {
            event = require(`./events/${file}`);
            eventName = file.split(".")[0];
            try {
                alias.on(eventName, event.bind(null, alias));
            } catch(e) { console.log(e); }
        }
    }); 
});

//COMMAND HANDLER
const commands = [];
const folders = fs.readdirSync('./commands/');
for (const folder of folders) {
    const files = fs.readdirSync(`./commands/${folder}`).filter(name => name.endsWith('.js'));
    for (const file of files) {
        const command = require(`./commands/${folder}/${file}`);
        alias.commands.set(command.name, command);
        if (command.msgCommand?.exist) alias.msgCommands.set(command.name, command);
        if (command.intCommand?.exist) {
            alias.intCommands.set(command.name, command);
            commands.push({
                options: command.intCommand?.options || command.settings?.options,
                name: command.name,
                description: command.description,
            })
        }
    }
}

// SLASH HANDLER
const rest = new REST({ version: '9' }).setToken(bot.token);
(async () => {
    //await initializeMongoose();
    try {
        await rest.put(Routes.applicationCommands(bot.id), { body: commands })
        console.log(`${bot.name} Commands Done`);
    } catch (error) {
        console.error(error);
    }
    console.log(`${alias.commands.size}: Msg ${alias.msgCommands.size} | Int ${alias.intCommands.size}`);
})();

alias.login(bot.token);