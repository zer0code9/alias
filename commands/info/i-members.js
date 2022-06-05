const { prefix, by } = require("../../config.json");
const { MessageEmbed } = require("discord.js");
const { Timeout, Wronganswer, Perm, Cancel, Invalid, Unknown } = require("../../errors");
async function membersRole(msg, args, example) {
    const role = msg.mentions.roles.first();
    if (!role) return Invalid(msg, `No Role`, `I need a role in order to return info about it`, `${example}`);

    var page = 1;
    const memberPage = new MessageEmbed()
    .setColor(`#00ff00`)
    .setTitle(":white_check_mark: ROLE MEMBERS COUNT :busts_in_silhouette::1234:")
    .setDescription("Info")
    .addFields(
        { name: `All Members with ${role.name}`, value: `Getting all members with ${role.name}`}
    )  
    .setFooter({ text: `${by} helps` })
    const listMsg = await msg.channel.send({ embeds: [memberPage] });

    await listMsg.react("◀️");
    await listMsg.react("▶️");
    await listMsg.react("❌");

    const filter = (reaction, user) => ["◀️", "▶️", "❌"].includes(reaction.emoji.name) && user.id === msg.author.id;
    const collector = listMsg.createReactionCollector(filter, { time: 120000} );
    await listMsg.edit({embeds: [getMembers(page)]});

    collector.on('collect', (reaction, user) => {
        reaction.emoji.reaction.users.remove(user.id);

        switch (reaction.emoji.name) {
            case "◀️":
                --page;
                if (page < 1) page = 1;
                listMsg.edit({embeds: [getMembers(page)]});
                break;
            case "▶️":
                ++page;
                listMsg.edit({embeds: [getMembers(page)]});
                break;
            case "❌":
                listMsg.delete();
        };
    });
    collector.on('end', collected => {
        return Cancel(msg);
    });

    function getMembers(page) {
        const list = role.members.map(m => m.username).sort();

        var pageNum = (page * 10) - 10;
        if (!pageNum) pageNum = 0;
        const memberList = new MessageEmbed()
        .setColor('#00ff00')
        .setTitle(":white_check_mark: ROLE MEMBERS COUNT :busts_in_silhouette::1234:")
        .setDescription("Info")
        .addFields(
            { name: `All Members with ${role.name}`, value: `${list.slice(pageNum, pageNum + 9).join("\n") || "No more member with role"}`}
        )
        .setFooter(`${by} helps | ${(pageNum / 10) + 1}`)
        return memberList;
    };
}

module.exports = {
    name: "members",
    description: "Get the names of members that have a certain role",
    example: prefix + "members [role]",
    type: "info",
    execute(msg, args) {
        membersRole(msg, args, this.example);
    }
}