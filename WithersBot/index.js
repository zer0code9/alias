const Discord = require("discord.js");
const bot = new Discord.Client();

const token = "NzY4MjE0Njk2MDE5ODg2MTIx.X49NsA.LxdzcdiJLcF22qqDk9Uii2E-fJE";
const prefix = "z!";

bot.on("ready", () => {
    bot.user.setPresence({
        status: 'online',
        activity: {
            name: '| z!help',
            type: 'Watching servers'
        }
    })
    console.log("The best bot is ON!");
});

bot.on("message" , msg=>{
    if(!msg.content.startsWith(prefix) || msg.author.bot) return;

    const args = msg.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === "hello"){
        msg.channel.send("Hello :D nice to meet you!");
    }
});

bot.login(token);