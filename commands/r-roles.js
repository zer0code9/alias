const { prefix, by } = require("./../config.json");
const { MessageEmbed } = require("discord.js");
function roles(msg, args) {
    const role = msg.mentions.roles.first();

    let rolemap = msg.guild.roles.cache
    .sort((a, b) => b.position - a.position)
    .map(r => r)
    .join(`\n`);
    if (rolemap.length > 1024) rolemap = "To many roles to display";
    if (!rolemap) rolemap = "No roles";

    const roles = new MessageEmbed()
    .setColor('#00ff00')
    .setTitle(`:white_check_mark: ROLE COUNT :label::1234:`)
    .setDescription('Rank')
    .addFields(
        { name: `All Roles of ${msg.guild.name} [${msg.guild.roles.cache.size}]`, value: `${rolemap}`}
    )
    .setFooter(`${by} helps`)
    msg.channel.send({ embeds: [roles] });
}
module.exports = {
    name: "roles",
    description: "Get a list of all the roles of the server",
    example: prefix + "roles",
    type: "rank",
    execute(msg, args) {
        roles(msg, args);
    }
}