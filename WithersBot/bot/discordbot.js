const Discord = require("discord.js");
const bot = new Discord.Client();


const token = "NzY4MjE0Njk2MDE5ODg2MTIx.X49NsA.LxdzcdiJLcF22qqDk9Uii2E-fJE";
const prefix = "z!";
const CI = "768214696019886121";
const CS = "byZpJUW94I-UXFzEDkxbN4erfXcg8Uei";

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
client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.cache.find(ch => ch.name === 'member-log');
    if (!channel) return;
    channel.send(`Welcome to the server, ${member}`);
});
  

bot.on("message", msg => {
    if (msg.content === "hello") msg.channel.send(`Hello, ${msg.author}. How are you?`);
    if (msg.content === "I am a gamer") msg.channel.send(`We all love games`);

    if (!msg.content.startsWith(prefix)) return;
    if (msg.author.bot) return;


    switch (args[0]) {
        case "help":
            const docs = {
                help: {
                    name: "z!help",
                    value: "Find out more about the bot's commands\n```z!help [command]```",
                    inline: true
                },
                cal: {
                    name: "z!cal",
                    value: "Calculator\n```z!cal [expression]```",
                    inline: true
                },
                sub: {
                    name: "z!sub",
                    value: "Subscribe and Follow\n```Subscribe: https://bit.ly/33JG2Aj and Follow Twitter @WithersWorld```"
                }
            }

            const help = {
                color: "#0099ff",
                title: 'WithersBot',
                author: {
                    icon_url: 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/24b0f5b1-603f-4c6e-9c22-c039dd69ea75/PC_Club_Logo_%282%29.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20201020%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20201020T081240Z&X-Amz-Expires=86400&X-Amz-Signature=0cd47b0add89c409ec1d839a92616c358bc65138a8323dd736f15938724b2220&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22PC_Club_Logo_%282%29.png%22',
                },
                description: '**BotsCommads:**',
                fields: [Object.values(docs)],
                timestamp: new Date(),
                footer: {
                    text: 'The bot of Wither',
                    icon_url: 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/24b0f5b1-603f-4c6e-9c22-c039dd69ea75/PC_Club_Logo_%282%29.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20201020%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20201020T081240Z&X-Amz-Expires=86400&X-Amz-Signature=0cd47b0add89c409ec1d839a92616c358bc65138a8323dd736f15938724b2220&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22PC_Club_Logo_%282%29.png%22',
                },
            };

            if (args.length == 1) {
                msg.channel.send({ embed: help });
            } else if (args.length >= 2) {

                let selected = docs[args[1].toLowerCase()];

                if (typeof selected == "undefined")
                    selected = {
                        name: "Couldn't find what you're looking for.",
                        value: "For the full list of commands, type:\n```pc-help [command]```"
                    }

                const selectiveDocs = {
                    color: "#474747",
                    title: 'WithersBot',
                    url: 'https://pcclub.now.sh/',
                    author: {
                        icon_url: 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/24b0f5b1-603f-4c6e-9c22-c039dd69ea75/PC_Club_Logo_%282%29.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20201020%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20201020T081240Z&X-Amz-Expires=86400&X-Amz-Signature=0cd47b0add89c409ec1d839a92616c358bc65138a8323dd736f15938724b2220&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22PC_Club_Logo_%282%29.png%22',
                    },
                    description: `**❌ERROR❌**`,
                    timestamp: new Date(),
                    fields: [selected],
                    footer: {
                        text: 'The bot of Wither',
                        icon_url: 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/24b0f5b1-603f-4c6e-9c22-c039dd69ea75/PC_Club_Logo_%282%29.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20201020%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20201020T081240Z&X-Amz-Expires=86400&X-Amz-Signature=0cd47b0add89c409ec1d839a92616c358bc65138a8323dd736f15938724b2220&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22PC_Club_Logo_%282%29.png%22',
                    },
                }

                msg.channel.send({ embed: selectiveDocs });
            }

            break;

        case "welcome":

            msg.channel.send("\nHello gamers, subscribers, coders, followers and friends. I am the bot of Wither!")
                .then(message => {
                    startGame(message)
                });
            break;

        case "cal":

            if (args.length == 1) {
                msg.channel.send("**Settings**\n```z!cal [expression]```");
                break;
            }

            let equation = args;
            equation.shift();
            equation = equation.join(" ")
            equation = equation
                .replace(/\n/g, "")
                .replace(/`/g, "")
                .replace(/--/g, " - -")
                .replace(/,/g, "")
                .replace(/\[/g, "(")
                .replace(/\]/g, ")")

            try {
                let someError = false;

                for (const letter of equation.replace(" ", "")) {
                    if (!(".1234567890+-*/%() ".split("").includes(letter))) {
                        someError = true;
                        break;
                    }
                }

                if (someError) {
                    msg.channel.send("❌ Unvalid only `1234567890+-*/%()` can be used rn")
                } else {
                    answer = eval(equation);
                    msg.channel.send(`${equation} = ${answer}`);
                }
            } catch (error) {
                msg.channel.send(`Invalid Expression:\n\`\`\`${error}\`\`\``);
            }

            break;
        case "avatar":

        msg.channel.reply(msg.author.displayAvatarURL())

         break;
        

    }

    // Botting Functionality
    if (botting && msg.channel.id == "766151773458661418" && msg.embeds.length > 0) {
        if (msg.embeds[0].description.includes("h!treat")) {
            setTimeout(function() {
                msg.channel.send("h!treat");
            }, bottingTimeout);
        } else if (msg.embeds[0].description.includes("h!trick")) {
            setTimeout(function() {
                msg.channel.send("h!trick");
                count++;
            }, bottingTimeout);
        }
    }

});


// EMOJI THINGS

const emojisChars = {
    a: '🇦',
    b: '🇧',
    c: '🇨',
    d: '🇩',
    e: '🇪',
    f: '🇫',
    g: '🇬',
    h: '🇭',
    i: '🇮',
    j: '🇯',
    k: '🇰',
    l: '🇱',
    m: '🇲',
    n: '🇳',
    o: '🇴',
    p: '🇵',
    q: '🇶',
    r: '🇷',
    s: '🇸',
    t: '🇹',
    u: '🇺',
    v: '🇻',
    w: '🇼',
    x: '🇽',
    y: '🇾',
    z: '🇿',
    0: '0⃣',
    1: '1⃣',
    2: '2⃣',
    3: '3⃣',
    4: '4⃣',
    5: '5⃣',
    6: '6⃣',
    7: '7⃣',
    8: '8⃣',
    9: '9⃣',
    10: '🔟',
    '#': '#⃣',
    '*': '*⃣',
    '!': '❗',
    '?': '❓',
};

const reverseNums = {
    '0⃣': 0,
    '1⃣': 1,
    '2⃣': 2,
    '3⃣': 3,
    '4⃣': 4,
    '5⃣': 5,
    '6⃣': 6,
    '7⃣': 7,
    '8⃣': 8,
    '9⃣': 9,
    '🔟': 10
}

function getEmoji(message, name) {
    return message.guild.emojis.cache.find(emoji => emoji.name == name)
}

async function reactNum(n, message) {
    try {
        for (let i = 1; i <= n && i <= 10; i++) {
            await message.react(emojisChars[i]);
        }
    } catch (error) {
        console.error('One of the emojis failed to react.' + error);
    }
}
bot.login(token);