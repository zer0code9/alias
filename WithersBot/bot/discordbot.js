const fs = require("fs");
const Discord = require("discord.js");
const bot = new Discord.Client();


const token = "NzY4MjE0Njk2MDE5ODg2MTIx.X49NsA.LxdzcdiJLcF22qqDk9Uii2E-fJE";
const prefix = "z!";


// CONFIGS
var botting = token.startsWith("mfa.");

bot.on("ready", () => {
    bot.user.setPresence({
        status: 'online',
        activity: {
            name: 'z!help',
            type: 'PLAYING'
        }
    })
    console.log(`Logged in as ${client.user.tag}!`);
});

bot.login(token);