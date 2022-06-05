const { prefix, by } = require("../../config.json");
const { MessageEmbed } = require("discord.js");
const { Invalid } = require('../../errors');
const { timeDifference } = require('../../functions')
function serverInfo(msg, args) {
    let guild = msg.guild;
    var cre = guild.createdAt;
    if(args == 0){

        const verificationLevels = {
            NONE: "None",
            LOW: "Low",
            MEDUIM: "Medium",
            HIGH: "High",
            VERY_HIGH: "Very High"
        }
        const regions = {
            brazil: 'Brazil',
            europe: 'Europe',
            hongkong: 'Hong Kong',
            india: 'India',
            japan: 'Japan',
            russia: 'Russia',
            singapore: 'Singapore',
            southafrica: 'South Africa',
            sydney: 'Sydney',
            'us-central': 'US Central',
            'us-east': 'US East',
            'us-west': 'US West',
            'us-south': 'US South'
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
                { name: "Create on", value: `\`\`\`${cre.toDateString()} (${timeDifference(guild.createdTimestamp)})\`\`\`` },
                { name: 'Server Region', value: `\`\`\`${regions[guild.region]}\`\`\`` },
                { name: 'Server Owner', value: `\`\`\`${msg.guild.members.fetch(guild.ownerId).user.username}\`\`\``},
                { name: `Server Members [${msg.guild.memberCount}]`, value: `\`\`\`Users: ${users} | Bots: ${bots}\`\`\`` },
                { name: `Server Channels [${guild.channels.cache.size}]`, value: `\`\`\`Categories: ${categoryChannels} | Text: ${textChannels} | Voice: ${voiceChannels} \nNews: ${newsChannels}\`\`\`` },
                { name: `Server Roles [${guild.roles.cache.size}]`, value: `\`\`\`Highest: ${guild.roles.highest.name}\`\`\`` },
                { name: `Server Emojis [${guild.emojis.cache.size}]`, value: `\`\`\`Normal: ${normalEmojis} | Animated: ${animatedEmojis}\`\`\`` },
            [ 
                { name: "System", value: `\`\`\`${guild.systemChannel.name || "No System Channel"}\`\`\``, inline: true}, 
                //{ name: "Rule", value: `\`\`\`${guild.rulesChannel.name || "No Rules Channel"}\`\`\``, inline: true}
            ],
            [
                { name: "Boost Level", value: `\`\`\`${msg.guild.premuimSubscriptionCount || '0'}\`\`\``, inline: true },
                { name: "Verification Level", value: `\`\`\`${verificationLevels[guild.verificationLevel]}\`\`\``, inline: true }
            ],
        )
        .setFooter({ text: `${by} helps` })
        msg.channel.send({ embeds: [Info] });
        //console.log(msg.guild.members.fetch(guild.ownerId))
    }
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
