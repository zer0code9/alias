const { bot, emoji } = require('../config.js');
const { PermissionsBitField, ApplicationCommandOptionType } = require('discord.js');
const { Invalid, Unabled } = require("../helpers/errors");
const { embedSuccess } = require("../helpers/embeds");
const { sendError } = require("../helpers/utils");

module.exports = {
    name: "movechannel",
    description: "Move the channel to a different place",
    example: bot.prefix + "movechannel [channel:ch|id] [category:id] [place:in]",
    type: "Channel",
    botPerms: ["manageChannels"],
    memPerms: ["manageChannels"],
    slashCommand: {
        exist: false,
        options: [
            {
                name: "channel",
                description: "The channel that is going to be moved",
                type: "channel",
                required: true,
            },
            {
                name: "category",
                description: "The id of a category",
                type: "string",
                required: true,
            },
            {
                name: "place",
                description: "The placement of the channel",
                type: "integer",
                required: true,
            }
        ]
    },

    async execute(msg, args) {
        const channel = await msg.guild.channels.cache.get(args[0]) ?? msg.guild.channels.cache.get(msg.mentions.channels.first()?.id);
        if (!channel) return Invalid(msg, `No Channel`, `I need a channel in order to move it \n(mention:channel or channel:id)`, this.example);

        const category = await args[1];
        if (!category) return Invalid(msg, `No Category`, `I need a category in order to move the channel \n(channel:category:id)`,this.example);
        if (isNaN(category)) return Unabled(msg, `Not An ID`, `The category must be an id of a category channel \n(id)`);

        const position = await args[2];
        if (!position) return Invalid(msg, `No Position`, `I need a position in order to move the channel \n(number:integer)`, this.example);
        if (isNaN(position)) return Unabled(msg, `Not A Number`, `The position must be a whole number \n(integer)`);
    
        try {
            await channel.setParent(`${category}`);
            await channel.setPosition(`${position - 1}`);
        } catch {
            sendError(msg, this.name);
        }

        const Move = embedSuccess("MOVED CHANNEL", emoji.channel, emoji.move, this.type,
        [
            { name: `A channel has been moved`, value: `\`\`\`${channel.name}\`\`\`` },
            { name: "New placement", value: `\`\`\`Category: ${msg.guild.channels.cache.get(category).name}\nPosition: ${position}\`\`\`` }
        ])
        await msg.channel.send({ embeds: [Move] });
        msg.delete();
    }
}