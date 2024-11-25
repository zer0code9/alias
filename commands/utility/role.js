const { bot, emojiType, colorEmbed } = require('../../config');
const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const AliasCancels = require("../../helpers/cancels");
const AliasEmbeds = require("../../helpers/embeds");
const AliasUtils = require("../../helpers/utils");

module.exports = {
    name: "role",
    id: "684798693751",
    description: "Manage roles",
    type: "Utility",
    botPerms: ["manageRoles"],
    memPerms: ["manageRoles"],
    args: [
        { name: "role", type:"role-mention|id", required: true },
        { name: "data", type:"data", required: true }
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
                description: "Create a role",
                type: ApplicationCommandOptionType.Subcommand,
                options: [
                    {
                        name: "name",
                        description: "The name of the new role [string-phrase]",
                        type: ApplicationCommandOptionType.String,
                        specific: "string-phrase",
                        options: [],
                        required: true,
                    }
                ]
            },
            {
                name: "edit",
                description: "Edit a role",
                type: ApplicationCommandOptionType.Subcommand,
                options: [
                    {
                        name: "role",
                        description: "The role that is going to be edited [role-mention|id]",
                        type: ApplicationCommandOptionType.Role,
                        specific: "role-mention|id",
                        options: [],
                        required: true,
                    },
                    {
                        name: "name",
                        description: "The new name of the channel [string-phrase]",
                        type: ApplicationCommandOptionType.String,
                        specific: "string-phrase",
                        options: [],
                        required: false,
                    },
                    {
                        name: "position",
                        description: "The new position of the role [integer]",
                        type: ApplicationCommandOptionType.Integer,
                        specific: "integer",
                        options: [],
                        required: false,
                    },
                    {
                        name: "color",
                        description: "The new color of the role [string-hex]",
                        type: ApplicationCommandOptionType.String,
                        specific: "string-hex",
                        options: [],
                        required: false,
                    },
                    {
                        name: "mention",
                        description: "Set whether the role is mentioable [boolean]",
                        type: ApplicationCommandOptionType.Boolean,
                        specific: "boolean",
                        options: [],
                        required: false,
                    },
                    {
                        name: "hoist",
                        description: "Set whether the role is hoist [boolean]",
                        type: ApplicationCommandOptionType.Boolean,
                        specific: "boolean",
                        options: [],
                        required: false,
                    },
                    {
                        name: "unicode",
                        description: "The new unicode of the role [string]",
                        type: ApplicationCommandOptionType.String,
                        specific: "phrase",
                        options: [],
                        required: false,
                    },
                ]
            },
            {
                name: "delete",
                description: "Delete a role",
                type: ApplicationCommandOptionType.Subcommand,
                options: [
                    {
                        name: "role",
                        description: "The role to delete [role-mention|id]",
                        type: ApplicationCommandOptionType.Role,
                        specific: "role-mention|id",
                        options: [],
                        required: true,
                    },
                    {
                        name: "reason",
                        description: "The reason to delete the role [string-phrase]",
                        type: ApplicationCommandOptionType.String,
                        specific: "string-phrase",
                        options: [],
                        required: false,
                    }
                ]
            }
        ]
    },
    
    async msgRun(msg, args) {
        let action = args[0];

        if (action == "data") {
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

        if (action == "create") {
            const name = await args.slice(1).join(" ");
    
            try {
                const Create = await this.Create(msg.guild, name);
                AliasUtils.sendEmbed(msg, Create);
            } catch {
                AliasUtils.sendError(msg, this.name);
            }
        }

        else if (action == "edit") {
            const role = await msg.guild.roles.cache.get(args[1]) ?? await msg.guild.roles.cache.get(msg.mentions.roles.first()?.id);
            const data = {};

            if (!args.slice(2))
return AliasCancels.invalid(msg, `No Data`, `I need data to edit the role \n\`zeditrole data\` to see available types`, AliasUtils.getUsage(this, "edit"));

            try {
                for (const arg of args) {
                    data[AliasUtils.getDataType(arg)] = AliasUtils.getValue(arg);
                }

                const Edit = await this.Edit(role, data, msg.guild);
                AliasUtils.sendEmbed(msg, Edit);
            } catch {
                AliasUtils.sendError(msg, this.name);
            }
        }

        else if (action == "delete") {
            const role = await msg.guild.roles.cache.get(args[1]) ?? msg.guild.roles.cache.get(msg.mentions.roles.first()?.id); 
            const reason = await args.slice(2).join(" "); 
        
            try {
                const Delete = await this.Delete(role, reason);
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

            try {
                const Create = await this.Create(int.guild, name);
                AliasUtils.sendEmbed(int, Create);
            } catch {
                AliasUtils.sendError(int, this.name);
            }
        }

        else if (action == "edit") {
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
        }
        
        else if (action == "delete") {
            const role = await int.options.getRole('role');
            const reason = await int.options.getString('reason');
            
            try {
                const Delete = await this.Delete(role, reason);
                AliasUtils.sendEmbed(int, Delete);
            } catch {
                AliasUtils.sendError(int, this.name);
            }
        }
    },

    async Create(guild, name) {
        const settings = this.settings.options[0];
        if (!name)
return AliasCancels.invalid(`No Name`, `I need a name in order to create a new role \n(${settings.options[0].specific})`, AliasUtils.getUsage(this, "create"));

        await guild.roles.create({ name: name });
        const Create = AliasEmbeds.embedSuccess("CREATED ROLE", emojiType.role, emojiType.create, this.type,
        [
            { name: "A new role has been created", value: `\`\`\`${name}\`\`\``},
            { name: "Edit role with:", value: `\`zmrole edit\``}
        ])
        return Create;
    },

    async Edit(role, data, guild) {
        const settings = this.settings.options[1];
        if (!role)
return AliasCancels.invalid(`No Role`, `I need a role in order to edit it \n(${settings.options[0].specific})`, AliasUtils.getUsage(this, "edit"));

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
    },

    async DelRole(role, reason) {
        const settings = this.settings.options[2];
        if (!role)
return AliasCancels.invalid(msg, `No Role`, `I need a role in order to delete it \n(${settings.options[0].specific})`, AliasUtils.getUsage(this, "delete"));
        if (!reason) reason = "No reason";

        let roleName = role.name;
        await role.delete(reason);
        const Delete = AliasEmbeds.embedSuccess("DELETED ROLE", emojiType.role, emojiType.delete, this.type,
        [
            { name: "A channel has been deleted", value: `\`\`\`${roleName}\`\`\`` },
            { name: "Reason", value: `\`\`\`${reason}\`\`\``}
        ])
        return Delete;
    }
}