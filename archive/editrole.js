const { bot, emojiType, colorEmbed } = require('../config.js');
const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const AliasCancels = require("../helpers/cancels.js");
const AliasEmbeds = require("../helpers/embeds.js");
const AliasUtils = require("../helpers/utils.js");

module.exports = {
    name: "editrole",
    description: "Edit a role",
    type: "Utility",
    botPerms: ["manageRoles"],
    memPerms: ["manageRoles"],
    args: [
        { name: "role", type:"role-mention|id", required: true },
        { name: "data", type:"data", required: true }
    ],
    msgCommand: {
        exist: true,
        usage: bot.prefix + "editrole [role:ro-me|id] {data (na:, po:, co:, me:, ho:, un:)}"
    },
    intCommand: {
        exist: true,
        options: [
            {
                name: "role",
                description: "The role that is going to be edited",
                type: ApplicationCommandOptionType.Role,
                required: true,
            },
            {
                name: "name",
                description: "The new name of the channel [phrase]",
                type: ApplicationCommandOptionType.String,
                required: false,
            },
            {
                name: "position",
                description: "The new position of the role [integer]",
                type: ApplicationCommandOptionType.Integer,
                required: false,
            },
            {
                name: "color",
                description: "The new color of the role [hex]",
                type: ApplicationCommandOptionType.String,
                required: false,
            },
            {
                name: "mention",
                description: "Set whether the role is mentioable [boolean]",
                type: ApplicationCommandOptionType.Boolean,
                required: false,
            },
            {
                name: "hoist",
                description: "Set whether the role is hoist [boolean]",
                type: ApplicationCommandOptionType.Boolean,
                required: false,
            },
            {
                name: "unicode",
                description: "The new unicode of the role [string]",
                type: ApplicationCommandOptionType.String,
                required: false,
            },
        ]
    },
    
    async msgRun(msg, args) {
        if (!args.slice(1)) return AliasCancels.invalid(msg, `No Data`, `I need data to edit the role \n\`zeditrole data\` to see available types`, this.msgCommand.usage);
        if (args[0].startsWith(`data`)) {
            const Data = AliasEmbeds.embed(colorEmbed.neutral, `Data for Role`, this.type, [
                { name: "na:", value: `The new name of the role \nna:phrase` },
                { name: "po:", value: `The new position of the role \npo:integer` },
                { name: "co:", value: `The new color of the role \nco:hex` },
                { name: "me:", value: `Set whether the role is mentioable \nme:boolean` },
                { name: "ho:", value: `Set whether the role is hoist \nho:boolean` },
                { name: "un:", value: `The new unicode of the role \nun:string` },
            ], bot.name + " helps")
            return msg.role.send({ embeds: [Data] });
        }

        const role = await msg.guild.roles.cache.get(args[0]) ?? await msg.guild.roles.cache.get(msg.mentions.roles.first()?.id);
        const data = {};

        try {
            for (const arg of args) {
                data[AliasUtils.getDataType(arg)] = AliasUtils.getValue(arg);
            }

            const Edit = await this.Edit(role, data, msg.guild);
            AliasUtils.sendEmbed(msg, Edit);
        } catch {
            AliasUtils.sendError(msg, this.name);
        }
        msg.delete();
    },

    async intRun(int) {
        const role = await int.options.getRole('role');
        const data = {};

        try {
            const name = await int.options.getString('name');
            if (name) { data['na'] = name; }
    
            const position = await int.options.getInteger('position');
            if (position) { data['po'] = position; }
    
            const color = await int.options.getString('color');
            if (color) { data['co'] = color; }
    
            const mention = await int.options.getBoolean('mention');
            if (mention) { data['me'] = mention; }
    
            const hoist = await int.options.getBoolean('hoist');
            if (hoist) { data['ho'] = hoist; }

            const unicode = await int.options.getString('unicode');
            if (unicode) { data['un'] = unicode; }

            const Edit = await this.Edit(role, data, int.guild);
            AliasUtils.sendEmbed(int, Edit);
        } catch {
            AliasUtils.sendError(int, this.name);
        }
    },

    async Edit(role, data, guild) {
        if (!role) return AliasCancels.invalid(`No Role`, `I need a role in order to edit it \n(${this.args[0].type})`, this.msgCommand.usage);

        const Edit = new EmbedBuilder()
        .setColor(colorEmbed.success)
        .setTitle(`:` + emojiType.success + `: EDITED ROLE :` + emojiType.role + `::` + emojiType.edit + `:`)
        .setDescription(this.type + ` | ${role.name} - ${role.id}`)
        .setFooter({ text: bot.name + " helps" })

        for (const type in data) {
            try {

                let value = data[type];
                if (value) {
                    if (!value || value == "") return Error(`cant`);
                    switch (type) {
                        case `na`:
                            const name = value;
                            role.edit({ name: name });
                            Edit.addFields({ name: "Changed Name :" + emojiType.rename + ":", value: `\`\`\`New Name: ${name}\`\`\`` });
                            break;
                        case `po`:
                            const position = parseInt(value);
                            role.edit({ position: (parseInt(guild.roles.cache.size) - position) - 1 })
                            Edit.addFields({ name: "Changed Position:" + emojiType.move + ":", value: `\`\`\`New Position: ${parseInt(guild.roles.cache.size) - parseInt(role.position)}\`\`\`` });
                            break;
                        case `co`:
                            const color = value;
                            role.edit({ color: color });
                            Edit.addFields({ name: "Changed Topic :" + emojiType.pencil + ":", value: `\`\`\`New Color: ${color}\`\`\`` });
                            break;
                        case `me`:
                            const mentionable = value;
                            role.edit({ mentionable: mentionable });
                            Edit.addFields({ name: "Changed Mentionability :" + "round_pushpin" + ":", value: `\`\`\`Montionable: ${mentionable}\`\`\`` });
                            break;
                        case `ho`:
                            const hoist = value;
                            role.edit({ hoist: hoist });
                            Edit.addFields({ name: "Changed Hoist :" + "mega" + ":", value: `\`\`\`Hoist: ${hoist}\`\`\`` });
                            break;
                        case `un`:
                            const unicode = value;
                            role.edit({ unicodeEmoji: unicode });
                            Edit.addFields({ name: "Changed Unicode :" + "pushpin" + ":", value: `\`\`\`New Unicode: ${unicode}\`\`\`` });
                            break;
                    }
                }

            } catch {
                continue;
            }
        }

        return Edit;
    }
}