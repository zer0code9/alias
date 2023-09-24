// GI is the first 2 integer of the guild's id
module.exports = {
    guilds: [
        {
            idA: "ag##########",
            idD: "guildId",
            commands: [
                {
                    idA: "ac##########",
                    idG: "gc[GI]########",
                    enabledMsg: true,
                    enabledInt: true,
                    aliases: ["alias"],
                    enRoles: ["roleId"],
                    disRoles: ["roleId"],
                    enChannels: ["channelId"],
                    disChannels: ["channelId"],
                    cooldown: 1
                }
            ],
            members: [
                {
                    idG: "gm[GI]########",
                    idA: "au##########",
                    idD: "userId",
                    warns: [
                        {
                            idG: "gw[GI]########",
                            warning: "warnWarning",
                            issuer: "warnIssuerId",
                            date: "warnDate"
                        }
                    ],
                    items: [
                        {
                            idG: "gi[GI]########",
                            amount: 1,
                        }
                    ],
                    currency: {
                        gold: 1,
                        cookie: 1,
                    },
                    xp: 1,
                }
            ],
            logs: {
                "logName": {
                    enabled: true,
                    channel: "channelId",
                    content: {
                        title: "",
                        
                    }
                }
            },
            shops: [
                {
                    idG: "gs[GI]########",
                    items: [
                        {
                            name: "itemName",
                            idG: "gi[GI]########",
                            description: "itemDescription",
                            cost: 1,
                        }
                    ]
                }
            ],
            tickets: [
                {
                    idG: "gt[GI]########",
                    user: {
                        idG: "gm[GI]########",
                        idA: "au##########",
                        idD: "userId",
                    },
                    type: "ticketType",
                    content: "ticketContent"
                }
            ],
            currency: {
                token: 1,
                powder: 1,
            },
            xp: 1,
        }
    ],
    commands: [
        {
            name: "commandName",
            idA: "ac##########"
        }
    ],
    users: [
        {
            idA: "au##########",
            idD: "userId",
            currency: {
                ticket: 1,
                star: 1,
            },
            xp: 1,
        }
    ]
}