const { bot, emojiType, colorEmbed } = require('../../config');
const { ApplicationCommandOptionType, EmbedBuilder, Message, ChatInputCommandInteraction, Guild, GuildChannel } = require('discord.js');
const AliasEmbeds = require("../../helpers/embeds");
const AliasUtils = require("../../helpers/utils");
const AliasSends = require("../../helpers/sends");

module.exports = {
    settings: {
        name: "channel",
        idDB: "799489362224",
        description: "Manage channels",
        category: "Utility",
        botPerms: ["manageChannels"],
        memPerms: ["manageChannels"],
        existMsg: true,
        existInt: true,
        type: 1,
        options: [
            {
                name: "create",
                description: "Create a channel",
                type: ApplicationCommandOptionType.Subcommand,
                options: [
                    {
                        name: "name",
                        description: "The name of the new channel [string]",
                        type: ApplicationCommandOptionType.String,
                        specific: "string",
                        required: true,
                    },
                    {
                        name: "type",
                        description: "The type of the channel [integer-text:0,voice:2,category:4,news:5,stage:13,directory:14,forum:15]",
                        type: ApplicationCommandOptionType.Integer,
                        specific: "integer",
                        required: false,
                    },
                ],
            },
            {
                name: "edit",
                description: "Edit a channel",
                type: ApplicationCommandOptionType.Subcommand,
                options: [
                    {
                        name: "channel",
                        description: "The channel that is going to be edited [channel-mention|id]",
                        type: ApplicationCommandOptionType.Channel,
                        specific: "channel-mention|id",
                        required: true,
                    },
                    {
                        name: "name",
                        description: "The new name of the channel [string-phrase]",
                        type: ApplicationCommandOptionType.String,
                        specific: "string-phrase",
                        required: false,
                    },
                    {
                        name: "parent",
                        description: "The new parent of the channel (if none put 0) [channel-id]",
                        type: ApplicationCommandOptionType.String,
                        specific: "channel-id",
                        required: false,
                    },
                    {
                        name: "position",
                        description: "The new position of the channel in the category [integer]",
                        type: ApplicationCommandOptionType.Integer,
                        specific: "integer",
                        required: false,
                    },
                    {
                        name: "topic",
                        description: "The new topic of the channel [string-phrase]",
                        type: ApplicationCommandOptionType.String,
                        specific: "string-phrase",
                        required: false,
                    },
                    {
                        name: "rate",
                        description: "The new rate limit per user of the channel [string-second]",
                        type: ApplicationCommandOptionType.String,
                        specific: "string-second",
                        required: false,
                    },
                    {
                        name: "limit",
                        description: "The new user limit (only for voice) [integer]",
                        type: ApplicationCommandOptionType.Integer,
                        specific: "integer",
                        required: false,
                    },
                ],
            },
            {
                name: "delete",
                description: "Delete a channel",
                type: ApplicationCommandOptionType.Subcommand,
                options: [
                    {
                        name: "channel",
                        description: "The channel that is going to be deleted [channel-mention|id]",
                        type: ApplicationCommandOptionType.Channel,
                        specific: "channel-mention|id",
                        required: true,
                    },
                    {
                        name: "reason",
                        description: "The reason to delete the channel [string-phrase]",
                        type: ApplicationCommandOptionType.String,
                        specific: "string-phrase",
                        required: false,
                    },
                ],
            },
        ],
    },
    
    /**
     * 
     * @param {Message} msg 
     * @param {String[]} args 
     * @returns 
     */
    async msgRun(msg, args) {
        const action = args[0];

        if (action == "data") {
            const Data = AliasEmbeds.embed(colorEmbed.neutral, `Data for Channel`, this.settings.category, [
                { name: "na:", value: `The new name of the channel {na:phrase}` },
                { name: "pa:", value: `The new parent of the channel (if none put 0) {pa:id}` },
                { name: "po:", value: `The new position of the channel in the category {po:integer}` },
                { name: "to:", value: `The new topic of the channel {to:phrase}` },
                { name: "ra:", value: `The new rate limit per user of the channel {ra:second}` },
                { name: "li:", value: `The new user limit (only for voice) {li:integer}` },
            ], bot.name + " helps")
            AliasSends.sendEmbed(msg, Data);
            msg.delete();
            return;
        }


        if (action == "create") {
            const name = args[1];
            const type = args[2];

            try {
                const Create = await this.Create(msg.guild, name, type);
                AliasSends.sendEmbed(msg, Create);
            } catch {
                AliasSends.sendError(msg, this.settings.name);
            }
        }

        else if (action == "edit") {
            const channel = msg.guild.channels.cache.get(args[1]) ?? msg.guild.channels.cache.get(msg.mentions.channels.first()?.id);
            const data = {};

            try {
                for (const arg of args.slice(2)) {
                    data[AliasUtils.getDataType(arg)] = AliasUtils.getValue(arg);
                }
    
                const Edit = await this.Edit(channel, data, msg.guild);
                AliasSends.sendEmbed(msg, Edit);
            } catch (e) {
                console.log(e)
                AliasSends.sendError(msg, this.settings.name);
            }
        }

        else if (action == "delete") {
            const channel = msg.guild.channels.cache.get(args[1]) ?? msg.guild.channels.cache.get(msg.mentions.channels.first()?.id);
            const reason = args.slice(2).join(" ");

            try {
                const Delete = await this.Delete(channel, reason);
                AliasSends.sendEmbed(msg, Delete);
            } catch {
                AliasSends.sendError(msg, this.settings.name);
            }
        }

        else {
            const Invalid = AliasEmbeds.embed(colorEmbed.warning, "Invalid Action", this.settings.category, [
                { name: `Unknown Action Used`, value: `I don't know the action ${action}` },
                { name: "Possible Actions", value: `create | edit | delete `}
            ], bot.name + " helps");
            AliasSends.sendEmbed(msg, Invalid);
        }

        msg.delete();
    },

    /**
     * 
     * @param {ChatInputCommandInteraction} int 
     */
    async intRun(int) {
        const action = int.options.getSubcommand();

        if (action == "create") {
            const name = int.options.getString('name');
            const type = int.options.getInteger('type');
            
            try {
                const Create = await this.Create(int.guild, name, type);
                AliasSends.sendEmbed(int, Create);
            } catch {
                AliasSends.sendError(int, this.settings.name);
            }
        }

        else if (action == "edit") {
            const channel = int.options.getChannel('channel');
            const data = {};
    
            try {
                const name = int.options.getString('name');
                if (name) { data['na'] = name; }
        
                const parent = int.options.getString('parent');
                if (parent) { data['pa'] = parent; }
        
                const position = int.options.getInteger('position');
                if (position) { data['po'] = position; }
        
                const topic = int.options.getString('topic');
                if (topic) { data['to'] = topic; }
        
                const rate = int.options.getString('rate');
                if (rate) { data['ra'] = rate; }
        
                const limit = int.options.getInteger('limit');
                if (limit) { data['li'] = limit; }
    
                const Edit = await this.Edit(channel, data, int.guild);
                AliasSends.sendEmbed(int, Edit);
            } catch {
                AliasSends.sendError(int, this.settings.name);
            }
        }

        else if (action == "delete") {
            const channel = int.options.getChannel('channel');
            const reason = int.options.getString('reason');
    
            try {
                const Delete = await this.Delete(channel, reason);
                AliasSends.sendEmbed(int, Delete);
            } catch {
                AliasSends.sendError(int, this.settings.name);
            }
        }
    },

    /**
     * 
     * @param {Guild} guild 
     * @param {String} name 
     * @param {Number} type 
     * @returns {Promise<EmbedBuilder>}
     */
    async Create(guild, name, type) {
        const options = this.settings.options[0];
        if (!name) return AliasEmbeds.invalid(`No Name`, `I need a name in order to create a new channel \n(${options.options[0].specific})`, AliasUtils.getUsage(this, "create"));

        if (!type) type = 0;
        const types = [0, 2, 4, 5, 13, 14, 15];
        if (!types.includes(type)) return AliasEmbeds.unabled(`Invalid Type`, `I need an integer for the type \n(${options.options[1].specific}) \ntext:0,voice:2,category:4,news:5,stage:13,directory:14,forum:15`)

        await guild.channels.create({ name: name, type: type });
        const Create = AliasEmbeds.embedSuccess("CREATED CHANNEL", emojiType.channel, emojiType.create, this.settings.category,
        [
            { name: "A new channel has been created", value: `\`\`\`${name}\`\`\``},
            { name: "Edit channel with:", value: `\`zchannel edit or \\channel edit\``}
        ])
        return Create;
    },

    /**
     * 
     * @param {GuildChannel} channel 
     * @param {{}} data 
     * @param {Guild} guild 
     * @returns {Promise<EmbedBuilder>} 
     */
    async Edit(channel, data, guild){
        const options = this.settings.options[1];
        if (!channel) return AliasEmbeds.invalid(`No Channel`, `I need a channel in order to edit it \n(${options.options[0].specific})`, AliasUtils.getUsage(this, "edit"));
        if (!data) return AliasEmbeds.invalid(`No Data`, `I need data to edit the channel`, AliasUtils.getUsage(this, "edit"));

        const Edit = new EmbedBuilder()
        .setColor(colorEmbed.success)
        .setTitle(`:` + emojiType.success + `: EDITED CHANNEL :` + emojiType.channel + `::` + emojiType.edit + `:`)
        .setDescription(this.settings.category + ` | ${channel.name} - ${channel.id}`)
        .setFooter({ text: bot.name + " helps" })

        for (const type in data) {
            try {

                let value = data[type];
                if (value) {
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
    },

    /**
     * 
     * @param {GuildChannel} channel 
     * @param {String} reason 
     * @returns {Promise<EmbedBuilder>} 
     */
    async Delete(channel, reason) {
        const options = this.settings.options[2];
        if (!channel) return AliasEmbeds.invalid(msg, `No Channel`, `I need a channel in order to delete it \n(${options.options[0].specific})`, AliasUtils.getUsage(this, "delete"));
        if (!reason) reason = "No reason";

        let channelName = channel.name;
        await channel.delete();
        const Delete = AliasEmbeds.embedSuccess("DELETED CHANNEL", emojiType.channel, emojiType.delete, this.settings.category,
        [
            { name: "A channel has been deleted", value: `\`\`\`${channelName}\`\`\`` },
            { name: "Reason", value: `\`\`\`${reason}\`\`\``}
        ])
        return Delete;
    },
}