const { prefix, by } = require("../../config.json");
const Discord = require("discord.js");
async function abc(msg, args, bot) {
    var reactions = "";
    var roles;
    var prompt = "";
    if (args == 0) {
        const no = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`${by} Commands`)
        .setDescription("Command: react")
        .addFields(
            { name: "Command", value: `here\n\`\`\`${prefix}\`\`\``}
        )
        .setFooter({ text: `${by} helps` })
        msg.channel.send(no);
    } else
                reactions = `${args[1]}`
                const role = msg.mentions.roles.first();
                roles = `${role}`
                const embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setTitle(`${by} Commands`)
                .setDescription("Command: react")
                .addFields(
                    { name: "Command", value: `Geth the role ${role}`}
                )
                .setFooter({ text: `${by} helps` })
                let message = await msg.channel.send(embed);
                message.react(`${reactions}`);

            bot.on('messageReactionAdd', async (reaction, user) => {
                if (reaction.message.partial) await reaction.message.fetch();
                if (reaction.partial) await reaction.fetch();
                if (user.bot) return;
                if (!reaction.message.guild) return;
     
                if (reaction.message.channel.id == channel) {
                    if (reaction.emoji.name === yellowTeamEmoji) {
                        await reaction.message.guild.members.cache.get(user.id).roles.add(yellowTeamRole);
                    }
                    if (reaction.emoji.name === blueTeamEmoji) {
                        await reaction.message.guild.members.cache.get(user.id).roles.add(blueTeamRole);
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
    example: prefix + "react [prompt]",
    type: "moderation",
    execute(msg, args, bot) {
        abc(msg, args, bot);
    }
}