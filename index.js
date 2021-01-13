const Discord = require("discord.js");
const { NOTFOUND } = require("dns");
const bot = new Discord.Client({partials: ["MESSAGE", "CHANNEL", "REACTION"]});
const fs = require("fs");
const server = require("./commands/server");

let commands = new Discord.Collection();
const commandFiles = fs.readdirSync("./commands/").filter(file => file.endsWith(".js"));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    commands.set(command.name, command); 
}
bot.commands = commands; 

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
    console.log("The best bot is now ON!");
});

bot.on("message" , msg=>{
    if(!msg.content.startsWith(prefix) || msg.author.bot) return;

    const args = msg.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    const cmds = commands;
    const guild = msg.guild;
    const vChannel = msg.member.voice.channel;
    const member = msg.mentions.members.first();
    const By = 'WithersBot helps';

    if (!bot.commands.has(command)){
        msg.reply(`I don't know the command ${command}. Try zhelp for more commands!`);
    } else
    try {
        bot.commands.get(command).execute(msg, args, cmds, bot);
    } catch (error) {
        msg.reply(`Uh oh, something went wrong \n\`\`\`${error}\`\`\``);
    }
    return;
});

bot.on("guildCreate", guild=>{
    const guildEvent = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle(`Nice to meet you ${guild.owner}`)

    guild.sendMessage(`Wow, I got Invited in a new server, so cool! Hey ${guild.owner}`)
});
bot.on("channelCreate" , chnl=>{
    const channelEvent = new Discord.MessageEmbed()
    .setColor("RANDOM")
})
// if(command === ""){bot.command.get("").execute(msg, args);}
// \n\`\`\`${}\`\`\`

/*
const { prefix } = require("/home/asorinus/workspace/myFirstProject/WithersWorld/WithersBot/config.json");
const Discord = require("discord.js");
function abc(msg, args) {
    const name = args.slice(1).join(" ");
    if (name) {
        const no = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("WithersBot Commands")
        .setDescription("Command: ")
        .addFields(
            { name: "Command", value: `here\n\`\`\`${prefix}\`\`\``}
        )
        .setFooter("WithersBot helps")
        msg.channel.send(no);
    } else {
            const yes = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle("WithersBot Commands")
            .setDescription("Command: ")
            .addFields(
                { name: "here", value: `here`}
            )
            .setFooter("WithersBot helps")
            msg.channel.send(yes);
    }
}

module.exports = {
    name: "",
    description: "",
    example: prefix + "",
    type: "",
    execute(msg, args) {
        abc(msg, args);
    }
}
*/

bot.login(token);