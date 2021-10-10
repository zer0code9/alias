const CONFIG = require('../config.json');

module.exports = (bot, msg) => {
    if(msg.type === "DM" || msg.author.bot) return;
    if(!msg.content.toLowerCase().startsWith(CONFIG.prefix)) return;

    const args = msg.content.slice(CONFIG.prefix.length).trim().split(/ +/);

    const commandName = args.shift().toLowerCase();
    if(!commandName) return;
    
    const command = bot.botCommands.get(commandName);
    if(!command) return msg.reply(`I don't know the command ${commandName}.`);

    try {
        command.execute(msg, args, bot);
    } catch (error) {
        return bot.error(error, msg.channel)
    }
}