const Discord = require("discord.js");
const bot = new Discord.Client();

const token = "NzY4MjE0Njk2MDE5ODg2MTIx.X49NsA.LxdzcdiJLcF22qqDk9Uii2E-fJE";
const prefix = "z!";

bot.on("ready", () => {
    bot.user.setPresence({
        status: 'online',
        activity: {
            name: '|z!help',
            type: 'Watching servers'
        }
    })
    console.log("The best bot is ON!");
});

bot.on("message" , msg=>{
    if (msg.content === "Hello"){
        msg.reply("Hello :D nice to meet you!");
    }
})

bot.login(token);