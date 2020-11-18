const Discord = require("discord.js");
const bot = new Discord.Client();
const fs = require("fs");

bot.command = new Discord.Collection();
const commandFiles = fs.readdirSync("./commands/").filter(file => file.endsWith(".js"));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    bot.commands.set(command.name, comad);
}

const token = "NzY4MjE0Njk2MDE5ODg2MTIx.X49NsA.LxdzcdiJLcF22qqDk9Uii2E-fJE";
const prefix = "z!";

bot.on("ready", () => {
    bot.user.setPresence({
        status: 'online',
        activity: {
            name: ' servers | z!help',
            type: 'Watching'
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
    } else if(command === "wsw"){
        msg.channel.send("https://www.youtube.com/channel/UCEhaRtTBEpzq3655QVpsOlQ");
    }
});

bot.login(token);