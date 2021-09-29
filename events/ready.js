const CONFIG = require('../config.json');
module.exports = (bot) => {
    bot.user.setPresence({
        status: 'online',
        activities: [{
            name: 'Discord API v13',
            type: 'PLAYING'
        }]
    })
    console.log(`${CONFIG.by} is playing Discord`);
}