const { prefix, by } = require("../../config.json");
const { MessageEmbed, Permissions } = require('discord.js');
const { Timeout, Unabled, Cancel, Perm, Invalid, Unknown } = require("../../errors");
async function creChannel(msg, args, example, types) {
    const name = await args[0];
    var type = await args[1];

    if (!name) return Invalid(msg, `No Name`, `I need a name in order to create a new channel \n(phrase)`, `${example}`);
    //if (!types.includes(type)) return Invalid(msg, `Unknown Type`, `Types: ${types.join(", ")}`, `${example}`);
    if (!type) type = 'GUILD_TEXT';
    if (!types.includes(type))
        for (const t in types)
            if (t.includes(type)) { type = t; break; }
    if (!types.includes(type)) type = 'GUILD_TEXT';

    await msg.guild.channels.create(`${name}`, {type: `${type}`});
    const Create = new MessageEmbed()
    .setColor("#00ff00")
    .setTitle(":white_check_mark: CREATED CHANNEL :file_folder::heavy_plus_sign:")
    .setDescription("Channel")
    .addFields(
        { name: "A new channel has been created", value: `\`\`\`${name}\`\`\``},
        { name: "To change channel position:", value: `Use \`zmovechannel\``}
    )
    .setFooter({ text: `${by} helps`})
    await msg.channel.send({ embeds: [Create] });
    msg.delete();
}

module.exports = {
    name: "crechannel",
    description: "Create a new channel",
    example: prefix + "crechannel [name:p] [type:ct?]",
    type: "channel",
    execute(msg, args) {
        let types = ["GUILD_TEXT", "GUILD_VOICE", "GUILD_NEWS", "GUILD_CATEGORY"];
        if (!msg.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) return Perm(msg, `No Permission`, `You don't have the permission to manage channels`);
        if (!msg.guild.me.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) return Perm(msg, `No Permission`, `I don't have the permission to manage channels`);
        const example = this.example;
        if (args[0]) return creChannel(msg, args, example, types);
        const filter = (m) => m.author.id === msg.author.id;

        const Name = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`${by} Commands`)
        .setDescription("Command: crechannel")
        .addFields(
            { name: "Name", value: `I need a name to continue \n(phrase)` },
            { name: `Cancel Command`, value: `Type \`cancel\`` }
        )
        .setFooter({ text: `${by} helps` })
    
        msg.channel.send({ embeds: [Name] }).then(() => {
            msg.channel.awaitMessages({filter, max: 1, time: 30000, errors: ['time']})
            .then(collected1 => {
                const response1 = collected1.first().content;
                if (response1 == `cancel`) return Cancel(msg);
                const name = response1;
                if (!name) return Invalid(msg, `No Name`, `I need a name in order to create a new channel \n(phrase)`, `${example}`);

                const Type = new MessageEmbed()
                .setColor("RANDOM")
                .setTitle(`${by} Commands`)
                .setDescription("Command: crechannel")
                .addFields(
                    { name: "Type", value: `I need a type to continue` },
                    { name: "Types:", value: `${types.join(" | ")}` },
                    { name: `Cancel Command`, value: `Type \`cancel\`` }
                )
                .setFooter({ text: `${by} helps` })

                msg.channel.send({ embeds: [Type] }).then(() => {
                    msg.channel.awaitMessages({filter, max: 1, time: 30000, errors: ['time']})
                    .then(collected2 => {
                        const response2 = collected2.first();
                        if (response2.content == `cancel`) return Cancel(msg);
                        const type = response2;
                        if (!type) type = 'GUILD_TEXT';
                        if (!types.includes(type))
                            for (const t in types)
                                if (t.includes(type)) { type = t; break; }
                        if (!types.includes(type)) type = 'GUILD_TEXT';

                        msg.guild.channels.create(`${name}`, {type: `${type}`});
                        const Add = new MessageEmbed()
                        .setColor("#00ff00")
                        .setTitle(":white_check_mark: CREATED CHANNEL :file_folder::heavy_plus_sign:")
                        .setDescription("Channel")
                        .addFields(
                            { name: "A new channel has been created", value: `\`\`\`${name}\`\`\`` },
                            { name: "The channel is of type", value: `\`\`\`${type}\`\`\`` },
                            { name: "To change channel position:", value: `Use \`zmovechannel\`` }
                        )
                        .setFooter({ text: `${by} helps` })
                        msg.channel.send({ embeds: [Add] });

                    }).catch(error => {
                        if (error == '[object Map]') Timeout(msg);
                        else Unknown(msg, error);
                    });
                })
            }).catch(error => {
                if (error == '[object Map]') Timeout(msg);
                else Unknown(msg, error);
            });
        })
    }
}