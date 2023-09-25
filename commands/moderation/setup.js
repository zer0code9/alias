const { bot, colorEmbed } = require('../../config.js');
const { PermissionFlagsBits, ChannelType } = require('discord.js');
const AliasCancels = require("../../helpers/cancels");
const AliasEmbeds = require("../../helpers/embeds");
const AliasUtils = require("../../helpers/utils");

module.exports = {
    name: "setup",
    description: "Set up for Alias",
    type: "Moderation",
    botPerms: [],
    memPerms: ["administrator"],
    args: [],
    msgCommand: {
        exist: true,
        usage: bot.prefix + "setup",
    },
    intCommand: {
        exist: false,
        options: []
    },

    async msgRun(msg, args) {
        const Setup = await this.Setup(msg);
        if (Setup !== true) return AliasUtils.sendEmbed(msg, Setup);
        
        await msg.guild.channels.create({
            name: 'for-alias',
            type: ChannelType.GuildText,
            permissionOverwrites: [
                {
                    id: msg.guild.id,
                    deny: [PermissionFlagsBits.ViewChannel],
                },
                {
                    id: msg.member.user.id,
			        allow: [PermissionFlagsBits.ViewChannel],
                },
                {
                    id: msg.guild.roles.cache.find(r => r.name.toLowerCase() === "alias").id,
                    allow: [PermissionFlagsBits.ViewChannel],
                }
            ]
        });
        let channel = await msg.guild.channels.cache.find(c => c.name.toLowerCase() === "for-alias");
        await channel.send({ content: "Creating channel... Done" });
        let msgPerm = await channel.send({ content: "Changing permissions..." });
        await msgPerm.edit({ content: "Changing permissions... Done" });

        guilds.insertOne({
            "idA": AliasUtils.generateId('ag'),
            "idD": msg.guild.id,
            "xp": 0,
            "modChannelId": channel.id
        })

        let msgDB = await channel.send({ content: `Creating guild data for ${msg.guild.name}...` });
        await msgDB.edit({ content: `Creating guild data for ${msg.guild.name}... Done` });
        let msgFinish = await channel.send({ content: "Finishing up..." });
        await msgFinish.edit({ content: "Finishing up... Done" });

        const Note = AliasEmbeds.embed(colorEmbed.neutral, "Welcome to the Alias Channel", "This channel is used by Alias to log information", [
            { name: `Data for ${msg.guild.name}`, value: `All the data needed was successfully recorded in the Alias Database!` },
            { name: `Welcome to the channel that is consisted for Alias`, value: `This channel will be used to log moderation events as well as some other events` },
            { name: `First Rule`, value: `Never delete this channel or I won't work!` },
            { name: `Second Rule`, value: `Only add people who you trust like moderators or admins because there might be some secret information that is well not to be shared.` },
            { name: `I am happy to be able to be part of your server`, value: `Thanks for inviting me!` },
        ], `All steps of ${bot.name} Process of Installement were completed. Enjoy! - ${bot.name} helps`)
        AliasUtils.sendEmbedAlias(msg, Note);


        msg.delete();
    },

    async Setup(type) {
        let guild = guilds.find({ idD: msg.guild.id });
        if (type.member.user.id !== type.guild.ownerId) return AliasCancels.unabled(`Can't setup`, `Only the owner can set up \n Tell them to do it`);
        if (guild[0].modChannelId) return AliasCancels.unabled(`Set up channel exists`, `Channel for-alias already exists`);
        // (type.guild.channels.cache.find(c => c.name.toLowerCase() === "for-alias"))
        return true;
    }
}