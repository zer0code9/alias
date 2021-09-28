module.exports = (bot) => {
    bot.user.setPresence({
        status: 'online',
        activities: [{
            name: ' Discord API v13',
            type: 'PLAYING'
        }]
    })
    console.log("SplashBot is ON!");
}