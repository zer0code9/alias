const { bot, emojiType } = require('../config.js');
const { ApplicationCommandOptionType } = require('discord.js');
const AliasCancels = require("../helpers/cancels.js");
const AliasEmbeds = require("../helpers/embeds.js");
const AliasUtils = require("../helpers/utils.js");
const { id } = require('../commands/moderation/kick.js');

module.exports = {
    name: "changerole",
    id: "907852796759",
    description: "Change a role for a user",
    type: "Moderation",
    botPerms: ["manageRoles"],
    memPerms: ["manageRoles"],
    args: [
        { name: "option", type: "add|remove", required: true },
        { name: "user", type: "user-mention|id", required: true },
        { name: "role", type: "role-mention|id", required: true },
    ],
    msgCommand: {
        exist: true,
        usage: bot.prefix + "changerole [option:(add/remove)] [user:us-me|id] [role:ro-me|id]"
    },
    intCommand: {
        exist: false,
        options: [
            {
                name: "option",
                description: "The option (add or remove)",
                type: ApplicationCommandOptionType.String,
                required: true,
            },
            {
                name: "user",
                description: "The user to change the roles of",
                type: ApplicationCommandOptionType.User,
                required: true,
            },
            {
                name: "role",
                description: "The role to add or remove",
                type: ApplicationCommandOptionType.Role,
                required: true,
            }
        ]
    },

    async msgRun(msg, args) {
        let option = await args[0];
        const issuer = msg.member;
        const user = await msg.guild.members.cache.get(args[1]) ?? await msg.guild.members.cache.get(msg.mentions.users.first()?.id);
        const role = await msg.guild.roles.cache.get(args[2]) ?? await msg.guild.roles.cache.get(msg.mentions.roles.first()?.id);
        
        try {
            const Change = await this.ChangeRole(option, issuer, user, role);
            AliasUtils.sendEmbedAlias(msg, Change);
        } catch {
            AliasUtils.sendErrorAlias(msg, this.name);
        }
        msg.delete();
    },

    async intRun(int) {
        const option = await int.options.getString('option');
        const issuer = await int.member;
        const user = await int.options.getUser('user');
        const role = await int.options.getRole('role');

        try {
            const Change = await this.ChangeRole(option, issuer, user, role);
            AliasUtils.sendEmbedAlias(int, Change);
        } catch {
            AliasUtils.sendErrorAlias(int, this.name);
        }
    },

    async ChangeRole(option, issuer, user, role) {
        if (!option) return AliasCancels.invalid(`No Option`, `I need to know how to change the role \n(option (add/remove))`, this.msgCommand.usage);
        if (option != `add` && option != `remove`) return AliasCancels.unabled(`Need a valid option`, `The options are either add or remove`);
        if (!user) return AliasCancels.invalid(`No User`, `I need a user in order to add/remove the role for that user \n(${this.args[1].type})`, this.msgCommand.usage);
        if (!role) return AliasCancels.invalid(`No Role`, `I need a role in order to change that role for the user \n(${this.args[2].type})`, this.command.usage);

        if (!userInteract(issuer, user)) return AliasCancels.unabled(msg, `Not Changable`, `The user you are trying to change cannot be changed by you`);
        let hasRole = user.roles.cache.has(role.id);

        if (option == `add`) {
            if (hasRole) return AliasCancels.unabled(`Has Role`, `The user ${user.user.tag} already has the role ${role.name}`);
            await user.roles.add(role.id);
            
            const Add = AliasEmbeds.embedSuccess("ADDED ROLE", emojiType.user, emojiType.create, this.type, [
                { name: "A user has been given a role", value: `\`\`\`${user.user.tag}\`\`\`` },
                { name: "Added Role", value: `\`\`\`${role.name}\`\`\`` }
            ])
            await channelAlias.send({ embeds: [Add] });
            return Add;
        } else if (option == `remove`) {
            if (!hasRole) return AliasCancels.unabled(`Doesn't have Role`, `The user ${user.user.tag} doesn't have the role ${role.name}`);
            await user.roles.remove(role.id);

            const Remove = AliasEmbeds.embedSuccess("REMOVED ROLE", emojiType.user, emojiType.delete, this.type, [
                { name: "A user has been withdrown a role", value: `\`\`\`${user.user.tag}\`\`\`` },
                { name: "Removed Role", value: `\`\`\`${role.name}\`\`\`` }
            ])
            await channelAlias.send({ embeds: [Remove] });
            return Remove;
        }
    }
}