const { bot, emoji } = require('../config.js');
const { PermissionsBitField, ApplicationCommandOptionType } = require('discord.js');
const { Invalid, Unabled } = require("../helpers/errors");
const { embedSuccess } = require("../helpers/embeds");
const { sendError } = require("../helpers/utils");

module.exports = {
    name: "topicchannel",
    description: "Change the topic of a channel",
    example: bot.prefix + "topicchannel [channel:ch|id] [topic:p]",
    type: "Channel",
    botPerms: ["manageChannels"],
    memPerms: ["manageChannels"],
    slashCommand: {
        exist: false,
        options: [
            {
                name: "channel",
                description: "The channel that is going to be changed",
                type: "channel",
                required: true,
            },
            {
                name: "topic",
                description: "The new topic",
                type: "string",
                required: true,
            }
        ]
    },

    async execute(msg, args) {
        const channel = msg.guild.channels.cache.get(args[0]) || msg.mentions.channels.first();
        const topic = args.slice(1).join(" ");
    
        if (!channel) return Invalid(msg, `No Channel`, `I need a channel in order to change its topic \n(mention:channel or channel:id)`, this.example);
        if (!topic) return Invalid(msg, `No Topic`, `I need a topic in order to change the topic of the channel \n(phrase)`, this.example);
    
        try {
            await channel.setTopic(`${topic}`);
        } catch {
            sendError(msg, this.name);
        }
        
        const Change = embedSuccess("CHANGED CHANNEL TOPIC", emoji.channel, "pencil", this.type,
        [
            { name: "A channel has been changed its topic", value: `\`\`\`${channel.name}\`\`\`` },
            { name: "Topic sentence", value: `\`\`\`${topic}\`\`\``}
        ])
        await msg.channel.send({ embeds: [Change] });
        msg.delete();
    }
}