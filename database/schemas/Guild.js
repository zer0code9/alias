const mongoose = require("mongoose");
const AliasUtils = require("../../helpers/utils");

const Schema = new mongoose.Schema({
    idA: String,
    idD: String,
    commands: [
        {
            idA: String,
            idG: String,
            name: String,
            enabledMsg: Boolean,
            enabledInt: Boolean,
            aliases: [String],
            enRoles: [String],
            disRoles: [String],
            enChannels: [String],
            disChannels: [String],
            cooldown: Number
        }
    ],
    members: [
        {
            idG: String,
            idA: String,
            idD: String,
            warns: {
                idG: String,
                warning: String,
                issuer: String,
                date: Date
            },
            items: {
                idG: String,
                amount: Number
            },
            currency: {
                gold: Number,
                cookie: Number
            },
            xp: Number,
        }
    ],
    logs: {
        welcome: {
            enabled: Boolean,
            channel: String,
            content: String,
            embed: {
                description: String,
                color: String,
                thumbnail: Boolean,
                footer: String,
                image: String,
            },
        },
        goodbye: {
            enabled: Boolean,
            channel: String,
            content: String,
            embed: {
                description: String,
                color: String,
                thumbnail: Boolean,
                footer: String,
                image: String,
            },
        },
        mod: {
            channel: String
        },
        ticket: {
            channel: String
        },
    },
    shops: [
        {
            idG: String,
            items: [
                {
                    name: String,
                    idG: String,
                    description: String,
                    cost: Number,
                }
            ]
        }
    ],
    tickets: [
        {
            idG: String,
            user: {
                idG: String,
                idA: String,
                idD: String,
            },
            type: String,
            content: String,
        }
    ],
    currency: {
        token: Number,
        powder: Number,
    },
    xp: Number,
});

const Guild = mongoose.model("guild", Schema);

module.exports = {
    getGuild: async (guild) => {
        if (!guild) return;

        let guildData = await Guild.findOne( { idD: guild.id } );

        if (!guildData) {
            guildData = this.createGuild(guild);
        }
        return guildData;
    },
    createGuild: async (guild) => {
        let guildData = new Guild({
            idA: AliasUtils.generateId("ag"),
            idD: guild.id,
            commands: [],
            members: [],
            shops: [],
            tickets: [],
            currency: {
                token: 0,
                powder: 0,
            },
            xp: 0,
        })
        guildData.save();
        return guildData;
    }
}