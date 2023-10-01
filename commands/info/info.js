const { bot, emojiType } = require('../../config.js');
const { ApplicationCommandOptionType } = require('discord.js');
const AliasCancels = require("../../helpers/cancels");
const AliasEmbeds = require("../../helpers/embeds");
const AliasUtils = require("../../helpers/utils");
const AliasTemps = require('../../helpers/temps');

module.exports = {
    name: "info",
    description: "Get info on stuff",
    type: "Info",
    botPerms: [],
    memPerms: [],
    args: [
        { name: "channel", type: "channel-mention|id", required: true }
    ],
    msgCommand: { exist: true },
    intCommand: { exist: true },
    settings: {
        existMsg: true,
        existInt: true,
        sub: true,
        options: [
            {
                name: "channel",
                description: "Get info on a channel",
                type: ApplicationCommandOptionType.Subcommand,
                options: [
                    {
                        name: "channel",
                        description: "The channel to get info on [channel]",
                        type: ApplicationCommandOptionType.Channel,
                        specific: "channel",
                        options: [],
                        required: true,
                    }
                ]
            },
            {
                name: "role",
                description: "Get info on a role",
                type: ApplicationCommandOptionType.Subcommand,
                options: [
                    {
                        name: "role",
                        description: "The role to get info on [role]",
                        type: ApplicationCommandOptionType.Role,
                        specific: "role",
                        options: [],
                        required: true,
                    }
                ]
            },
            {
                name: "user",
                description: "Get info on a user",
                type: ApplicationCommandOptionType.Subcommand,
                options: [
                    {
                        name: "user",
                        description: "The user to get info on [user]",
                        type: ApplicationCommandOptionType.User,
                        specific: "user",
                        options: [],
                        required: false,
                    }
                ]
            },
            {
                name: "guild",
                description: "Get info on a guild",
                type: ApplicationCommandOptionType.Subcommand,
                options: []
            },
            {
                name: "bot",
                description: "Get info on the bot",
                type: ApplicationCommandOptionType.Subcommand,
                options: []
            },
            {
                name: "emoji",
                description: "Get info on an emoji",
                type: ApplicationCommandOptionType.Subcommand,
                options: [
                    {
                        name: "emoji",
                        description: "The emoji to get info on [id]",
                        type: ApplicationCommandOptionType.String,
                        specific: "id",
                        options: [],
                        required: true,
                    }
                ]
            }
        ]
    },
    
    async msgRun(msg, args, alias) {
        let thing = args[0];

        if (thing == "channel") {
            const channel = await msg.guild.channels.cache.get(args[1]) ?? msg.guild.channels.cache.get(msg.mentions.channels.first()?.id);

            try {
                const Info = await this.Channel(msg, channel);
                AliasUtils.sendEmbed(msg, Info);
            } catch {
                AliasUtils.sendError(msg, this.name);
            }
        }

        else if (thing == "role") {
            const role = await msg.guild.roles.cache.get(args[1]) ?? msg.guild.roles.cache.get(msg.mentions.roles.first()?.id);

            try {
                const Info = await this.Role(msg, role);
                AliasUtils.sendEmbed(msg, Info);
            } catch {
                AliasUtils.sendError(msg, this.name);
            }
        }

        else if (thing == "user") {
            const user = await msg.guild.members.cache.get(args[1]) ?? await msg.guild.members.cache.get(msg.mentions.users.first()?.id);
        
            try {
                const Info = await this.User(msg, user);
                AliasUtils.sendEmbed(msg, Info);
            } catch {
                AliasUtils.sendError(msg, this.name);
            }
        }

        else if (thing == "guild") {
            try {
                const Info = await this.Guild(msg.guild);
                AliasUtils.sendEmbed(msg, Info);
            } catch {
                AliasUtils.sendError(msg, this.name);
            }
        }

        else if (thing == "bot") {
            try {
                const Info = await this.Bot(alias);
                AliasUtils.sendEmbed(msg, Info);
            } catch {
                AliasUtils.sendError(msg, this.name);
            }
        }

        else if (thing == "emoji") {
            const emoji = await msg.guild.emojis.cache.get(args[1]);
    
            try {
                const Info = await this.Emoji(emoji);
                AliasUtils.sendEmbed(msg, Info);
            } catch {
                AliasUtils.sendError(msg, this.name);
            }
        }

        else {
            const Invalid = AliasEmbeds.embed(colorEmbed.warning, "Invalid Thing", this.type, [
                { name: `Unknown Thing Used`, value: `I don't know the thing ${action}` },
                { name: "Possible Things", value: `channel | role | user | guild | bot | emoji `}
            ], bot.name + " helps");
            AliasUtils.sendEmbed(msg, Invalid);
        }

        msg.delete();
    },

    async intRun(int, alias) {
        const thing = await int.options.getSubcommand();

        if (thing == "channel") {
            const channel = int.options.getChannel('channel');

            try {
                const Info = await this.Channel(int, channel);
                AliasUtils.sendEmbed(int, Info);
            } catch {
                AliasUtils.sendError(int, this.name);
            }
        }

        else if (thing == "role") {
            const role = int.options.getRole('role');

            try {
                const Info = await this.Role(int, role);
                AliasUtils.sendEmbed(int, Info);
            } catch {
                AliasUtils.sendError(int, this.name);
            }
        }

        else if (thing == "user") {
            let user = int.options.getUser('user');

            try {
                const Info = await this.User(int, user);
                AliasUtils.sendEmbed(int, Info);
            } catch {
                AliasUtils.sendError(int, this.name);
            }
        }

        else if (thing == "guild") {
            try {
                const Info = await this.Guild(int.guild);
                AliasUtils.sendEmbed(int, Info);
            } catch {
                AliasUtils.sendError(int, this.name);
            }
        }

        else if (thing == "bot") {
            try {
                const Info = await this.Bot(alias);
                AliasUtils.sendEmbed(int, Info);
            } catch {
                AliasUtils.sendError(int, this.name);
            }
        }

        else if (thing == "emoji") {
            const emoji = int.guild.emojis.cache.get(int.options.getChannel('emoji'));

            try {
                const Info = await this.Emoji(emoji);
                AliasUtils.sendEmbed(int, Info);
            } catch {
                AliasUtils.sendError(int, this.name);
            }
        }

    },

    async Channel(type, channel) {
        const settings = this.settings.options[0];
        if (!channel)
return AliasCancels.invalid(`No Channel`, `I need a channel in order to return info about it \n(${settings.options[0].specific})`, AliasUtils.getUsage(this, "channel"));

        const guildTypes = {
            0: "Text",
            1: "DM",
            2: "Voice",
            3: "Group DM",
            4: "Category",
            5: "Announcement/News",
            10: "News Thread",
            11: "Public Thread",
            12: "Private Thread",
            13: "Stage",
            14: "Directory",
            15: "Forum",
        }
    
        const Info = AliasEmbeds.embedInfo("CHANNEL INFO", emojiType.channel,
        [
                { name: "Name", value: `\`\`\`${channel.name}\`\`\``, inline: true },
                { name: "Id", value: `\`\`\`${channel.id}\`\`\``, inline: true },
            { name: "Created on", value: `\`\`\`${channel.createdAt.toDateString()} (${AliasTemps.timeDifference(channel.createdTimestamp)})\`\`\`` },
                { name: "Type", value: `\`\`\`${guildTypes[channel.type] ?? channel.type}\`\`\``, inline: true},
                { name: "Parent", value: `\`\`\`${type.guild.channels.cache.get(channel.parentId)?.name ?? `No Parent`}\`\`\``, inline: true },
                { name: "Topic", value: `\`\`\`${channel.topic ?? `No Topic`}\`\`\``, inline: true },
                { name: "Is NSFW", value: `\`\`\`${channel.nsfw ? `Yes` : `No`}\`\`\``, inline: true }
        ])
        return Info;
    },

    async Role(type, role) {
        const settings = this.settings.options[1];
        if (!role)
return AliasCancels.invalid(`No Role`, `I need a role in order to return info about it \n(${settings.options[0].specific})`, AliasUtils.getUsage(this, "role"));

        const Info = AliasEmbeds.embedInfo("ROLE INFO", emojiType.role,
        [
                { name: "Name", value: `\`\`\`${role.name}\`\`\``, inline: true },
                { name: "Id", value: `\`\`\`${role.id}\`\`\``, inline: true },
            { name: "Created on", value: `\`\`\`${role.createdAt.toDateString()} (${AliasTemps.timeDifference(role.createdTimestamp)})\`\`\`` },
                { name: "Color", value: `\`\`\`${role.hexColor}\`\`\``, inline: true},
                { name: "Members", value: `\`\`\`${role.members.size}\`\`\``, inline: true },
                { name: "Position", value: `\`\`\`${parseInt(type.guild.roles.cache.size) - parseInt(role.position)}\`\`\``, inline: true},
            { name: `Permissions`, value: `\`\`\`${role.permissions.toArray().length}\`\`\`` }
        ])
        return Info;
    },

    async User(type, user) {
        const settings = this.settings.options[2];
        if (!user) user = await type.member;

        const Info = AliasEmbeds.embedInfo("USER INFO", emojiType.user,
        [
                { name: "Name", value: `\`\`\`${user.user.tag}\`\`\``, inline: true },
                { name: "Id", value: `\`\`\`${user.user.id}\`\`\``, inline: true },
            { name: "Created on", value: `\`\`\`${user.user.createdAt.toDateString()} (${AliasTemps.timeDifference(user.user.createdTimestamp)})\`\`\`` },
            { name: "Joined on", value: `\`\`\`${user.joinedAt.toDateString()} (${AliasTemps.timeDifference(user.joinedTimestamp)})\`\`\`` },
                { name: "Nickname", value: `\`\`\`${user.nickname ?? `No nickname`}\`\`\``, inline: true },
                { name: "Is Bot", value: `\`\`\`${user.user.bot ? `Yes` : `No`}\`\`\``, inline: true },
        ])
        return Info;
    },

    async Guild(guild) {
        const settings = this.settings.options[3];
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
    },

    async Bot(alias) {
        const settings = this.settings.options[4];
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
    },

    async Emoji(emoji) {
        const settings = this.settings.options[5];
        if (!emoji)
return AliasCancels.invalid(`No Emoji`, `I need an emoji in order to return info about it \n(${settings.options[0].specific})`, AliasUtils.getUsage(this, "emoji"));

        const Info = AliasEmbeds.embedInfo("EMOJI INFO", emojiType.emoji,
        [
                { name: "Username", value: `\`\`\`${emoji.name}\`\`\``, inline: true },
                { name: "Id", value: `\`\`\`${emoji.id}\`\`\``, inline: true },
            { name: "Created on", value: `\`\`\`${emoji.createdAt.toDateString()} (${AliasTemps.timeDifference(emoji.createdTimestamp)})\`\`\`` },
            { name: "Identifier", value: `\`\`\`${emoji.identifier}\`\`\`` },
            { name: "Is Animated", value: `\`\`\`${emoji.animated ? `Yes` : `No`}\`\`\`` },
            { name: "URL", value: `\`\`\`${emoji.url}\`\`\`` }
        ])
        return Info;
    }
}