const { ChannelType, ApplicationCommandOptionType, PermissionFlagsBits, Emoji } = require('discord.js')

module.exports = {
    permissions: {
        administrator: PermissionFlagsBits.Administrator,
        manageGuild: PermissionFlagsBits.ManageGuild,
        manageChannels: PermissionFlagsBits.ManageChannels,
        manageThreads: PermissionFlagsBits.ManageThreads,
        manageRoles: PermissionFlagsBits.ManageRoles,
        manageMessages: PermissionFlagsBits.ManageMessages,
        banMembers: PermissionFlagsBits.BanMembers,
        kickMembers: PermissionFlagsBits.KickMembers,
        deafenMembers: PermissionFlagsBits.DeafenMembers,
        muteMembers: PermissionFlagsBits.MuteMembers,
        connect: PermissionFlagsBits.Connect,
        sendMessages: PermissionFlagsBits.SendMessages,
        addRections: PermissionFlagsBits.AddReactions,
        attachFiles: PermissionFlagsBits.AttachFiles,
        changeNickname: PermissionFlagsBits.ChangeNickname,
    },

    optionType: {
        channel: ApplicationCommandOptionType.Channel,
        role: ApplicationCommandOptionType.Role,
        user: ApplicationCommandOptionType.User,
        string: ApplicationCommandOptionType.String,
        integer: ApplicationCommandOptionType.Integer,
        number: ApplicationCommandOptionType.Number,
        boolean: ApplicationCommandOptionType.Boolean,
        mentionable: ApplicationCommandOptionType.Mentionable,
        attachement: ApplicationCommandOptionType.Attachment,
        subcommand: ApplicationCommandOptionType.Subcommand,
        subgroup: ApplicationCommandOptionType.SubcommandGroup
    },

    channelType: {
        text: ChannelType.GuildText,
        dm: ChannelType.DM,
        voice: ChannelType.GuildVoice,
        groupdm: ChannelType.GroupDM,
        cateogry: ChannelType.GuildCategory,
        announcement: ChannelType.GuildAnnouncement,
        announcementThread: ChannelType.AnnouncementThread,
        publicThread: ChannelType.PublicThread,
        privateThread: ChannelType.PrivateThread,
        stage: ChannelType.GuildStageVoice,
        directory: ChannelType.GuildDirectory,
        forum: ChannelType.GuildForum,
    },

    argType: {
        channelMI: ["channel-mention|id", "ch-me|id"],
        channelI: ["channel-id", "ch-id"],
        roleMI: ["role-mention|id", "ro-me|id"],
        roleI: ["role-id", "ro-id"],
        userMI: ["user-mention|id", "us-me|id"],
        userI: ["user-id", "us-id"],

        string: ["string", "st"],
        integer: ["integer", "in"],
        number: ["number", "nu"],
        boolean: ["boolean", "bo"],

        word: ["word", "wo"],
        phrase: ["phrase", "ph"],
        id: ["id", "id"],
        hex: ["hex", "he"],
        option: ["option", "()"],
        data: ["data", "{}"]
    }
}