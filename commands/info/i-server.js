const { prefix, by } = require("../../config.json");
const { MessageEmbed } = require("discord.js");
const { Invalid } = require('../../errors');
const { timeDifference } = require('../../functions')
async function serverInfo(msg, args) {
    let guild = await msg.guild;

    const verificationLevels = {
        NONE: "None",
        LOW: "Low",
        MEDUIM: "Medium",
        HIGH: "High",
        VERY_HIGH: "Very High"
    }
    const premiumTiers = {
        NONE: "None"
    }

    // Members
    const bots = msg.guild.members.cache.filter(member => member.user.bot).size;
    const users = msg.guild.members.cache.filter(member => !member.user.bot).size;
    // Channels
    const categoryChannels = guild.channels.cache.filter(channel => channel.type === "GUILD_CATEGORY").size;
    const textChannels = guild.channels.cache.filter(channel => channel.type === "GUILD_TEXT").size;
    const voiceChannels = guild.channels.cache.filter(channel => channel.type === "GUILD_VOICE").size;
    const newsChannels = guild.channels.cache.filter(channel => channel.type === "GUILD_NEWS").size;
    // Emojis
    const normalEmojis = guild.emojis.cache.filter(emoji => !emoji.animated).size;
    const animatedEmojis = guild.emojis.cache.filter(emoji => emoji.animated).size;

    const Info = new MessageEmbed()
    .setColor('#00ff00')
    .setTitle(`:desktop: SERVER INFO :desktop:`)
    .setThumbnail(`${guild.iconURL()}`)
    .setDescription(`Info`)
    .addFields(
        [
            { name: "Server Name", value: `\`\`\`${guild.name}\`\`\``, inline: true},
            { name: "Server Id", value: `\`\`\`${guild.id}\`\`\`` , inline: true},
        ],
            { name: "Create on", value: `\`\`\`${guild.createdAt.toDateString()} (${timeDifference(guild.createdTimestamp)})\`\`\`` },
            { name: 'Server Owner', value: `\`\`\`${msg.guild.members.cache.get(guild.ownerId).tag}\`\`\``},
            { name: `Server Members [${msg.guild.memberCount}]`, value: `\`\`\`Users: ${users} | Bots: ${bots}\`\`\`` },
            { name: `Server Channels [${guild.channels.cache.size}]`, value: `\`\`\`Categories: ${categoryChannels} | Text: ${textChannels} | Voice: ${voiceChannels} \nNews: ${newsChannels}\`\`\`` },
            { name: `Server Roles [${guild.roles.cache.size}]`, value: `\`\`\`Highest: ${guild.roles.highest.name}\`\`\`` },
            { name: `Server Emojis [${guild.emojis.cache.size}]`, value: `\`\`\`Normal: ${normalEmojis} | Animated: ${animatedEmojis}\`\`\`` },
        [ 
            { name: "System", value: `\`\`\`${guild.systemChannel.name || "No System Channel"}\`\`\``, inline: true}, 
            { name: "Rule", value: `\`\`\`${guild.rulesChannel.name || "No Rules Channel"}\`\`\``, inline: true}
        ],
        [
            { name: "Boost Level", value: `\`\`\`${msg.guild.premuimSubscriptionCount || '0'}\`\`\``, inline: true },
            { name: "Verification Level", value: `\`\`\`${verificationLevels[guild.verificationLevel]}\`\`\``, inline: true },
            { name: "Premium Tier", value: `\`\`\`${guild.premiumTier}\`\`\``, inline: true}
        ],
    )
    .setFooter({ text: `${by} helps` })
    await msg.channel.send({ embeds: [Info] });
    msg.delete();
}


module.exports = {
    name: "server",
    description: "Bot info",
    example: prefix + "server",
    type: "info",
    execute(msg, args){
        serverInfo(msg, args);
    }
}
