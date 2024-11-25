const { bot, emojiType } = require('../config.js');
const { ApplicationCommandOptionType } = require('discord.js');
const AliasCancels = require("../helpers/cancels.js");
const AliasEmbeds = require("../helpers/embeds.js");
const AliasUtils = require("../helpers/utils.js");

module.exports = {
    name: "crechannel",
    description: "Create a new channel",
    type: "Utility",
    botPerms: ["manageChannels"],
    memPerms: ["manageChannels"],
    args: [
        { name: "name", type: "phrase", required: true },
        { name: "type", type: "integer", required: false },
    ],
    msgCommand: {
        exist: true,
        usage: bot.prefix + "crechannel [name:ph] [type:in?]"
    },
    intCommand: {
        exist: true,
        options: [
            {
                name: "name",
                description: "The name of the new channel",
                type: ApplicationCommandOptionType.String,
                required: true,
            },
            {
                name: "type",
                description: "The type of the channel [integer:text:0,voice:2,category:4,news:5,stage:13,directory:14,forum:15]",
                type: ApplicationCommandOptionType.Integer,
                required: false,
            }
        ]
    },
    
    async msgRun(msg, args) {
        const name = await args[0];
        const type = await args[1];
            
        try {
            const Create = await this.CreChannel(msg.guild, name, type);
            AliasUtils.sendEmbed(msg, Create);
        } catch {
            AliasUtils.sendError(msg, this.name);
        }
        msg.delete();
    },

    async intRun(int) {
        const name = await int.options.getString('name');
        const type = await int.options.getInteger('type');
        
        try {
            const Create = await this.CreChannel(int.guild, name, type);
            AliasUtils.sendEmbed(int, Create);
        } catch {
            AliasUtils.sendError(int, this.name);
        }
    },

    async CreChannel(guild, name, type) {
        if (!name) return AliasCancels.invalid(`No Name`, `I need a name in order to create a new channel \n(${this.args[0].type})`, this.msgCommand.usage);

        if (!type) type = 0;
        if (isNaN(type) ?? type < 0 ?? type > 15 ??  (type > 5 || type < 10))
            return AliasCancels.unabled(`Invalid Type`, `I need an integer for the type \n(${this.args[1].type}) \ntext:0,voice:2,category:4,news:5,stage:13,directory:14,forum:15`)

        await guild.channels.create({ name: name, type: type });
        const Create = AliasEmbeds.embedSuccess("CREATED CHANNEL", emojiType.channel, emojiType.create, this.type,
        [
            { name: "A new channel has been created", value: `\`\`\`${name}\`\`\``},
            { name: "Edit channel with:", value: `\`zeditchannel\``}
        ])
        return Create;
    }
}