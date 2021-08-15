const { prefix, by } = require("./../config.json");
const Discord = require("discord.js");
function membersRole(msg, args) {
    const role = msg.mentions.roles.first();

    const noRole = new Discord.MessageEmbed()
    .setColor("#ff0000")
    .setTitle(`:warning: CANCELED :warning:`)
    .addFields(
        { name: "No Role", value: `I need a role in order to return info about it`},
        { name: "Command", value: `\`${prefix}members [role]\``}
    )
    .setFooter(`${by} helps`)
    if (!role) return msg.channel.send(noRole);

    let membermap = role.members
        .sort((a, b) => b.position - a.position)
        .map(m => m)
        .join(`\n`);
    if (membermap.length > 1024) membermap = "To many members to display";
    if (!membermap) membermap = `No member with role ${role}`;
    const roleInfo = new Discord.MessageEmbed()
    .setColor(`#00ff00`)
    .setTitle(`${by} Commands`)
    .setDescription("Info")
    .addFields(
        { name: `All Members with ${role.name}`, value: `${membermap}`}
    )  
    .setFooter(`${by} helps`)
    msg.channel.send(roleInfo);
}

module.exports = {
    name: "members",
    description: "Get the names of members that have a certain role",
    example: prefix + "members [role]",
    type: "info",
    execute(msg, args) {
        membersRole(msg, args);
    }
}