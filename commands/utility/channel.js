const { bot, emojiType, colorEmbed } = require('../../config.js');
const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const AliasCancels = require("../../helpers/cancels.js");
const AliasEmbeds = require("../../helpers/embeds.js");
const AliasUtils = require("../../helpers/utils.js");

module.exports = {
    name: "channel",
    id: "799489362224",
    description: "Manage a channel",
    type: "Utility",
    botPerms: ["manageChannels"],
    memPerms: ["manageChannels"],
    args: [
        { name: "action", type: "phrase", required: true },
        { name: "channel", type:"channel-mention|id", required: true },
        { name: "data", type:"data", required: false }
    ],
    msgCommand: { exist: true },
    intCommand: { exist: true },
    settings: {
        existMsg: true,
        existInt: true,
        sub: true,
        options: [
            {
                name: "create",
                description: "Create a channel",
                type: ApplicationCommandOptionType.Subcommand,
                options: [
                    {
                        name: "name",
                        description: "The name of the new channel [phrase]",
                        type: ApplicationCommandOptionType.String,
                        specific: "phrase",
                        options: [],
                        required: true,
                    },
                    {
                        name: "type",
                        description: "The type of the channel [integer:text:0,voice:2,category:4,news:5,stage:13,directory:14,forum:15]",
                        type: ApplicationCommandOptionType.Integer,
                        specific: "integer",
                        options: [0, 2, 4, 5, 13, 14, 15],
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
                        description: "The channel that is going to be edited [channel]",
                        type: ApplicationCommandOptionType.Channel,
                        specific: "channel",
                        options: [],
                        required: true,
                    },
                    {
                        name: "name",
                        description: "The new name of the channel [phrase]",
                        type: ApplicationCommandOptionType.String,
                        specific: "phrase",
                        options: [],
                        required: false,
                    },
                    {
                        name: "parent",
                        description: "The new parent of the channel (if none put 0) [id]",
                        type: ApplicationCommandOptionType.String,
                        specific: "id",
                        options: [],
                        required: false,
                    },
                    {
                        name: "position",
                        description: "The new position of the channel in the category [integer]",
                        type: ApplicationCommandOptionType.Integer,
                        specific: "integer",
                        options: [],
                        required: false,
                    },
                    {
                        name: "topic",
                        description: "The new topic of the channel [phrase]",
                        type: ApplicationCommandOptionType.String,
                        specific: "phrase",
                        options: [],
                        required: false,
                    },
                    {
                        name: "rate",
                        description: "The new rate limit per user of the channel [second]",
                        type: ApplicationCommandOptionType.String,
                        specific: "second",
                        options: [],
                        required: false,
                    },
                    {
                        name: "limit",
                        description: "The new user limit (only for voice) [integer]",
                        type: ApplicationCommandOptionType.Integer,
                        specific: "integer",
                        options: [],
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
                        description: "The channel that is going to be deleted [channel]",
                        type: ApplicationCommandOptionType.Channel,
                        specific: "channel",
                        options: [],
                        required: true,
                    },
                    {
                        name: "reason",
                        description: "The reason to delete the channel [phrase]",
                        type: ApplicationCommandOptionType.String,
                        specific: "phrase",
                        options: [],
                        required: false,
                    },
                ],
            },
        ],
    },
    
    async msgRun(msg, args) {
        const action = args[0];

        if (action == "data") {
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


        if (action == "create") {
            const name = await args[1];
            const type = await args[2];

            try {
                const Create = await this.Create(msg.guild, name, type);
                AliasUtils.sendEmbed(msg, Create);
            } catch {
                AliasUtils.sendError(msg, this.name);
            }
        }

        else if (action == "edit") {
            const channel = await msg.guild.channels.cache.get(args[1]) ?? await msg.guild.channels.cache.get(msg.mentions.channels.first()?.id);
            const data = {};

            if (!args.slice(2))
return AliasCancels.invalid(`No Data`, `I need data to edit the channel \n\`zeditchannel data\` to see available types`, AliasUtils.getUsage(this, "edit"));

            try {
                for (const arg of args.slice(2)) {
                    data[AliasUtils.getDataType(arg)] = AliasUtils.getValue(arg);
                }
    
                const Edit = await this.Edit(channel, data, msg.guild);
                AliasUtils.sendEmbed(msg, Edit);
            } catch (e) {
                console.log(e)
                AliasUtils.sendError(msg, this.name);
            }
        }

        else if (action == "delete") {
            const channel = await msg.guild.channels.cache.get(args[1]) ?? await msg.guild.channels.cache.get(msg.mentions.channels.first()?.id);
            const reason = await args.slice(2).join(" ");

            try {
                const Delete = await this.Delete(channel, reason);
                AliasUtils.sendEmbed(msg, Delete);
            } catch {
                AliasUtils.sendError(msg, this.name);
            }
        }

        else {
            const Invalid = AliasEmbeds.embed(colorEmbed.warning, "Invalid Action", this.type, [
                { name: `Unknown Action Used`, value: `I don't know the action ${action}` },
                { name: "Possible Actions", value: `create | edit | delete `}
            ], bot.name + " helps");
            AliasUtils.sendEmbed(msg, Invalid);
        }

        msg.delete();
    },

    async intRun(int) {
        const action = await int.options.getSubcommand();

        if (action == "create") {
            const name = await int.options.getString('name');
            const type = await int.options.getInteger('type');
            
            try {
                const Create = await this.Create(int.guild, name, type);
                AliasUtils.sendEmbed(int, Create);
            } catch {
                AliasUtils.sendError(int, this.name);
            }
        }

        else if (action == "edit") {
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
        }

        else if (action == "delete") {
            const channel = await int.options.getChannel('channel');
            const reason = await int.options.getString('reason');
    
            try {
                const Delete = await this.Delete(channel, reason);
                AliasUtils.sendEmbed(int, Delete);
            } catch {
                AliasUtils.sendError(int, this.name);
            }
        }
    },

    async Create(guild, name, type) {
        const settings = this.settings.options[0];
        if (!name)
return AliasCancels.invalid(`No Name`, `I need a name in order to create a new channel \n(${settings.options[0].specific})`, AliasUtils.getUsage(this, "create"));

        if (!type) type = 0;
        if (!settings.options[1].options.includes(type))
return AliasCancels.unabled(`Invalid Type`, `I need an integer for the type \n(${settings.options[1].specific}) \ntext:0,voice:2,category:4,news:5,stage:13,directory:14,forum:15`)

        await guild.channels.create({ name: name, type: type });
        const Create = AliasEmbeds.embedSuccess("CREATED CHANNEL", emojiType.channel, emojiType.create, this.type,
        [
            { name: "A new channel has been created", value: `\`\`\`${name}\`\`\``},
            { name: "Edit channel with:", value: `\`zmanagechannel edit\``}
        ])
        return Create;
    },

    async Edit(channel, data, guild){
        const settings = this.settings.options[1];
        if (!channel)
return AliasCancels.invalid(`No Channel`, `I need a channel in order to move it \n(${settings.options[0].specific})`, AliasUtils.getUsage(this, "edit"));

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
    },

    async Delete(channel, reason) {
        const settings = this.settings.options[2];
        if (!channel)
return AliasCancels.invalid(msg, `No Channel`, `I need a channel in order to delete it \n(${settings.options[0].specific})`, AliasUtils.getUsage(this, "delete"));
        if (!reason) reason = "No reason";

        let channelName = channel.name;
        await channel.delete();
        const Delete = AliasEmbeds.embedSuccess("DELETED CHANNEL", emojiType.channel, emojiType.delete, this.type,
        [
            { name: "A channel has been deleted", value: `\`\`\`${channelName}\`\`\`` },
            { name: "Reason", value: `\`\`\`${reason}\`\`\``}
        ])
        return Delete;
    },
}