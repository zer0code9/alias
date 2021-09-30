const { prefix, by } = require("./../config.json");
const { MessageEmbed } = require("discord.js");
const { Invalid } = require('../errors');
function membersRole(msg, args, example) {
    const role = msg.mentions.roles.first();

    if (!role) return Invalid(msg, `No Role`, `I need a role in order to return info about it`, `${example}`);

    let membermap = role.members
        .sort((a, b) => b.position - a.position)
        .map(m => m)
        .join(`\n`);
    if (membermap.length > 1024) membermap = "To many members to display";
    if (!membermap) membermap = `No member with role ${role}`;
    const Info = new MessageEmbed()
    .setColor(`#00ff00`)
    .setTitle("ROLE MEMBERS")
    .setDescription("Info")
    .addFields(
        { name: `All Members with ${role.name}`, value: `${membermap}`}
    )  
    .setFooter(`${by} helps`)
    msg.channel.send({ embeds: [Info] });
}

module.exports = {
    name: "members",
    description: "Get the names of members that have a certain role",
    example: prefix + "members [role]",
    type: "info",
    execute(msg, args) {
        membersRole(msg, args, this.example);
    }
}