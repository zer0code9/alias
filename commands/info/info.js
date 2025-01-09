const { bot, emojiType, colorEmbed } = require('../../config');
const { ApplicationCommandOptionType, Message, ChatInputCommandInteraction, GuildChannel, Role, GuildMember, Guild, Client, GuildEmoji } = require('discord.js');
const AliasEmbeds = require("../../helpers/embeds");
const AliasUtils = require("../../helpers/utils");
const AliasTemps = require('../../helpers/temps');
const AliasSends = require("../../helpers/sends");
const alias = require('../../client');

module.exports = {
    settings: {
        name: "info",
        idDB: "032712401586",
        description: "Get info on stuff",
        cateogry: "Info",
        botPerms: [],
        memPerms: [],
        existMsg: true,
        existInt: true,
        type: 1,
        options: [
            {
                name: "channel",
                description: "Get info on a channel",
                type: ApplicationCommandOptionType.Subcommand,
                options: [
                    {
                        name: "channel",
                        description: "The channel to get info on [channel-mention|id]",
                        type: ApplicationCommandOptionType.Channel,
                        specific: "channel-mention|id",
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
                        description: "The role to get info on [role-mention|id]",
                        type: ApplicationCommandOptionType.Role,
                        specific: "role-mention|id",
                        required: true,
                    }
                ]
            },
            {
                name: "member",
                description: "Get info on a member",
                type: ApplicationCommandOptionType.Subcommand,
                options: [
                    {
                        name: "member",
                        description: "The member to get info on [user-mention|id]",
                        type: ApplicationCommandOptionType.User,
                        specific: "user-mention|id",
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
                        description: "The emoji to get info on [emoji-id]",
                        type: ApplicationCommandOptionType.String,
                        specific: "emoji-id",
                        required: true,
                    }
                ]
            }
        ]
    },

    /**
     * 
     * @param {Message} msg 
     * @param {String[]} args 
     */
    async msgRun(msg, args) {
        let thing = args[0];

        if (thing == "channel") {
            const channel = msg.guild.channels.cache.get(args[1]) ?? msg.guild.channels.cache.get(msg.mentions.channels.first()?.id);

            try {
                const Info = await this.Channel(msg, channel);
                AliasSends.sendEmbed(msg, Info);
            } catch {
                AliasSends.sendError(msg, this.settings.name);
            }
        }

        else if (thing == "role") {
            const role = msg.guild.roles.cache.get(args[1]) ?? msg.guild.roles.cache.get(msg.mentions.roles.first()?.id);

            try {
                const Info = await this.Role(msg, role);
                AliasSends.sendEmbed(msg, Info);
            } catch {
                AliasSends.sendError(msg, this.settings.name);
            }
        }

        else if (thing == "member") {
            const member = msg.guild.members.cache.get(args[1]) ?? msg.guild.members.cache.get(msg.mentions.users.first()?.id);
        
            try {
                const Info = await this.Member(msg, member);
                AliasSends.sendEmbed(msg, Info);
            } catch {
                AliasSends.sendError(msg, this.settings.name);
            }
        }

        else if (thing == "guild") {
            try {
                const Info = await this.Guild(msg.guild);
                AliasSends.sendEmbed(msg, Info);
            } catch {
                AliasSends.sendError(msg, this.settings.name);
            }
        }

        else if (thing == "bot") {
            try {
                const Info = await this.Bot(alias);
                AliasSends.sendEmbed(msg, Info);
            } catch {
                AliasSends.sendError(msg, this.settings.name);
            }
        }

        else if (thing == "emoji") {
            const emoji = msg.guild.emojis.cache.get(args[1]);
    
            try {
                const Info = await this.Emoji(emoji);
                AliasSends.sendEmbed(msg, Info);
            } catch {
                AliasSends.sendError(msg, this.settings.name);
            }
        }

        else {
            const Invalid = AliasEmbeds.embed(colorEmbed.warning, "Invalid Thing", this.settings.category, [
                { name: `Unknown Thing Used`, value: `I don't know the thing ${action}` },
                { name: "Possible Things", value: `channel | role | user | guild | bot | emoji `}
            ], bot.name + " helps");
            AliasSends.sendEmbed(msg, Invalid);
        }

        msg.delete();
    },

    /**
     * 
     * @param {ChatInputCommandInteraction} int 
     */
    async intRun(int) {
        const thing = int.options.getSubcommand();

        if (thing == "channel") {
            const channel = int.options.getChannel('channel');

            try {
                const Info = await this.Channel(int, channel);
                AliasSends.sendEmbed(int, Info);
            } catch {
                AliasSends.sendError(int, this.settings.name);
            }
        }

        else if (thing == "role") {
            const role = int.options.getRole('role');

            try {
                const Info = await this.Role(int, role);
                AliasSends.sendEmbed(int, Info);
            } catch {
                AliasSends.sendError(int, this.settings.name);
            }
        }

        else if (thing == "member") {
            let member = int.guild.members.cache.get(int.options.getUser('member').id);

            try {
                const Info = await this.Member(int, member);
                AliasSends.sendEmbed(int, Info);
            } catch {
                AliasSends.sendError(int, this.settings.name);
            }
        }

        else if (thing == "guild") {
            try {
                const Info = await this.Guild(int.guild);
                AliasSends.sendEmbed(int, Info);
            } catch {
                AliasSends.sendError(int, this.settings.name);
            }
        }

        else if (thing == "bot") {
            try {
                const Info = await this.Bot(alias);
                AliasSends.sendEmbed(int, Info);
            } catch {
                AliasSends.sendError(int, this.settings.name);
            }
        }

        else if (thing == "emoji") {
            const emoji = int.guild.emojis.cache.get(int.options.getString('emoji'));

            try {
                const Info = await this.Emoji(emoji);
                AliasSends.sendEmbed(int, Info);
            } catch {
                AliasSends.sendError(int, this.settings.name);
            }
        }
    },

    /**
     * 
     * @param {Message | ChatInputCommandInteraction} type 
     * @param {GuildChannel} channel 
     * @returns {Promise<EmbedBuilder>}
     */
    async Channel(type, channel) {
        const options = this.settings.options[0];
        if (!channel) return AliasEmbeds.invalid(`No Channel`, `I need a channel in order to return info about it \n(${options.options[0].specific})`, AliasUtils.getUsage(this, "channel"));

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

    /**
     * 
     * @param {Message | ChatInputCommandInteraction} type 
     * @param {Role} role 
     * @returns {Promise<EmbedBuilder>}
     */
    async Role(type, role) {
        const options = this.settings.options[1];
        if (!role) return AliasEmbeds.invalid(`No Role`, `I need a role in order to return info about it \n(${options.options[0].specific})`, AliasUtils.getUsage(this, "role"));

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

    /**
     * 
     * @param {Message | ChatInputCommandInteraction} type 
     * @param {GuildMember} member 
     * @returns {Promise<EmbedBuilder>}
     */
    async Member(type, member) {
        if (!member) member = type.member;

        const Info = AliasEmbeds.embedInfo("MEMBER INFO", emojiType.user,
        [
                { name: "Name", value: `\`\`\`${member.user.username}\`\`\``, inline: true },
                { name: "Id", value: `\`\`\`${member.user.id}\`\`\``, inline: true },
            { name: "Created on", value: `\`\`\`${member.user.createdAt.toDateString()} (${AliasTemps.timeDifference(member.user.createdTimestamp)})\`\`\`` },
            { name: "Joined on", value: `\`\`\`${member.joinedAt.toDateString()} (${AliasTemps.timeDifference(member.joinedTimestamp)})\`\`\`` },
                { name: "Nickname", value: `\`\`\`${member.nickname ?? `No nickname`}\`\`\``, inline: true },
                { name: "Is Bot", value: `\`\`\`${member.user.bot ? `Yes` : `No`}\`\`\``, inline: true },
        ])
        return Info;
    },

    /**
     * 
     * @param {Guild} guild 
     * @returns {Promise<EmbedBuilder>}
     */
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
            { name: 'Owner', value: `\`\`\`${guild.members.cache.get(guild.ownerId).user.username}\`\`\``},
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

    /**
     * 
     * @param {Client} alias 
     * @returns 
     */
    async Bot(alias) {
        const Info = AliasEmbeds.embedInfo("BOT INFO", emojiType.bot,
        [
                { name: "Name", value: `\`\`\`${alias.user.username}\`\`\``, inline: true },
                { name: "Id", value: `\`\`\`${alias.user.id}\`\`\``, inline: true },
                { name: "Version", value: `\`\`\`${bot.version}\`\`\``, inline: true },
            { name: "Create on", value: `\`\`\`${alias.user.createdAt.toDateString()} (${AliasTemps.timeDifference(alias.user.createdTimestamp)})\`\`\`` },
            { name: "Last Ready on", value: `\`\`\`${alias.readyAt.toDateString()} (${AliasTemps.timeDifference(alias.readyTimestamp)})\`\`\`` },
                { name: "On", value: `\`\`\`Guilds: ${alias.guilds.cache.size} | Channels: ${alias.channels.cache.size}\`\`\`` },
                { name: "Has", value: `\`\`\`Users: ${alias.users.cache.size} | Emojis: ${alias.emojis.cache.size}\`\`\`` }
        ])
        return Info;
    },

    /**
     * 
     * @param {GuildEmoji} emoji 
     * @returns {Promise<EmbedBuilder>}
     */
    async Emoji(emoji) {
        const options = this.settings.options[5];
        if (!emoji) return AliasEmbeds.invalid(`No Emoji`, `I need an emoji in order to return info about it \n(${options.options[0].specific})`, AliasUtils.getUsage(this, "emoji"));

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