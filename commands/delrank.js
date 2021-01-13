const { prefix } = require("/home/asorinus/workspace/myFirstProject/WithersWorld/WithersBot/config.json");
const Discord = require("discord.js");
function del(msg, args) {
    if (!msg.member.permissions.has("MANAGE_ROLES")) {msg.channel.send(`You don't have the permission to manage roles, ${msg.author}`); return;} else {
    const role = msg.mentions.roles.first();
    const reason = args.slice(1).join(" ");
    if (role) {
        role.delete();
        const remove = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle(`WithersBot Commands`)
        .setDescription('Commands: delchannel')
        .addFields(
            { name: "A channel has been deleted", value: `Deleted role: ${args}` },
            { name: "Reason", value: `${reason}`}
        )
        .setFooter('WithersBot helps')
        msg.channel.send(remove);
    } else {
        const noDelete = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle(`WithersBot Commands`)
        .setDescription('Command: delchannel')
        .addFields(
            { name: "No Channel", value: `I need a channel in order to delete it`},
            { name: "Command:", value: `Delete a channel\n\`\`\`${prefix}delchannel [channel]\`\`\``}
        )
        .setFooter('WithersBot helps')
        msg.channel.send(noDelete);
    }
}
}

module.exports = {
    name: "delrank",
    description: "Delete a role",
    example: prefix + "delrank [role]",
    type: "rank",
    execute(msg, args) {
        del(msg, args)
    }
}