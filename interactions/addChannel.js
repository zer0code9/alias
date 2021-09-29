const { prefixi, by } = require("./../config.json");
const { MessageEmbed } = require('discord.js');
const { Timeout, Wronganswer, Cancel, Perm, Invalid, Unknown } = require("../errors");
module.exports = {
    name: "channeladd",
    description: "Create a new channel",
    example: prefixi + "addchannel [name] [type?]",
    type: "channel",
    execute(interaction) {
        if (!interaction.member.permissions.has("MANAGE_CHANNELS")) return Perm(interaction, `No Permission`, `You don't have the permission to manage channels`);
        if (!interaction.guild.me.permissions.has("MANAGE_CHANNELS")) return Perm(interaction, `No Permission`, `I don't have the permission to manage channels`);
        let authorid = interaction.author.id;

        const filter1 = (m) => m.author.id === authorid;

        const Name = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`${by} Commands`)
        .setDescription("Command: addchannel")
        .addFields(
            { name: "Name", value: `I need a name to continue` },
            { name: `Cancel Command`, value: `Type \`cancel\`` }
        )
        .setFooter(`${by} helps`)
    
        interaction.channel.send({ embeds: [Name] }).then(() => {
            interaction.channel.awaitMessages(filter1, { max: 1, time: 30000, errors: ['time']})
            .then(collected1 => {
                const response1 = collected1.first();
                if (response1.content == "cancel") return Cancel(interaction);
                const name = response1;

                const filter2 = (m) => m.author.id === authorid;

                const Type = new MessageEmbed()
                .setColor("Random")
                .setTitle(`${by} Commands`)
                .setDescription("Command: addchannel")
                .addFields(
                    { name: "Type", value: `I need a type to continue` },
                    { name: "Types:", value: "\`\`\`text | voice | store | category | news | stage" },
                    { name: `Cancel Command`, value: `Type \`cancel\`` }
                )
                .setFooter(`${by} helps`)

                interaction.channel.send({ embeds: [Type] }).then(() => {
                    interaction.channel.awaitMessages(filter2, { max: 1, time: 30000, errors: ['time']})
                    .then(collected2 => {
                        const response2 = collected2.first();
                        if (response1.content == "cancel") return Cancel(interaction);
                        const type = response2;

                        //if (type != "text" || "voice" || "store" || "category" || "news" || "stage") return Wronganswer(interaction, `Unknown Type`, `${type} is not a channel type`)

                        interaction.guild.channels.create(`${name}`, {type: `${type}`});
                        const Add = new MessageEmbed()
                        .setColor("#00ff00")
                        .setTitle(":white_check_mark: CREATED CHANNEL :file_folder::heavy_plus_sign:")
                        .setDescription("Channel")
                        .addFields(
                            { name: "A new channel has been created", value: `\`\`\`${name}\`\`\`` },
                            { name: "The channel is of type", value: `\`\`\`${type}\`\`\`` },
                            { name: "To change channel position:", value: `Use \`zmovechannel\`` }
                        )
                        .setFooter(`${by} helps`)
                        interaction.channel.send({ embeds: [Add] });

                    }).catch(error => {
                        if (error == '[object Map]') Timeout(interaction);
                        else Unknown(interaction, error);
                    });
                })
            }).catch(error => {
                if (error == '[object Map]') Timeout(interaction);
                else Unknown(interaction, error);
            });
        })
    }
}