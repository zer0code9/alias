const Discord = require("discord.js");
const { NOTFOUND } = require("dns");
const bot = new Discord.Client();
const fs = require("fs");
const server = require("./commands/server");

const guild = new Discord.Guild();
const role = new Discord.Role(bot, guild);
const member = new Discord.GuildMember(bot, guild);

let commands = new Discord.Collection();
const commandFiles = fs.readdirSync("./commands/").filter(file => file.endsWith(".js"));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    commands.set(command.name, command);
}
bot.commands = commands;
console.log(commands);

const token = "NzY4MjE0Njk2MDE5ODg2MTIx.X49NsA.LxdzcdiJLcF22qqDk9Uii2E-fJE";
const { prefix } = require("./config.json");
var { version, versiondescription } = require("./config.json");

bot.on("ready", () => {
    bot.user.setPresence({
        status: 'online',
        activity: {
            name: ' servers | zhelp',
            type: 'WATCHING'
        }
    })
    console.log("The best bot is ON!");
});

bot.on("message" , msg=>{
    if(!msg.content.startsWith(prefix) || msg.author.bot) return;

    const args = msg.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    const cmds = commands;

    if (!bot.commands.has(command)){
        msg.reply(`I don't know the command ${command}. Try zhelp for more commands!`);
    } else
    try {
        bot.commands.get(command).execute(msg, args, cmds);
    } catch (error) {
        msg.reply(`Uh oh, something went wrong \n\`\`\`${error}\`\`\``);
    }
    return;
});

// if(command === ""){bot.command.get("").execute(msg, args);}

bot.login(token);