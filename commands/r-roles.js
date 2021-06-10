const { prefix, by } = require("./../config.json");
const Discord = require("discord.js");
function roles(msg, args) {
    const role = msg.mentions.roles.first();
    if (args == 0){
        let rolemap = msg.guild.roles.cache
            .sort((a, b) => b.position - a.position)
            .map(r => r)
            .join(`\n`);
            if (rolemap.length > 1024) rolemap = "To many roles to display";
            if (!rolemap) rolemap = "No roles";
    const roles = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setTitle(`${by} Commands`)
    .setDescription('Commands: roles')
    .addFields(
        { name: `All Roles of ${msg.guild}`, value: `${rolemap}`}
    )
    .setFooter(`${by} helps`)
    msg.channel.send(roles);
}
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