const { bot, emojiType, colorEmbed } = require('../../config.js');
const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const AliasCancels = require("../../helpers/cancels");
const AliasEmbeds = require("../../helpers/embeds");
const AliasUtils = require("../../helpers/utils");

module.exports = {
    name: "editchannel",
    description: "Edit a channel",
    type: "Utility",
    botPerms: ["manageChannels"],
    memPerms: ["manageChannels"],
    args: [
        { name: "channel", type:"channel-mention|id", required: true },
        { name: "data", type:"data", required: true }
    ],
    msgCommand: {
        exist: true,
        usage: bot.prefix + "editchannel [channel:ch-me|id] {data (na:, pa:, po:, to:, ra:, li:)}"
    },
    intCommand: {
        exist: true,
        options: [
            {
                name: "channel",
                description: "The channel that is going to be edited",
                type: ApplicationCommandOptionType.Channel,
                required: true,
            },
            {
                name: "name",
                description: "The new name of the channel [phrase]",
                type: ApplicationCommandOptionType.String,
                required: false,
            },
            {
                name: "parent",
                description: "The new parent of the channel (if none put 0) [id]",
                type: ApplicationCommandOptionType.String,
                required: false,
            },
            {
                name: "position",
                description: "The new position of the channel in the category [integer]",
                type: ApplicationCommandOptionType.Integer,
                required: false,
            },
            {
                name: "topic",
                description: "The new topic of the channel [phrase]",
                type: ApplicationCommandOptionType.String,
                required: false,
            },
            {
                name: "rate",
                description: "The new rate limit per user of the channel [second]",
                type: ApplicationCommandOptionType.String,
                required: false,
            },
            {
                name: "limit",
                description: "The new user limit (only for voice) [integer]",
                type: ApplicationCommandOptionType.Integer,
                required: false,
            },
        ]
    },
    
    async msgRun(msg, args) {
        if (!args.slice(1)) return AliasCancels.invalid(`No Data`, `I need data to change the channel \n\`zeditchannel data\` to see available types`, this.msgCommand.usage);
        if (args[0] == "data") {
            const Data = AliasEmbeds.embed(colorEmbed.neutral, `Data for Channel`, this.type, [
                { name: "na:", value: `The new name of the channel {na:phrase}` },
                { name: "pa:", value: `The new parent of the channel (if none put 0) {pa:id}` },
                { name: "po:", value: `The new position of the channel in the category {po:integer}` },
                { name: "to:", value: `The new topic of the channel {to:phrase}` },
                { name: "ra:", value: `The new rate limit per user of the channel {ra:second}` },
                { name: "li:", value: `The new user limit (only for voice) {li:integer}` },
            ], bot.name + " helps")
            return msg.channel.send({ embeds: [Data] });
        }

        const channel = await msg.guild.channels.cache.get(args[0]) ?? await msg.guild.channels.cache.get(msg.mentions.channels.first()?.id);
        const data = {};

        try {
            for (const arg of args.slice(1)) {
                data[AliasUtils.getDataType(arg)] = AliasUtils.getValue(arg);
            }

            const Edit = await this.Edit(channel, data, msg.guild);
            AliasUtils.sendEmbed(msg, Edit);
        } catch (e) {
            console.log(e)
            AliasUtils.sendError(msg, this.name);
        }
        msg.delete();
    },

    async intRun(int) {
        const channel = await int.options.getChannel('channel');
        const data = {};

        try {
            const name = await int.options.getString('name');
            if (name) { data['na'] = name; }
    
            const parent = await int.options.getString('parent');
            if (parent) { data['pa'] = parent; }
    
            const position = await int.options.getInteger('position');
            if (position) { data['po'] = position; }
    
            const topic = await int.options.getString('topic');
            if (topic) { data['to'] = topic; }
    
            const rate = await int.options.getString('rate');
            if (rate) { data['ra'] = rate; }
    
            const limit = await int.options.getInteger('limit');
            if (limit) { data['li'] = limit; }

            const Edit = await this.Edit(channel, data, int.guild);
            AliasUtils.sendEmbed(int, Edit);
        } catch {
            AliasUtils.sendError(int, this.name);
        }
    },

    async Edit(channel, data, guild) {
        if (!channel) return AliasCancels.invalid(`No Channel`, `I need a channel in order to move it \n(${this.args[0].type})`, this.msgCommand.usage);

        const Edit = new EmbedBuilder()
        .setColor(colorEmbed.success)
        .setTitle(`:` + emojiType.success + `: EDITED CHANNEL :` + emojiType.channel + `::` + emojiType.edit + `:`)
        .setDescription(this.type + ` | ${channel.name} - ${channel.id}`)
        .setFooter({ text: bot.name + " helps" })

        for (const type in data) {
            try {

                let value = data[type];
                if (value) {
                    if (!value || value == "") return Error(`cant`);
                    switch (type) {
                        case `na`:
                            const name = value;
                            channel.edit({ name: name });
                            Edit.addFields({ name: "Change Name :" + emojiType.rename + ":", value: `\`\`\`New Name: ${name}\`\`\`` })
                            break;
                        case `pa`:
                            const parent = value;
                            channel.edit({ parent: parent });
                            Edit.addFields({ name: "Changed Parent :" + emojiType.move + ":", value: `\`\`\`New Parent: ${guild.channels.cache.get(parent).name}\`\`\`` });
                            break;
                        case `po`:
                            const position = parseInt(value);
                            channel.edit({ position: position - 1 });
                            Edit.addFields({ name: "Changed Position :" + emojiType.move + ":", value: `\`\`\`New Position: ${position}\`\`\`` });
                            break;
                        case `to`:
                            const topic = AliasUtils.getSplitedValue(value);
                            channel.edit({ topic: topic });
                            Edit.addFields({ name: "Changed Topic :" + "notebook" + ":", value: `\`\`\`New Topic: ${topic}\`\`\`` });
                            break;
                        case `ra`:
                            const rate = parseInt(value);
                            channel.edit({ rateLimitPerUser: rate });
                            Edit.addFields({ name: "Changed Rate :" + "watch" + ":", value: `\`\`\`New Rate: ${rate}s\`\`\`` });
                            break;
                        case `li`:
                            const limit = parseInt(value);
                            //await channel.edit({ rateLimitPerUser: rate });
                            Edit.addFields({ name: "Changed Limit :" + "watch" + ":", value: `\`\`\`New Limit: ${limit} users\`\`\`` });
                            break;
                    }
                }

            } catch (e) {
                console.log(e)
                continue;
            }
        }

        return Edit;
    }
}