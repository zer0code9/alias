const { bot, emojiType } = require('../config.js');
const AliasEmbeds = require("../helpers/embeds.js");
const AliasUtils = require('../helpers/utils.js');
const AliasTemps = require('../helpers/temps.js');

module.exports = {
    name: "bot",
    description: "Get info on the bot",
    type: "Info",
    botPerms: [],
    memPerms: [],
    args: [],
    msgCommand: {
        exist: true,
        usage: bot.prefix + "bot",
    },
    intCommand: {
        exist: true,
        options: []
    },

    async msgRun(msg, args, alias) {
        try {
            const Info = await this.Bot(alias);
            AliasUtils.sendEmbed(msg, Info);
        } catch {
            AliasUtils.sendError(msg, this.name);
        }

        msg.delete();
    },

    async intRun(int, alias) {
        try {
            const Info = await this.Bot(alias);
            AliasUtils.sendEmbed(int, Info);
        } catch {
            AliasUtils.sendError(int, this.name);
        }
    },

    async Bot(alias) {
        const Info = AliasEmbeds.embedInfo("BOT INFO", emojiType.bot,
        [
                { name: "Name", value: `\`\`\`${alias.user.tag}\`\`\``, inline: true },
                { name: "Id", value: `\`\`\`${alias.user.id}\`\`\``, inline: true },
                { name: "Version", value: `\`\`\`${bot.version}\`\`\``, inline: true },
            { name: "Create on", value: `\`\`\`${alias.user.createdAt.toDateString()} (${AliasTemps.timeDifference(alias.user.createdTimestamp)})\`\`\`` },
            { name: "Last Ready on", value: `\`\`\`${alias.readyAt.toDateString()} (${AliasTemps.timeDifference(alias.readyTimestamp)})\`\`\`` },
            { name: "Application", value: `\`\`\`${alias.user.application}\`\`\`` },
                { name: "On", value: `\`\`\`Guilds: ${alias.guilds.cache.size} | Channels: ${alias.channels.cache.size}\`\`\`` },
                { name: "Has", value: `\`\`\`Users: ${alias.users.cache.size} | Emojis: ${alias.emojis.cache.size}\`\`\`` }
        ])
        return Info;
    }
}