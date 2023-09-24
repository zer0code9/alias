const { bot, colorEmbed, emoji } = require("../config.js");
const { PermissionFlagsBits } = require("discord.js");
const { Cancel } = require("../helpers/errors");
const { embedSuccess, embed } = require("../helpers/embeds");

module.exports = {
    name: "channels",
    description: "Get a list of all the channels of the server",
    type: "Info",
    botPerms: [],
    memPerms: [],
    msgCommand: {
        exist: true,
        usage: bot.prefix + "channels"
    },
    slashCommand: {
        exist: false,
    },

    async msgRun(msg, args) {
        var page = 1;

        const ChannelPage = embedSuccess("CHANNEL COUNT", emoji.channel, emoji.count, this.type,
        [
            { name: `All Channels of ${msg.guild.name} [${msg.guild.channels.cache.size}]`, value: `Getting all channels`}
        ])
        const listMsg = await msg.channel.send({ embeds: [ChannelPage] });
    
        await listMsg.react("◀️");
        await listMsg.react("▶️");
        await listMsg.react("❌");
    
        const filter = (reaction, user) => ["◀️", "▶️", "❌"].includes(reaction.emoji.name) && user.id === msg.author.id;
        const collector = listMsg.createReactionCollector(filter, { time: 120000} );
        await listMsg.edit({embeds: [getChannels(page, this)]});
    
        collector.on('collect', (reaction, user) => {
            reaction.emoji.reaction.users.remove(user.id);
    
            switch (reaction.emoji.name) {
                case "◀️":
                    --page;
                    if (page < 1) page = 1;
                    listMsg.edit({embeds: [getChannels(page, this)]});
                    break;
                case "▶️":
                    ++page;
                    listMsg.edit({embeds: [getChannels(page, this)]});
                    break;
                case "❌":
                    listMsg.delete();
            };
        });
        collector.on('end', collected => {
            return Cancel(msg);
        });
    
        function getChannels(page, command) {
            const list = msg.guild.channels.cache.map(c => c.name).sort();
    
            var pageNum = (page * 10) - 10;
            if (!pageNum) pageNum = 0;
            const ChannelList = embed(colorEmbed.success, `:${emoji.success}: CHANNEL COUNT :${emoji.channel}::${emoji.count}:`, command.type, [
                { name: `All Channels of ${msg.guild.name} [${msg.guild.channels.cache.size}]`, value: `${list.slice(pageNum, pageNum + 9).join("\n") || "No more channel"}`}
            ], `${bot.name} helps | ${(pageNum / 10) + 1}`)
            return ChannelList;
        };
    }
}