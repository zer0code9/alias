const CONFIG = require('../config.json');
module.exports = (bot) => {
    bot.user.setPresence({
        status: 'online',
        activities: [{
            name: 'Discord.JS API',
            type: 'PLAYING'
        }]
    })
    console.log(`${CONFIG.by} is playing Discord`);
}