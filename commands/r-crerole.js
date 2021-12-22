const { prefix, by } = require("../config.json");
const { MessageEmbed, Permissions } = require('discord.js');
const { Timeout, Wronganswer, Perm, Cancel, Invalid, Unknown } = require("../errors");
async function creRole(msg, args, example) {
    const role = msg.guild.roles.cache.get(args[0]) || msg.mentions.roles.first();
    const name = args.join(" ");

    if (!name) return Invalid(msg, `No Name`, `I need a name in order to create a new role`, `${example}`);

    msg.guild.roles.create({ data: { name: `${name}` } });
    const Create = new MessageEmbed()
    .setColor("#00ff00")
    .setTitle(":white_check_mark: CREATED ROLE :label::heavy_plus_sign:")
    .setDescription("Role")
    .addFields(
        { name: "A new role has been created", value: `\`\`\`${name}\`\`\``},
        { name: "To change role color:", value: `Use \`zcolorrole\``}
    )
    .setFooter(`${by} helps`)
    await msg.channel.send({ embeds: [Create] });
    msg.delete();
}

module.exports = {
    name: "crerole",
    description: "Create a new role",
    example: prefix + "crerole [name]",
    type: "role",
    execute(msg, args) {
        if (!msg.member.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) return Perm(msg, `No Permission`, `You don't have the permission to manage roles`);
        if (!msg.guild.me.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) return Perm(msg, `No Permission`, `I don't have the permission to manage roles`);
        if (args[0]) return creRole(msg, args, this.example);
        let authorid = msg.author.id;
        const filter = (m) => m.author.id === authorid;

        const Name = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`${by} Commands`)
        .setDescription("Command: crerole")
        .addFields(
            { name: "Name", value: `I need a name to continue` },
            { name: `Cancel Command`, value: `Type \`cancel\`` }
        )
        .setFooter(`${by} helps`)
    
        msg.channel.send({ embeds: [Name] }).then(() => {
            msg.channel.awaitMessages({filter, max: 1 , time: 30000, errors: ['time']})
            .then(collected1 => {
                const response1 = collected1.first();
                if (response1.content == "cancel") return Cancel(msg);
                const name = response1;

                msg.guild.roles.create({ data: { name: `${name}` } });
                const Add = new MessageEmbed()
                .setColor("#00ff00")
                .setTitle(":white_check_mark: CREATED ROKE :label::heavy_plus_sign:")
                .setDescription("Role")
                .addFields(
                    { name: "A new role has been created", value: `\`\`\`${name}\`\`\``},
                    { name: "To change role color:", value: `Use \`zcolorrole\``}
                )
                .setFooter(`${by} helps`)
                msg.channel.send({ embeds: [Add] });
                
            }).catch(error => {
                if (error == '[object Map]') Timeout(msg);
                else Unknown(msg, error);
            });
        })
    }
}