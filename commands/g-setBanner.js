const { prefix, by } = require("../config.json");
const { MessageEmbed, Permissions } = require('discord.js');
const { Timeout, Wronganswer, Perm, Cancel, Invalid, Unknown } = require("../errors");
function banner(msg, args, example) {
    const url = args.join(" ");

    if (!url) return Invalid(msg, `No URL`, `I need a url in order to change the banner`, `${example}`);

    msg.guild.setBanner(url);
    const Banner = new MessageEmbed()
    .setColor("#00ff00")
    .setTitle(":white_check_mark: CHANGED BANNER :package::frame_photo:")
    .setDescription("Guild")
    .setImage(url)
    .addFields(
        { name: "URL", value: `\`\`\`${url}\`\`\``},
    )
    .setFooter(`${by} helps`)
    msg.channel.send({ embeds: [Banner] });
}

module.exports = {
    name: "setbanner",
    description: "Change banner of guild",
    example: prefix + "setbanner [url]",
    type: "guild",
    execute(msg, args) {
        if (!msg.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return Perm(msg, `No Permission`, `You don't have the permission to manage roles`);
        if (!msg.guild.me.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return Perm(msg, `No Permission`, `I don't have the permission to manage roles`);
        if (args[0]) return banner(msg, args, this.example);
        let authorid = msg.author.id;
        const filter = (m) => m.author.id === authorid;

        const URL = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`${by} Commands`)
        .setDescription("Command: setbanner")
        .addFields(
            { name: "URL", value: `I need a url to continue` },
            { name: `Cancel Command`, value: `Type \`cancel\`` }
        )
        .setFooter(`${by} helps`)
    
        msg.channel.send({ embeds: [URL] }).then(() => {
            msg.channel.awaitMessages({filter, max: 1 , time: 30000, errors: ['time']})
            .then(collected1 => {
                const response1 = collected1.first();
                if (response1.content == "cancel") return Cancel(msg);
                const url = response1;

                //msg.guild.setBanner(url);
                const Banner = new MessageEmbed()
                .setColor("#00ff00")
                .setTitle(":white_check_mark: CHANGED BANNER :package::frame_photo:")
                .setDescription("Guild")
                .setImage(url)
                .addFields(
                    { name: "URL", value: `\`\`\`${url}\`\`\``},
                )
                .setFooter(`${by} helps`)
                msg.channel.send({ embeds: [Banner] });
                
            }).catch(error => {
                if (error == '[object Map]') Timeout(msg);
                else Unknown(msg, error);
            });
        })
    }
}