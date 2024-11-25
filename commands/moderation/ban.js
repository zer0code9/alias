const { bot, emojiType } = require('../../config.js');
const { ApplicationCommandOptionType } = require('discord.js');
const AliasCancels = require("../../helpers/cancels");
const AliasEmbeds = require("../../helpers/embeds");
const AliasUtils = require("../../helpers/utils");

module.exports = {
    name: "ban",
    id: "338831695611",
    description: "Manage bans",
    type: "Moderation",
    botPerms: ["banMembers"],
    memPerms: ["banMembers"],
    args: [
        { name: "option", type: "soft|harsh", required: true },
        { name: "user", type: "user-mention|id", required: true },
        { name: "reason", type: "phrase", required: true },
    ],
    msgCommand: { exist: true, },
    intCommand: { exist: false, },
    settings: {
        existMsg: true,
        existInt: false,
        sub: true,
        options: [
            {
                name: "create",
                description: "Create a ban for a user",
                type: ApplicationCommandOptionType.Subcommand,
                options: [
                    {
                        name: "soft",
                        description: "Soft ban a user",
                        type: ApplicationCommandOptionType.Subcommand,
                        options: [
                            {
                                name: "user",
                                description: "The user to ban [user]",
                                type: ApplicationCommandOptionType.User,
                                specific: "user",
                                options: [],
                                required: true,
                            },
                            {
                                name: "reason",
                                description: "The reason to ban [phrase]",
                                type: ApplicationCommandOptionType.String,
                                specific: "phrase",
                                options: [],
                                required: true,
                            }
                        ]
                    },
                    {
                        name: "harsh",
                        description: "Harsh ban a user",
                        type: ApplicationCommandOptionType.Subcommand,
                        options: [
                            {
                                name: "user",
                                description: "The user to ban [user]",
                                type: ApplicationCommandOptionType.User,
                                specific: "user",
                                options: [],
                                required: true,
                            },
                            {
                                name: "reason",
                                description: "The reason to ban [phrase]",
                                type: ApplicationCommandOptionType.String,
                                required: true,
                            }
                        ]
                    },
                ]
            },
            {
                name: "delete",
                description: "Delete a ban from a user",
                type: ApplicationCommandOptionType.Subcommand,
                options: [
                    {
                        name: "user",
                        description: "The user to unban [user-id]",
                        type: ApplicationCommandOptionType.User,
                        specific: "user-id",
                        options: [],
                        required: true,
                    },
                    {
                        name: "reason",
                        description: "The reason for unban [string]",
                        type: ApplicationCommandOptionType.String,
                        specific: "string",
                        options: [],
                        required: true,
                    }
                ]
            }
        ]
    },

    async msgRun(msg, args) {
        const action = await args[0];

        if (action == "create") {
            const option = await args[1];
            const issuer = await msg.member;
            const user = await msg.guild.members.cache.get(args[2]) ?? await msg.guild.members.cache.get(msg.mentions.users.first()?.id);
            let reason = await args.slice(3).join(" ");

            try {
                const Create = await this.Create(option, issuer, user, reason);
                AliasUtils.sendEmbedAlias(msg, Create);
                AliasUtils.sendEmbedUser(user, `banned`, reason);
            } catch {
                AliasUtils.sendErrorAlias(msg, this.name);
            }
        }

        if (action == "delete") {
            const issuer = await msg.member;
            const user = await msg.guild.members.cache.get(args[1]) ?? await msg.guild.members.cache.get(msg.mentions.users.first()?.id);
            let reason = await args.slice(2).join(" ");

            try {
                const Delete = await this.Delete(issuer, user, reason);
                AliasUtils.sendEmbedAlias(msg, Delete);
            } catch {
                AliasUtils.sendErrorAlias(msg, this.name);
            }
        }

        else {
            const Invalid = AliasEmbeds.embed(colorEmbed.warning, "Invalid Action", this.type, [
                { name: `Unknown Action Used`, value: `I don't know the action ${action}` },
                { name: "Possible Actions", value: `create | delete `}
            ], bot.name + " helps");
            AliasUtils.sendEmbedAlias(msg, Invalid);
        }

        msg.delete();
    },

    async intRun(int) {
        const action = await int.options.getSubcommand();

        if (action == "create") {
            const option = await int.options.getSubcommand();
            const issuer = await int.member;
            const user = await int.options.getUser('user');
            const reason = await int.options.getString('reason');

            try {
                const Create = await this.Create(option, issuer, user, reason);
                AliasUtils.sendEmbedAlias(int, Create);
                AliasUtils.sendEmbedUser(user, `banned`, reason);
            } catch {
                AliasUtils.sendErrorAlias(int, this.name);
            }
        }

        else if (action == "delete") {
            const issuer = await int.member;
            const user = await int.options.getUser('user');
            const reason = await int.options.getString('reason');
            
            try {
                const Delete = await this.Delete(issuer, user, reason);
                AliasUtils.sendEmbedAlias(int, Delete);
            } catch {
                AliasUtils.sendErrorAlias(int, this.name);
            }
        }
    },

    async Create(option, issuer, user, reason) {
        const settings = this.settings.options[0];
        if (!option) return AliasCancels.invalid(`No Option`, `I need to know whether to soft or harsh ban \n(option (soft/harsh))`, AliasUtils.getUsage(this, "create", option));
        if (option != `soft` && option != `harsh`) return AliasCancels.unabled(`Need a valid option`, `The options are either soft or harsh \n Soft: only bans | Harsh: bans and deletes messages`);
        if (!user) return AliasCancels.invalid(`No User`, `I need a user in order to ban someone \n(${settings.options[0].options[0].specific})`, AliasUtils.getUsage(this, "create", option));
        if (!reason) return AliasCancels.invalid(`No Reason`, `You must have a reason to ban them \n(${settings.options[0].options[0].specific})`, AliasUtils.getUsage(this, "create", option));

        if (!AliasUtils.userInteract(issuer, user)) return AliasCancels.unabled(`Not Bannable`, `The user you are trying to ban cannot be banned by you`);

        if (option == `soft`) {
            console.log(`soft`)
            //await user.ban({ reason: reason });
        } else if (option == `harsh`) {
            console.log(`harsh`)
            //await user.ban({ deleteMessageSeconds: 60 * 60 * 24 * 7, reason: reason });
        }
        const Create = AliasEmbeds.embedSuccess("BANNED USER", emojiType.user, emojiType.no, this.type, [
            { name: "Banned User", value: `\`\`\`${user.user.tag}\`\`\`` },
            { name: "Reason", value: `\`\`\`${reason}\`\`\`` },
            { name: "By", value: `\`\`\`${issuer.user.tag}\`\`\`` }
        ])
        return Create;
    },

    async Delete(issuer, user, reason) {
        const settings = this.settings.options[1];
        if (!user) return AliasCancels.invalid(`No Id`, `I need a valid id in order to unban someone \n(${settings.options[0].specific})`, AliasUtils.getUsage(this, "delete"));
        if (!reason) return AliasCancels.invalid(`No Reason`, `You must have a reason to unban them \n(${settings.options[1].specific})`, AliasUtils.getUsage(this, "delete"));

        //await issuer.guild.bans.remove(target, reason);
        const Delete = AliasEmbeds.embedSuccess("UNBANNED USER", emojiType.user, "o", this.type, [
            { name: "Unbanned User", value: `\`\`\`${user.user.tag}\`\`\`` },
            { name: "Reason", value: `\`\`\`${reason}\`\`\`` },
            { name: "By", value: `\`\`\`${issuer.user.tag}\`\`\`` }
        ])
        return Delete;
    }
}