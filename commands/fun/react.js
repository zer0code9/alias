const { prefix, by } = require("../../config.json");
const { MessageEmbed, Permissions } = require('discord.js');
const { Timeout, Wronganswer, Perm, Cancel, Invalid, Unknown } = require("../../errors");
async function react(msg, args, bot, example) {
    var emoji = args[0];
    var role = await msg.guild.roles.cache.get(args[0]) || msg.mentions.roles.first();
    var message = args.slice(2).join(" ");

    if (!reaction) return Invalid(msg, `No Emoji`, `I need an emoji \n(text:emoji)`, `${example}`);
    if (!role) return Invalid(mg, `No Role`, `I need a role to give \n(mention:role or role:id)`, `${example}`);
    if (!message) return Invalid(mg, `No Message`, `I need a message to put the role on \n(message:id)`, `${example}`);

    let message = msg.channel.messages.fetch(message);
    message.react(`${emoji}`);

    bot.on('messageReactionAdd', async (reaction, user) => {
        if (reaction.message.partial) await reaction.message.fetch();
        if (reaction.partial) await reaction.fetch();
        if (user.bot) return;
        if (!reaction.message.guild) return;
     
        if (reaction.message.channel.id == channel) {
            if (reaction.emoji.name === reaction) {
                await reaction.message.guild.members.cache.get(user.id).roles.add(role);
            }
                    
        } else {
            return;
        }
    });
     
            bot.on('messageReactionRemove', async (reaction, user) => {
     
                if (reaction.message.partial) await reaction.message.fetch();
                if (reaction.partial) await reaction.fetch();
                if (user.bot) return;
                if (!reaction.message.guild) return;
     
     
                if (reaction.message.channel.id == channel) {
                    if (reaction.emoji.name === yellowTeamEmoji) {
                        await reaction.message.guild.members.cache.get(user.id).roles.remove(yellowTeamRole);
                    }
                    if (reaction.emoji.name === blueTeamEmoji) {
                        await reaction.message.guild.members.cache.get(user.id).roles.remove(blueTeamRole);
                    }
                } else {
                    return;
                }
            });
}


module.exports = {
    name: "react",
    description: "Create your own reacted role!",
    example: prefix + "react [txt:em] [role:ro|id] [msg:id]",
    type: "moderation",
    execute(msg, args, bot) {
        const example = this.example;
        react(msg, args, bot, example);
    }
}