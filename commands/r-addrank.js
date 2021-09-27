const { prefix, by } = require("./../config.json");
const { MessageEmbed } = require('discord.js');
const { Timeout, Wronganswer, Perm, Cancel, Invalid, Unknown } = require("../errors");
function addRank(msg, args) {
    if (!msg.member.permissions.has("MANAGE_ROLES")) return Perm(msg, `No Permission`, `You don't have the permission to manage roles`);
    if (!msg.guild.me.permissions.has("MANAGE_ROLES")) return Perm(msg, `No Permission`, `I don't have the permission to manage roles`);
    const role = msg.mentions.roles.first();
    const name = args.join(" ");

    if (!name) return Invalid(msg, `No Name`, `I need a name in order to create a new role`, `addrank [name]`);

    msg.guild.roles.create({ data: { name: `${name}` } });
    const add = new MessageEmbed()
    .setColor("#00ff00")
    .setTitle(":white_check_mark: CREATED CHANNEL :label::heavy_plus_sign:")
    .setDescription("Rank")
    .addFields(
        { name: "A new role has been created", value: `\`\`\`${name}\`\`\``},
        { name: "To change role color:", value: `Use \`zcolorrank\``}
    )
    .setFooter(`${by} helps`)
    msg.channel.send(add);
}

module.exports = {
    name: "addrank",
    description: "Create a new role",
    example: prefix + "addrank [name]",
    type: "rank",
    execute(msg, args) {
        if (args[0]) {return addRank(msg, args);}
        if (!msg.member.permissions.has("MANAGE_ROLES")) return Perm(msg, `No Permission`, `You don't have the permission to manage roles`);
        if (!msg.guild.me.permissions.has("MANAGE_ROLES")) return Perm(msg, `No Permission`, `I don't have the permission to manage roles`);
        let authorid = msg.author.id;

        const filter1 = response1 => { return response1.author.id === authorid; }

        const Name = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`${by} Commands`)
        .setDescription("Command: addrank")
        .addFields(
            { name: "Name", value: `I need a name to continue` },
            { name: `Cancel Command`, value: `Type \`cancel\`` }
        )
        .setFooter(`${by} helps`)
    
        msg.channel.send(Name).then(() => {
            msg.channel.awaitMessages(filter1, { max: 1 , time: 30000, errors: ['time']})
            .then(collected1 => {
                const response1 = collected1.first();
                if (response1.content == "cancel") return Cancel(msg);
                const name = response1;

                msg.guild.roles.create({ data: { name: `${name}` } });
                const Add = new MessageEmbed()
                .setColor("#00ff00")
                .setTitle(":white_check_mark: CREATED CHANNEL :label::heavy_plus_sign:")
                .setDescription("Rank")
                .addFields(
                    { name: "A new role has been created", value: `\`\`\`${name}\`\`\``},
                    { name: "To change role color:", value: `Use \`zcolorrank\``}
                )
                .setFooter(`${by} helps`)
                msg.channel.send(Add);
                
            }).catch(error => {
                if (error == '[object Map]') Timeout(msg);
                else Unknown(msg, error);
            });
        })
    }
}