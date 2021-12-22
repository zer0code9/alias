const { prefix, by } = require("./../config.json");
const Discord = require("discord.js");
function users(msg, args) {
    var page = 1;
    const channelPage = new MessageEmbed()
    .setColor('#00ff00')
    .setTitle(`:white_check_mark: USER COUNT :bust_in_silhouette::1234:`)
    .setDescription('Channel')
    .addFields(
        { name: `All Users of ${msg.guild.name} [${msg.guild.members.cache.size}]`, value: `Getting all users`}
    )
    .setFooter(`${by} helps`)
    const listMsg = await msg.channel.send({ embeds: [channelPage] });

    await listMsg.react("◀️");
    await listMsg.react("▶️");
    await listMsg.react("❌");

    const filter = (reaction, user) => ["◀️", "▶️", "❌"].includes(reaction.emoji.name) && user.id === msg.author.id;
    const collector = listMsg.createReactionCollector(filter, { time: 120000} );
    await listMsg.edit({embeds: [getUsers(page)]});

    collector.on('collect', (reaction, user) => {
        reaction.emoji.reaction.users.remove(user.id);

        switch (reaction.emoji.name) {
            case "◀️":
                --page;
                if (page < 1) page = 1;
                listMsg.edit({embeds: [getUsers(page)]});
                break;
            case "▶️":
                ++page;
                listMsg.edit({embeds: [getUsers(page)]});
                break;
            case "❌":
                listMsg.delete();
        };
    });
    collector.on('end', collected => {
        return Cancel(msg);
    });

    function getUsers(page) {
        const list = msg.guild.members.cache.map(u => u.username).sort();

        var pageNum = (page * 10) - 10;
        if (!pageNum) pageNum = 0;
        const channelList = new MessageEmbed()
        .setColor('#00ff00')
        .setTitle(`:white_check_mark: CHANNEL COUNT :bust_in_silhouette::1234:`)
        .setDescription('Channel')
        .addFields(
            { name: `All Members of ${msg.guild.name} [${msg.guild.members.cache.size}]`, value: `${list.slice(pageNum, pageNum + 9).join("\n") || "No more member"}`}
        )
        .setFooter(`${by} helps | ${(pageNum / 10) + 1}`)
        return channelList;
    };
}
module.exports = {
    name: "users",
    description: "Get a list of all the users of the server",
    example: prefix + "users",
    type: "Moderation",
    execute(msg, args) {
        users(msg, args);
    }
}