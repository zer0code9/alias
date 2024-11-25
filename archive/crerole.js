const { bot, emojiType } = require('../config.js');
const { ApplicationCommandOptionType } = require('discord.js');
const AliasCancels = require("../helpers/cancels.js");
const AliasEmbeds = require("../helpers/embeds.js");
const AliasUtils = require("../helpers/utils.js");

module.exports = {
    name: "crerole",
    description: "Create a new role",
    type: "Utility",
    botPerms: ["manageRoles"],
    memPerms: ["manageRoles"],
    args: [
        { name: "name", type: "phrase", required: true },
    ],
    msgCommand: {
        exist: true,
        usage: bot.prefix + "crerole [name:ph]"
    },
    intCommand: {
        exist: true,
        options: [
            {
                name: "name",
                description: "The name of the new role",
                type: ApplicationCommandOptionType.String,
                required: true,
            }
        ]
    },

    async msgRun(msg, args) {
        const name = await args.join(" ");
    
        try {
            const Create = await this.CreRole(msg.guild, name);
            AliasUtils.sendEmbed(msg, Create);
        } catch {
            AliasUtils.sendError(msg, this.name);
        }
        msg.delete();
    },

    async intRun(int) {
        const name = await int.options.getString('name');

        try {
            const Create = await this.CreRole(int.guild, name);
            AliasUtils.sendEmbed(int, Create);
        } catch {
            AliasUtils.sendError(int, this.name);
        }
    },

    async CreRole(guild, name) {
        if (!name) return AliasCancels.invalid(`No Name`, `I need a name in order to create a new role \n(${this.args[0].type})`, this.msgCommand.usage);

        await guild.roles.create({ name: name });
        const Create = AliasEmbeds.embedSuccess("CREATED ROLE", emojiType.role, emojiType.create, this.type,
        [
            { name: "A new role has been created", value: `\`\`\`${name}\`\`\``},
            { name: "Edit role with:", value: `\`zeditrole\``}
        ])
        return Create;
    }
}