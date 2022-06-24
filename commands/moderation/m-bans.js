const { prefix, by } = require("../../config.json");
const { MessageEmbed, Permissions } = require('discord.js');
const { Timeout, Wronganswer, Perm, Cancel, Invalid } = require("../../errors");
async function bans(msg, args) {
    var guild = msg.guild;
    //var bans = guild.bans.fetch();
    //if (!bans) {bans = "Nobody was banned"}
    const Banned = new MessageEmbed()
    .setColor("RANDOM")
    .setTitle(`${by} Comamnds`)
    .setDescription("Command: bans")
    .addFields(
        { name: `Banned members (${guild.fetchBans().size})`, value: `${guild.name}`}
    )
    .setFooter({ text: `${by} helps` })
    await msg.channel.send({ embeds: [Banned] });
    msg.delete();
}

module.exports = {
    name: "bans",
    description: "Get a list of all the ban users",
    example: prefix + "bans",
    type: "info",
    execute(msg, args) {
        if (!msg.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) return Perm(msg, `No Permission`, `You don't have the permission to see ban users`);
        if (!msg.guild.me.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) return Perm(msg, `No Permission`, `I dont have the permission to see ban users`);
        bans(msg, args);
    }
}