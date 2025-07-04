const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
const alias = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        // GatewayIntentBits.GuildMembers,
        // GatewayIntentBits.GuildModeration,
        // GatewayIntentBits.GuildIntegrations,
        // GatewayIntentBits.GuildWebhooks,
        // GatewayIntentBits.GuildInvites,
        // GatewayIntentBits.GuildVoiceStates,
        // GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        // GatewayIntentBits.GuildMessageTyping,
        // GatewayIntentBits.DirectMessages,
        // GatewayIntentBits.DirectMessageReactions,
        // GatewayIntentBits.GuildScheduledEvents,
        // GatewayIntentBits.AutoModerationConfiguration,
        // GatewayIntentBits.AutoModerationExecution,
        // GatewayIntentBits.MessageContent,
    ],
    partials: [
        Partials.Channel,
        Partials.Message,
        Partials.Reaction,
    ]
});

alias.commands = new Collection();
alias.msgCommands = new Collection();
alias.intCommands = new Collection();
alias.events = new Collection();

module.exports = alias;