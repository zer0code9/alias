const { prefix, by } = require("./../config.json");
const { MessageEmbed } = require("discord.js");
const { Timeout, Wronganswer, Perm, Cancel, Invalid, Unknown } = require("../errors");
async function users(msg, args) {
    page = 1;
    const userPage = new MessageEmbed()
    .setColor(`#00ff00`)
    .setTitle(":white_check_mark: MEMBERS COUNT :busts_in_silhoutte::1234:")
    .setDescription("Info")
    .addFields(
        { name: `All Members of ${msg.guild.name} [${msg.guild.members.cache.size}]`, value: `Getting all members`}
    )  
    .setFooter(`${by} helps`)
    const listMsg = await msg.channel.send({ embeds: [userPage] });

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
        const list = msg.guild.members.cache.map(m => m).sort();

        var pageNum = (page * 10) - 10;
        if (!pageNum) pageNum = 0;
        const userList = new MessageEmbed()
        .setColor('#00ff00')
        .setTitle(":white_check_mark: MEMBERS COUNT :busts_in_silhouette::1234:")
        .setDescription("Info")
        .addFields(
            { name: `All Members of ${msg.guild.name} [${msg.guild.members.cache.size}]`, value: `${list.slice(pageNum, pageNum + 9).join("\n") || "No more member"}`}
        )
        .setFooter(`${by} helps | ${(pageNum / 10) + 1}`)
        return userList;
    };
}

module.exports = {
    name: "users",
    description: "Get a list of all the roles of the server",
    example: prefix + "users",
    type: "info",
    execute(msg, args) {
        users(msg, args);
    }
}