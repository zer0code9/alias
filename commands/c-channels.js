const { prefix, by } = require("./../config.json");
const { MessageEmbed } = require("discord.js");
const { Timeout, Wronganswer, Perm, Cancel, Invalid, Unknown } = require("../errors");
async function channels(msg, args) {
    var page = 1;
    const channelPage = new MessageEmbed()
    .setColor('#00ff00')
    .setTitle(`:white_check_mark: CHANNEL COUNT :file_folder::1234:`)
    .setDescription('Channel')
    .addFields(
        { name: `All Channels of ${msg.guild.name} [${msg.guild.channels.cache.size}]`, value: `Getting all channels`}
    )
    .setFooter(`${by} helps`)
    const listMsg = await msg.channel.send({ embeds: [channelPage] });

    await listMsg.react("◀️");
    await listMsg.react("▶️");
    await listMsg.react("❌");

    const filter = (reaction, user) => ["◀️", "▶️", "❌"].includes(reaction.emoji.name) && user.id === msg.author.id;
    const collector = listMsg.createReactionCollector(filter, { time: 120000} );
    await listMsg.edit({embeds: [getChannels(page)]});

    collector.on('collect', (reaction, user) => {
        reaction.emoji.reaction.users.remove(user.id);

        switch (reaction.emoji.name) {
            case "◀️":
                --page;
                if (page < 1) page = 1;
                listMsg.edit({embeds: [getChannels(page)]});
                break;
            case "▶️":
                ++page;
                listMsg.edit({embeds: [getChannels(page)]});
                break;
            case "❌":
                listMsg.delete();
        };
    });
    collector.on('end', collected => {
        return Cancel(msg);
    });

    function getChannels(page) {
        const list = msg.guild.channels.cache.map(c => c.name).sort();

        var pageNum = (page * 10) - 10;
        if (!pageNum) pageNum = 0;
        const channelList = new MessageEmbed()
        .setColor('#00ff00')
        .setTitle(`:white_check_mark: CHANNEL COUNT :file_folder::1234:`)
        .setDescription('Channel')
        .addFields(
            { name: `All Channels of ${msg.guild.name} [${msg.guild.channels.cache.size}]`, value: `${list.slice(pageNum, pageNum + 9).join("\n") || "No more channel"}`}
        )
        .setFooter(`${by} helps | ${(pageNum / 10) + 1}`)
        return channelList;
    };
}

module.exports = {
    name: "channels",
    description: "Get a list of all the channels of the server",
    example: prefix + "channels",
    type: "Channel",
    execute(msg, args) {
        channels(msg, args);
    }
}