const { bot, emojiType } = require('../config.js');
const AliasEmbeds = require("../helpers/embeds.js");
const AliasUtils = require('../helpers/utils.js');
const AliasTemps = require('../helpers/temps.js');

module.exports = {
    name: "guild",
    description: "Get info on the guild",
    type: "Info",
    botPerms: [],
    memPerms: [],
    args: [],
    msgCommand: {
        exist: true,
        usage: bot.prefix + "guild",
    },
    intCommand: {
        exist: true,
        options: []
    },

    async msgRun(msg, args){
        try {
            const Info = await this.Guild(msg.guild);
            AliasUtils.sendEmbed(msg, Info);
        } catch {
            AliasUtils.sendError(msg, this.name);
        }

        msg.delete();
    },

    async intRun(int) {
        try {
            const Info = await this.Guild(int.guild);
            AliasUtils.sendEmbed(int, Info);
        } catch (e) {
            AliasUtils.sendError(int, this.name);
            console.log(e);
        }
    },

    async Guild(guild) {
        const verificationLevels = {
            0: "None",
            1: "Low",
            2: "Medium",
            3: "High",
            4: "Very High"
        }
    
        // Members
        const bots = guild.members.cache.filter(member => member.user.bot).size;
        const users = guild.members.cache.filter(member => !member.user.bot).size;
        // Channels
        const categoryChannels = guild.channels.cache.filter(channel => channel.type === 4).size;
        const textChannels = guild.channels.cache.filter(channel => channel.type === 0).size;
        const voiceChannels = guild.channels.cache.filter(channel => channel.type === 2).size;
        const newsChannels = guild.channels.cache.filter(channel => channel.type === 5).size;
        // Emojis
        const normalEmojis = guild.emojis.cache.filter(emoji => !emoji.animated).size;
        const animatedEmojis = guild.emojis.cache.filter(emoji => emoji.animated).size;
    
        const Info = AliasEmbeds.embedInfo("GUILD INFO", emojiType.guild,
        [
                { name: "Name", value: `\`\`\`${guild.name}\`\`\``, inline: true },
                { name: "Id", value: `\`\`\`${guild.id}\`\`\`` , inline: true },
            { name: "Create on", value: `\`\`\`${guild.createdAt.toDateString()} (${AliasTemps.timeDifference(guild.createdTimestamp)})\`\`\`` },
            { name: 'Owner', value: `\`\`\`${guild.members.cache.get(guild.ownerId).user.tag}\`\`\``},
            { name: `Members [${guild.members.cache.size}]`, value: `\`\`\`Users: ${users} | Bots: ${bots}\`\`\`` },
            { name: `Channels [${guild.channels.cache.size}]`, value: `\`\`\`Categories: ${categoryChannels} | Text: ${textChannels} | Voice: ${voiceChannels} \nNews: ${newsChannels}\`\`\`` },
            { name: `Roles [${guild.roles.cache.size}]`, value: `\`\`\`Highest: ${guild.roles.highest.name}\`\`\`` },
            { name: `Emojis [${guild.emojis.cache.size}]`, value: `\`\`\`Normal: ${normalEmojis} | Animated: ${animatedEmojis}\`\`\`` },
                { name: "System", value: `\`\`\`${guild.systemChannel?.name || `No System Channel`}\`\`\``, inline: true }, 
                { name: "Rule", value: `\`\`\`${guild.rulesChannel?.name || `No Rules Channel`}\`\`\``, inline: true },
                { name: "Boost Level", value: `\`\`\`${guild.premuimSubscriptionCount || '0'}\`\`\``, inline: true },
                { name: "Verification Level", value: `\`\`\`${verificationLevels[guild.verificationLevel]}\`\`\``, inline: true },
                { name: "Premium Tier", value: `\`\`\`${guild.premiumTier}\`\`\``, inline: true }
        ])
    
        return Info;
    }
}
