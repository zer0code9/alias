const Discord = require("discord.js");
const bot = new Discord.Client();
const fs = require("fs");

bot.command = new Discord.Collection();
const commandFiles = fs.readdirSync("./commands/").filter(file => file.endsWith(".js"));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    bot.command.set(command.name, command);
}

const token = "NzY4MjE0Njk2MDE5ODg2MTIx.X49NsA.LxdzcdiJLcF22qqDk9Uii2E-fJE";
const prefix = "z";
var version = "1.1.0";

bot.on("ready", () => {
    bot.user.setPresence({
        status: 'online',
        activity: {
            name: ' servers | zhelp',
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
        bot.command.get("hello").execute(msg, args);
    } else
    if(command === "wsw"){
        bot.command.get("wsw").execute(msg, args);
    }

    try {
        bot.command.get(command.name).execute(msg, args);
    } catch (error) {
        msg.reply(`Uh oh, something went wrong \n\`\`\`${error}\`\`\``);
    }
    return;
});
// if(command === ""){bot.command.get("").execute(msg, args);}

bot.login(token);