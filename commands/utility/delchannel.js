const { bot, emojiType } = require('../../config.js');
const { ApplicationCommandOptionType } = require('discord.js');
const AliasCancels = require("../../helpers/cancels");
const AliasEmbeds = require("../../helpers/embeds");
const AliasUtils = require("../../helpers/utils");

module.exports = {
    name: "delchannel",
    description: "Delete a channel",
    type: "Utility",
    botPerms: ["manageChannels"],
    memPerms: ["manageChannels"],
    args: [
        { name: "channel", type: "channel-mention|id", required: true },
        { name: "reason", type: "phrase", required: false },
    ],
    msgCommand: {
        exist: true,
        usage: bot.prefix + "delchannel [channel:ch-me|id] [reason:ph?]"
    },
    intCommand: {
        exist: true,
        options: [
            {
                name: "channel",
                description: "The channel that is going to be deleted",
                type: ApplicationCommandOptionType.Channel,
                required: true,
            },
            {
                name: "reason",
                description: "The reason to delete the channel",
                type: ApplicationCommandOptionType.String,
                required: false,
            }
        ]
    },

    async msgRun(msg, args) {
        const channel = await msg.guild.channels.cache.get(args[0]) ?? msg.guild.channels.cache.get(msg.mentions.channels.first()?.id);
        const reason = await args.slice(1).join(" ");
        

        try {
            const Delete = await this.DelChannel(channel, reason);
            AliasUtils.sendEmbed(msg, Delete);
        } catch {
            AliasUtils.sendError(msg, this.name);
        }
        msg.delete();
    },

    async intRun(int) {
        const channel = await int.options.getChannel('channel');
        const reason = await int.options.getString('reason');

        try {
            const Delete = await this.DelChannel(channel, reason);
            AliasUtils.sendEmbed(int, Delete);
        } catch {
            AliasUtils.sendError(int, this.name);
        }
    },

    async DelChannel(channel, reason) {
        if (!channel) return AliasCancels.invalid(msg, `No Channel`, `I need a channel in order to delete it \n(${this.args[0].type})`, this.msgCommand.usage);
        if (!reason) reason = "No reason";

        let channelName = channel.name;
        await channel.delete();
        const Delete = AliasEmbeds.embedSuccess("DELETED CHANNEL", emojiType.channel, emojiType.delete, this.type,
        [
            { name: "A channel has been deleted", value: `\`\`\`${channelName}\`\`\`` },
            { name: "Reason", value: `\`\`\`${reason}\`\`\``}
        ])
        return Delete;
    }
}