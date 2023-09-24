const { bot, colorEmbed, emoji } = require("../config.js");
const { PermissionFlagsBits, ApplicationCommandOptionType } = require("discord.js");
const { Cancel, Invalid } = require("../errors");
const { embedSuccess, embed } = require("../embed");

module.exports = {
    name: "members",
    description: "Get the names of members that have a certain role",
    type: "Info",
    botPerms: [],
    memPerms: [],
    msgCommand: {
        exist: true,
        usage: bot.prefix + "members [role:ro|id]"
    },
    intCommand: {
        exist: false,
        options: [
            {
                name: "role",
                description: "The role of the members",
                type: "role",
                required: true,
            }
        ]
    },

    async msgRun(msg, args) {
        const role = await msg.guild.roles.cache.get(args[0]) || msg.mentions.roles.first();
        if (!role) return Invalid(msg, `No Role`, `I need a role in order to return info about it \n(mention:role or role:id)`, this.msgCommand.usage);
    
        var page = 1;

        const MemberPage = embedSuccess("ROLE MEMBER COUNT", "placard", emoji.count, this.type,
        [
            { name: `All Members with ${role.name}`, value: `Getting all members with ${role.name}` }
        ])
        const listMsg = await msg.channel.send({ embeds: [MemberPage] });
    
        await listMsg.react("◀️");
        await listMsg.react("▶️");
        await listMsg.react("❌");
    
        const filter = (reaction, user) => ["◀️", "▶️", "❌"].includes(reaction.emoji.name) && user.id === msg.author.id;
        const collector = listMsg.createReactionCollector(filter, { time: 120000} );
        await listMsg.edit({embeds: [getMembers(page, this)]});
    
        collector.on('collect', (reaction, user) => {
            reaction.emoji.reaction.users.remove(user.id);
    
            switch (reaction.emoji.name) {
                case "◀️":
                    --page;
                    if (page < 1) page = 1;
                    listMsg.edit({embeds: [getMembers(page, this)]});
                    break;
                case "▶️":
                    ++page;
                    listMsg.edit({embeds: [getMembers(page, this)]});
                    break;
                case "❌":
                    listMsg.delete();
            };
        });
        collector.on('end', collected => {
            return Cancel(msg);
        });
    
        function getMembers(page, command) {
            const list = role.members.map(m => m.username).sort();
    
            var pageNum = (page * 10) - 10;
            if (!pageNum) pageNum = 0;
            const MemberList = embed(colorEmbed.success, `:${emoji.success}: ROLE MEMBER COUNT :placard::${emoji.count}:`, command.type, [
                { name: `All Members with ${role.name}`, value: `${list.slice(pageNum, pageNum + 9).join("\n") || "No more member with role"}` }
            ], `${bot.name} helps | ${(pageNum / 10) + 1}`)
            return MemberList;
        };
    }
}