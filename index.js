const { Client, Intents, MessageEmbed, Collection } = require('discord.js');
const bot = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES], partials: ["MESSAGE", "CHANNEL", "REACTION"]});
const fs = require("fs");
const CONFIG = require('./config.json');

const prefix = CONFIG.prefix;
const token = CONFIG.token;
bot.botCommands = new Collection();

//ERROR MESSAGE
bot.error = (error_msg, channel) => {
    if(!error_msg || !channel) return;
    const errorEmbed = new MessageEmbed()
    .setColor("#ff0000")
    .setTitle(`:x: CANCELED :x:`)
    .addFields(
        { name: `Error`, value: `Something went wrong` }
    )
    .setFooter(`${by} helps`)
    return channel.send({ embeds: [errorEmbed] }).catch(e => channel.send(`Couldn't send error embed!\n${e}`))
}

//EVENT HANDLER
fs.readdir('./events/', (error, files) => {
    if (error) return console.error(error);
    bot.removeAllListeners();
    files.forEach(file => {
        if(fs.lstatSync(`./events/${file}`).isDirectory()) return;
        var event = require(`./events/${file}`);
        var eventName = file.split(".")[0];
        try{
            bot.on(eventName, event.bind(null, bot));
        } catch(e) {
            console.log(e)
        }
    });
});

//COMMAND HANDLER
fs.readdir('./commands/', (error, files) => {
    if (error) return console.error(err);
	var commandFiles = files.filter(fileName => fileName.endsWith(".js"));
	commandFiles.forEach(file => {
        const command = require(`./commands/${file}`);
		bot.botCommands.set(command.name, command);
    });
});

/*
let commands = new Collection();
const commandFiles = fs.readdirSync("./commands/").filter(file => file.endsWith(".js"));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    commands.set(command.name, command); 
}
bot.commands = commands; 

bot.on("ready", () => {
    bot.user.setPresence({
        status: 'online',
        activities: [{
            name: ' servers',
            type: 'WATCHING'
        }]
    })
    console.log("SplashBot is ON!");
});

bot.on("messageCreate" , msg=>{
    if(!msg.content.startsWith(prefix) || msg.author.bot) return;

    const args = msg.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    const cmds = commands;
    const guild = msg.guild;
    const vChannel = msg.member.voice.channel;
    const member = msg.mentions.members.first();

    if (!bot.commands.has(command)){
        msg.reply(`I don't know the command ${command}.`);
    } else
    try {
        bot.commands.get(command).execute(msg, args, inter, bot);
    } catch (error) {
        msg.reply(`Uh oh, something went wrong \n\`\`\`${error}\`\`\``);
    }
    return;
});
*/

bot.on("guildCreate", guild=>{
    const guildEvent = new MessageEmbed()
    .setColor("RANDOM")
    .setTitle(`Nice to meet you ${guild.owner}`)

    guild.sendMessage(`Wow, I got Invited in a new server, so cool! Hey ${guild.owner}`)
});
bot.on("channelCreate" , chnl=>{
    const channelEvent = new MessageEmbed()
    .setColor("RANDOM")
})

bot.login(token);