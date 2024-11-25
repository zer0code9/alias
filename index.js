const { bot } = require('./config');
const { discordjs } = require('./secure');
const { REST, Routes } = require('discord.js');
const fs = require("fs");
const alias = require('./client');

// fs.readdir('./events/', (error, files) => {
//     if (error) return console.error(error);
//     alias.removeAllListeners();
//     files.forEach(file => {
//         var event; var eventName;
//         if (fs.lstatSync(`./events/${file}`).isDirectory()) {
//             fs.readdir(`./events/${file}`, (suberror, subfiles) => {
//                 if (suberror) return console.error(suberror);
//                 subfiles.forEach(subfile => {
//                     event = require(`./events/${file}/${subfile}`);
//                     eventName = subfile.split(".")[0];
//                     try {
//                         alias.on(eventName, event.bind(null, alias));
//                     } catch(e) { console.log(e); }
//                 });
//             });
//         } else {
//             event = require(`./events/${file}`);
//             eventName = file.split(".")[0];
//             try {
//                 alias.on(eventName, event.bind(null, alias));
//             } catch(e) { console.log(e); }
//         }
//     }); 
// });
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
    for (const file of fs.readdirSync(`./commands/${folder}`).filter(name => name.endsWith('.js'))) {
        const command = require(`./commands/${folder}/${file}`);
        alias.commands.set(command.name, command);
        if (command.settings?.existMsg) alias.msgCommands.set(command.name, command);
        if (command.settings?.existInt) {
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
const rest = new REST().setToken(discordjs.token);
(async () => {
    try {
        await rest.put(Routes.applicationCommands(bot.id), { body: commands })
        console.log(`${bot.name} Slash Commands Done`);
    } catch (error) {
        console.error(error);
    }
    console.log(`${alias.commands.size} with ${alias.events.size}: Msg ${alias.msgCommands.size} | Int ${alias.intCommands.size}`);
})();

alias.login(discordjs.token);