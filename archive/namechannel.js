const { bot, emoji } = require('../config.js');
const { PermissionsBitField, ApplicationCommandOptionType } = require('discord.js');
const { Invalid, Unabled } = require("../helpers/errors");
const { embedSuccess } = require("../helpers/embeds");
const { sendError } = require("../helpers/utils");

module.exports = {
    name: "namechannel",
    description: "Change the name of a channel",
    example: bot.prefix + "namechannel [channel:ch|id] [name:p]",
    type: "Channel",
    botPerms: ["manageChannels"],
    memPerms: ["manageChannels"],
    slashCommand: {
        exist: false,
        options: [
            {
                name: "channel",
                description: "The channel that is going to be renamed",
                type: "channel",
                required: true,
            },
            {
                name: "name",
                description: "The new name",
                type: "string",
                required: true,
            }
        ]
    },

    async execute(msg, args) {
        const channel = await msg.guild.channels.cache.get(args[0]) ?? msg.guild.channels.cache.get(msg.mentions.channels.first()?.id);
        if (!channel) return Invalid(msg, `No Channel`, `I need a channel to change its name \n(mention:channel or channel:id)`, this.example);
        let channelName = channel.name;

        const name = await args.slice(1).join(" ");
        if (!name) return Invalid(msg, `No Name`, `I need a name in order to rename the channel \n(phrase)`, this.example);

        await channel.setName(`${name}`);
        
    
        const Rename = embedSuccess("RENAMED CHANNEL", emoji.channel, emoji.rename, this.type,
        [
            { name: "A channel has been renamed", value: `\`\`\`${channelName}\`\`\`` }, 
            { name: "New Name", value: `\`\`\`${name}\`\`\`` }
        ])
        await msg.channel.send({ embeds: [Rename] });
        msg.delete();
    }
}