const { bot, emojiType, colorEmbed } = require('../config.js');
const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const AliasCancels = require("../helpers/cancels.js");
const AliasEmbeds = require("../helpers/embeds.js");
const AliasUtils = require("../helpers/utils.js");

module.exports = {
    name: "editguild",
    description: "Edit the guild",
    type: "Utility",
    botPerms: ["manageGuild"],
    memPerms: ["manageGuild"],
    args: [
        { name: "data", type:"data", required: true }
    ],
    msgCommand: {
        exist: true,
        usage: bot.prefix + "editguild {data}"
    },
    intCommand: {
        exist: true,
        options: [
            {
                name: "name",
                description: "The new name of the guild [phrase]",
                type: ApplicationCommandOptionType.String,
                required: false,
            },
            {
                name: "description",
                description: "The new description of the guild [phrase]",
                type: ApplicationCommandOptionType.String,
                required: false,
            },
            {
                name: "afk",
                description: "The new AFK channel of the guild [id]",
                type: ApplicationCommandOptionType.String,
                required: false,
            },
            {
                name: "system",
                description: "The new system channel of the guild [id]",
                type: ApplicationCommandOptionType.String,
                required: false,
            },
            {
                name: "rules",
                description: "The new rules channel of the guild [id]",
                type: ApplicationCommandOptionType.String,
                required: false,
            },
            {
                name: "verification",
                description: "The verification level of the guild [integer:higher(4),high(3),medium(2),low(1),none(0)]",
                type: ApplicationCommandOptionType.String,
                required: false,
            }
        ]
    },
    
    async msgRun(msg, args) {
        if (!args) return AliasCancels.invalid(msg, `No Data`, `I need data to change the guild \n\`zeditguild data\` to see available types`, this.msgCommand.usage);
        if (args[0].startsWith(`data`)) {
            const Data = AliasEmbeds.embed(colorEmbed.neutral, `Data for Guild`, this.type, [
                { name: "na:", value: `The new name of the guild \nna:phrase` },
                { name: "de:", value: `The new description of the guild \nde:phrase` },
                { name: "af:", value: `The new AFK channel of the guild \naf:id` },
                { name: "sy:", value: `The new system channel of the guild \nsy:id` },
                { name: "ru:", value: `The new rules channel of the guild \nru:id` },
                { name: "ve:", value: `The verification level of the guild \nve:integer higher(4),high(3),medium(2),low(1),none(0)` },
            ], bot.name + " helps")
            return AliasUtils.sendEmbed(msg, Data);
        }

        const guild = await msg.guild;
        const data = {};

        try {
            for (const arg of args) {
                data[AliasUtils.getDataType(arg)] = AliasUtils.getValue(arg);
            }

            const Edit = await this.Edit(guild, data);
            AliasUtils.sendEmbed(msg, Edit);
        } catch {
            AliasUtils.sendError(msg, this.name);
        }
        msg.delete();
    },

    async intRun(int) {
        const guild = await int.guild;
        const data = {};

        try {
            const name = await int.options.getString('name');
            if (name) { data['na'] = name; }
    
            const description = await int.options.getString('description');
            if (description) { data['de'] = description; }
    
            const afk = await int.options.getString('afk');
            if (afk) { data['af'] = afk; }
    
            const system = await int.options.getString('system');
            if (system) { data['sy'] = system; }
    
            const rules = await int.options.getString('rules');
            if (rules) { data['ru'] = rules; }
    
            const verification = await int.options.getString('verification');
            if (verification) { data['ve'] = verification; }

            const Edit = await this.Edit(guild, data);
            AliasUtils.sendEmbed(int, Edit);
        } catch {
            AliasUtils.sendError(int, this.name);
        }
    },

    async Edit(guild, data) {
        const Edit = new EmbedBuilder()
        .setColor(colorEmbed.success)
        .setTitle(`:` + emojiType.success + `: EDITED GUILD :` + emojiType.guild + `::` + emojiType.edit + `:`)
        .setDescription(this.type + ` | ${guild.name} - ${guild.id}`)
        .setFooter({ text: `${bot.name} helps` })

        for (const type in data) {
            try {

                let value = data[type];
                if (value) {
                    if (!value || value == "") return Error(`cant`);
                    switch (type) {
                        case `na`:
                            const name = AliasUtils.getSplitedValue(value);
                            guild.edit({ name: name });
                            Edit.addFields({ name: "Changed Name :" + emojiType.rename + ":", value: `\`\`\`New Name: ${name}\`\`\`` });
                            break;
                        case `de`:
                            const description = AliasUtils.getSplitedValue(value);
                            guild.edit({ description: description });
                            Embed.addFields({ name: "Changed Description :" + emojiType.move + ":", value: `\`\`\`New Description: ${description}\`\`\`` });
                            break;
                        case `af`:
                            const afk = value;
                            guild.edit({ afkChannel: afk });
                            Edit.addFields({ name: "Changed AFK Channel :" + "headstone" + ":", value: `\`\`\`New AFK Channel: ${afk}\`\`\`` });
                            break;
                        case `sy`:
                            const system = value;
                            guild.edit({ systemChannel: system });
                            Edit.addFields({ name: "Changed System Channel :" + "gear" + ":", value: `\`\`\`New System Channel: ${system}\`\`\`` });
                            break;
                        case `ru`:
                            const rules = value;
                            guild.edit({ rulesChannel: rules });
                            Edit.addFields({ name: "Changed Rules Channel :" + "scroll" + ":", value: `\`\`\`New Rules Channel: ${rules}\`\`\`` });
                            break;
                        case `ve`:
                            const verification = parseInt(value);
                            guild.edit({ verificationLevel: verification });
                            Edit.addFields({ name: "Changed verification level :" + "" + ":", value: `\`\`\`New Verification Level: ${verification}\`\`\`` });
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

const GuildData = async (type, value, Embed, guild) => {
    
    return;
}


        /*
        let n = 0;
        while(n < args.length) {
            let arg = await args[n]

                 if (arg.startsWith(`na`)) { try { EditGuild(`name`, arg, Edit, guild); } catch { continue; } }
            else if (arg.startsWith(`de`)) { try { EditGuild(`description`, arg, Edit, guild); } catch { continue; } }
            else if (arg.startsWith(`af`)) { try { EditGuild(`afk`, arg, Edit, guild); } catch { continue; } }
            else if (arg.startsWith(`sy`)) { try { EditGuild(`system`, arg, Edit, guild); } catch { continue; } }
            else if (arg.startsWith(`ru`)) { try { EditGuild(`rules`, arg, Edit, guild); } catch { continue; } }
            else if (arg.startsWith(`ve`)) { try { EditGuild(`verification`, arg, Edit, guild); } catch { continue; } }
            else if (arg.startsWith(`me`)) { try { EditGuild(`me`, arg, Edit, guild); } catch { continue; } }

            n++;
        }
        */