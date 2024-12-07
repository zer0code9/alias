const { bot, ready } = require('../config.js');
const { ActivityType, Client } = require("discord.js");

const getType = (type) => {
    switch (type) {
      case "COMPETING":
        return ActivityType.Competing;

      case "LISTENING":
        return ActivityType.Listening;

      case "PLAYING":
        return ActivityType.Playing;

      case "WATCHING":
        return ActivityType.Watching;
    }
}

/**
 * 
 * @param {Client} alias 
 * @returns
 */
module.exports = (alias) => {
    alias.user.setPresence({
        status: ready.status.toLowerCase(),
        activities: [{
            name: ready.activity,
            type: getType(ready.type.toUpperCase())
        }]
    })
    console.log(`${bot.name} is ${ready.type.toLowerCase()} ${ready.activity}`);
}