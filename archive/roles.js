const { bot, colorEmbed, emoji } = require("../config.js");
const { PermissionFlagsBits } = require("discord.js");
const { Cancel } = require("../helpers/errors");
const { embedSuccess, embed } = require("../helpers/embeds");

module.exports = {
    name: "roles",
    description: "Get a list of all the roles of the server",
    type: "Info",
    botPerms: [],
    memPerms: [],
    msgCommand: {
        exist: true,
        usage: bot.prefix + "roles"
    },
    intCommand: {
        exist: false
    },

    async msgRun(msg, args) {
        var page = 1;

        const RolePage = embedSuccess("ROLE COUNT", emoji.role, emoji.count, this.type,
        [
            { name: `All Roles of ${msg.guild.name} [${msg.guild.roles.cache.size}]`, value: `Getting all roles`}
        ])
        const listMsg = await msg.channel.send({ embeds: [RolePage] });
    
        await listMsg.react("◀️");
        await listMsg.react("▶️");
        await listMsg.react("❌");
    
        const filter = (reaction, user) => ["◀️", "▶️", "❌"].includes(reaction.emoji.name) && user.id === msg.author.id;
        const collector = listMsg.createReactionCollector(filter, { time: 120000} );
        await listMsg.edit({ embeds: [getRoles(page, this)] });
    
        collector.on('collect', (reaction, user) => {
            reaction.emoji.reaction.users.remove(user.id);
    
            switch (reaction.emoji.name) {
                case "◀️":
                    --page;
                    if (page < 1) page = 1;
                    listMsg.edit({embeds: [getRoles(page, this)]});
                    break;
                case "▶️":
                    ++page;
                    listMsg.edit({embeds: [getRoles(page, this)]});
                    break;
                case "❌":
                    listMsg.delete();
            };
        });
        collector.on('end', collected => {
            return Cancel(msg);
        });
    
        function getRoles(page, command) {
            const list = msg.guild.roles.cache.map(r => r.name).sort();
    
            var pageNum = (page * 10) - 10;
            if (!pageNum) pageNum = 0;
            const RoleList = embed(colorEmbed.success, `:${emoji.success}: CHANNEL COUNT :${emoji.role}::${emoji.count}:`, command.type, [
                { name: `All Roles of ${msg.guild.name} [${msg.guild.roles.cache.size}]`, value: `${list.slice(pageNum, pageNum + 9).join("\n") || "No more role"}`}
            ], `${bot.name} helps | ${(pageNum / 10) + 1}`)
            return RoleList;
        };
    }
}