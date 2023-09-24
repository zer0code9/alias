const { bot, colorEmbed, emoji } = require("../config.js");
const { PermissionFlagsBits } = require("discord.js");
const { Cancel } = require("../errors");
const { embedSuccess, embed } = require("../embed");

module.exports = {
    name: "users",
    description: "Get a list of all the users of the server",
    type: "Info",
    botPerms: [],
    memPerms: [],
    msgCommand: {
        exist: true,
        usage: bot.prefix + "users"
    },
    intCommand: {
        exist: false,
    },

    async msgRun(msg, args) {
        page = 1;

        const UserPage = embedSuccess("USER COUNT", emoji.user, emoji.count, this.type,
        [
            { name: `All Users of ${msg.guild.name} [${msg.guild.members.cache.size}]`, value: `Getting all users`}
        ])
        const listMsg = await msg.channel.send({ embeds: [UserPage] });
    
        await listMsg.react("◀️");
        await listMsg.react("▶️");
        await listMsg.react("❌");
    
        const filter = (reaction, user) => ["◀️", "▶️", "❌"].includes(reaction.emoji.name) && user.id === msg.author.id;
        const collector = listMsg.createReactionCollector(filter, { time: 120000} );
        await listMsg.edit({embeds: [getUsers(page, this)]});
    
        collector.on('collect', (reaction, user) => {
            reaction.emoji.reaction.users.remove(user.id);
    
            switch (reaction.emoji.name) {
                case "◀️":
                    --page;
                    if (page < 1) page = 1;
                    listMsg.edit({embeds: [getUsers(page, this)]});
                    break;
                case "▶️":
                    ++page;
                    listMsg.edit({embeds: [getUsers(page, this)]});
                    break;
                case "❌":
                    listMsg.delete();
            };
        });
        collector.on('end', collected => {
            return Cancel(msg);
        });
    
        function getUsers(page, command) {
            const list = msg.guild.members.cache.map(u => u.username).sort();
    
            var pageNum = (page * 10) - 10;
            if (!pageNum) pageNum = 0;
            const UserList = embed(colorEmbed.success, `:${emoji.success}: USER COUNT :${emoji.user}::${emoji.count}:`, command.type, [
                { name: `All Users of ${msg.guild.name} [${msg.guild.members.cache.size}]`, value: `${list.slice(pageNum, pageNum + 9).join("\n") || "No more user"}`}
            ], `${bot.name} helps | ${(pageNum / 10) + 1}`)
            return UserList;
        };
    }
}