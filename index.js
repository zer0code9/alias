const { Client, Intents, MessageEmbed, Collection } = require('discord.js');
const bot = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_BANS,
        Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
        Intents.FLAGS.GUILD_INTEGRATIONS,
        Intents.FLAGS.GUILD_WEBHOOKS,
        Intents.FLAGS.GUILD_INVITES,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_MESSAGE_TYPING,
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
        Intents.FLAGS.DIRECT_MESSAGE_TYPING
    ], partials: ["MESSAGE", "CHANNEL", "REACTION"]});
const fs = require("fs");
const CONFIG = require('./config.json');

const prefix = CONFIG.prefix;
const by = CONFIG.by;
const token = CONFIG.token;
bot.botCommands = new Collection();
bot.botInteractions = new Collection();

/*
//ERROR MESSAGE
bot.error = (errorMsg, channel) => {
    if(!errorMsg || !channel) return;
    const errorEmbed = new MessageEmbed()
    .setColor("#ff0000")
    .setTitle(`:x: ERROR :x:`)
    .addFields(
        { name: `Error`, value: `Something went wrong` },
        { name: "ErrorType", value: `\`\`\`${errorMsg}\`\`\``}
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
//INTERACTION HANDLER
fs.readdir('./interactions/', (error, files) => {
    if (error) return console.error(err);
	var interactionFiles = files.filter(fileName => fileName.endsWith(".js"));
	interactionFiles.forEach(file => {
        const interaction = require(`./interactions/${file}`);
		bot.botInteractions.set(interaction.name, interaction);
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
    console.log("Done 1")
});
*/

const commandFiles = fs.readdirSync("./commands/").filter(file => file.endsWith(".js"));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
    bot.botCommands.set(command.name, command); 
}
const interactionFiles = fs.readdirSync("./interactions/").filter(file => file.endsWith(".js"));
for(const file of interactionFiles){
    const interaction = require(`./interactions/${file}`);
    bot.botInteractions.set(interaction.name, interaction); 
}

bot.on("ready", () => {
    bot.user.setPresence({
        status: 'online',
        activities: [{
            name: 'Discord API v13',
            type: 'PLAYING'
        }]
    })
    console.log("SplashBot is ON!");
});

bot.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;
	const command = bot.commands.get(interaction.commandName);
	if (!command) return;
	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
    console.log("Interactions: OK")
});

bot.on("messageCreate" , msg=>{
    if(!msg.content.startsWith(prefix) || msg.author.bot) return;
    const args = msg.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    if (!bot.botCommands.has(command)){
        msg.reply(`I don't know the command ${command}.`);
    } else
    try {
        bot.botCommands.get(command).execute(msg, args, bot);
    } catch (error) {
        msg.reply(`Uh oh, something went wrong \n\`\`\`${error}\`\`\``);
    }
    console.log("Messages: OK")
});


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