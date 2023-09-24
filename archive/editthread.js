const { bot, emojiType, colorEmbed } = require('../config.js');
const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const AliasCancels = require("../helpers/cancels");
const AliasEmbeds = require("../helpers/embeds");
const AliasUtils = require("../helpers/utils");

module.exports = {
    name: "editthread",
    description: "Edit a thread",
    type: "Utility",
    botPerms: ["manageChannels"],
    memPerms: ["manageChannels"],
    msgCommand: {
        exist: false,
        usage: bot.prefix + "editthread [thread:th-me|id] {data (na:, ar:, lo:, in:, ra:)}"
    },
    intCommand: {
        exist: false,
        options: [
            {
                name: "thread",
                description: "The thread that is going to be edited",
                type: ApplicationCommandOptionType.Channel,
                required: true,
            },
            {
                name: "data",
                description: "Data to change about channel",
                type: ApplicationCommandOptionType.String,
                required: true,
            }
        ]
    },
    
    async msgRun(msg, args) {
        if (args[0].startsWith(`data`)) {
            const Data = embed(colorEmbed.neutral, `Data for Channel`, this.type, [
                { name: "na:", value: `The new name of the channel \nna:phrase` },
                { name: "ar:", value: `Set whether the channel is archived \nar:boolean` },
                { name: "lo:", value: `Set whether the channel is locked \nlo:boolean` },
                { name: "in:", value: `Set whether the channel is invitable \nin:boolean` },
                { name: "ra:", value: `The new rate limit per user of the channel \nra:second` },
            ], bot.name + " helps")
            return msg.channel.send({ embeds: [Data] });
        }

        const channel = await msg.guild.channels.cache.get(args[0]) ?? msg.guild.channels.cache.get(msg.mentions.channels.first()?.id);
        if (!channel) return Invalid(msg, `No Channel`, `I need a channel in order to move it \n(mention:channel or channel:id)`, this.msgCommand.usage);
        if (channel.type != 11 || 12) return Unabled(msg, `Invalid Type`, `The channel ${channel.name} is not a thread`);

        const Edit = new EmbedBuilder()
        .setColor(colorEmbed.success)
        .setTitle(`:` + emoji.success + `: EDITED THREAD :` + emoji.channel + `::` + emoji.edit + `:`)
        .setDescription(this.type + ` | ${channel.name} - ${channel.id}`)
        .setFooter({ text: bot.name + " helps" })

        let n = 1;

        while(n < args.length) {
            let arg = await args[n]

            if (arg.startsWith(`na`)) {
                try {
                    const name = getValue(arg);
                    await channel.edit({ name: name });
                    Edit.addFields({ name: "Renamed :" + emoji.rename + ":", value: `\`\`\`New Name: ${name}\`\`\`` });
                } catch (e) { continue; }

            } else if (arg.startsWith(`ar`)) {
                try {
                    const archived = getValue(arg);
                    await channel.edit({ archived: archived });
                    Edit.addFields({ name: "Changed Archive :" + emoji.move + ":", value: `\`\`\`Archived: ${archived}\`\`\`` });
                } catch (e) { console.log(e); return sendError(msg, this.name); }

            } else if (arg.startsWith(`lo`)) {
                try {
                    const locked = getValue(arg);
                    await channel.edit({ locked: locked });
                    Edit.addFields({ name: "Changed Lock :" + "lock" + ":", value: `\`\`\`Locked: ${locked}\`\`\`` });
                } catch (e) { console.log(e); return sendError(msg, this.name); }

            } else if (arg.startsWith(`in`)) {
                try {
                    const invitable = getValue(arg);
                    await channel.edit({ invitable: invitable });
                    Edit.addFields({ name: "Changed Invite :" + "notebook" + ":", value: `\`\`\`Invitable: ${invitable}\`\`\`` });
                } catch (e) { console.log(e); return sendError(msg, this.name);  }

            } else if (arg.startsWith(`ra`)) {
                try {
                    const rate = parseInt(getValue(arg));
                    await channel.edit({ rateLimitPerUser: rate });
                    Edit.addFields({ name: "Changed Rate :" + "watch" + ":", value: `\`\`\`New Rate: ${rate}s\`\`\`` });
                } catch (e) { continue;  }

            }
            n++;
        }

        await msg.channel.send({ embeds: [Edit] });

        msg.delete();
    }
}