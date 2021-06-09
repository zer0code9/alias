const { prefix } = require("./../config.json");
const Discord = require("discord.js");
function abc(msg, args) {
    if (!msg.member.permissions.has("CREATE_INSTANT_INVITE")) {msg.channel.send(`You don't have the permission to create an invitation, ${msg.author}`); return;} else {
        if (args !=0) {
            const invite = msg.channel.invite;
            const yes = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`${by} Commands`)
            .setDescription("Command: invite")
            .addFields(
                { name: "Guild", value: `${invite.guild}`}
            )
            .setFooter(`${by} helps`)
            msg.channel.send(yes);
        }
    }
}

module.exports = {
    name: "invite",
    description: "Create an invitation",
    example: prefix + "invite",
    type: "bot",
    execute(msg, args) {
        abc(msg, args);
    }
}