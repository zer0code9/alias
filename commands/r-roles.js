const { prefix, by } = require("./../config.json");
const { MessageEmbed } = require("discord.js");
const { Timeout, Wronganswer, Perm, Cancel, Invalid, Unknown } = require("../errors");
async function roles(msg, args) {
    var page = 1;
    const rolePage = new MessageEmbed()
    .setColor('#00ff00')
    .setTitle(`:white_check_mark: ROLE COUNT :label::1234:`)
    .setDescription('Role')
    .addFields(
        { name: `All Roles of ${msg.guild.name} [${msg.guild.roles.cache.size}]`, value: `Getting all roles`}
    )
    .setFooter(`${by} helps`)
    const listMsg = await msg.channel.send({ embeds: [rolePage] });

    await listMsg.react("◀️");
    await listMsg.react("▶️");
    await listMsg.react("❌");

    const filter = (reaction, user) => ["◀️", "▶️", "❌"].includes(reaction.emoji.name) && user.id === msg.author.id;
    const collector = listMsg.createReactionCollector(filter, { time: 120000} );
    await listMsg.edit({embeds: [getRoles(page)]});

    collector.on('collect', (reaction, user) => {
        reaction.emoji.reaction.users.remove(user.id);

        switch (reaction.emoji.name) {
            case "◀️":
                --page;
                if (page < 1) page = 1;
                listMsg.edit({embeds: [getRoles(page)]});
                break;
            case "▶️":
                ++page;
                listMsg.edit({embeds: [getRoles(page)]});
                break;
            case "❌":
                listMsg.delete();
        };
    });
    collector.on('end', collected => {
        return Cancel(msg);
    });

    function getRoles(page) {
        const list = msg.guild.roles.cache.map(r => r.name).sort();

        var pageNum = (page * 10) - 10;
        if (!pageNum) pageNum = 0;
        const roleList = new MessageEmbed()
        .setColor('#00ff00')
        .setTitle(`:white_check_mark: ROLE COUNT :label::1234:`)
        .setDescription('Role')
        .addFields(
            { name: `All Roles of ${msg.guild.name} [${msg.guild.roles.cache.size}]`, value: `${list.slice(pageNum, pageNum + 9).join("\n") || "No more role"}`}
        )
        .setFooter(`${by} helps | ${(pageNum / 10) + 1}`)
        return roleList;
    };
}
module.exports = {
    name: "roles",
    description: "Get a list of all the roles of the server",
    example: prefix + "roles",
    type: "role",
    execute(msg, args) {
        roles(msg, args);
    }
}