const { prefix } = require("/home/asorinus/workspace/myFirstProject/WithersWorld/WithersBot/config.json");
const Discord = require("discord.js");
function del(msg, args) {
    const role = msg.mentions.roles.first();
    if (args == 0) {
    const noDelete = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle("WithersBot Commands")
    .setDescription("Command: delrank")
    .addFields(
        { name: "Command:", value: `Delete a role\n\`\`\`${prefix}delrank [role]\`\`\``}
    )
    .setFooter("WithersBot helps")
    msg.channel.send(noDelete);
    } else {
        if (args == msg.guild.roles.name) {
            role.delete();
            const remove = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle("WithersBot Commands")
            .setDescription("Command: delrank")
            .addFields(
                { name: "A role has been deleted", value: `Deleted role: ${args}`}
            )
            .setFooter("WithersBot helps")
            msg.channel.send(remove);
        } else {
            const noRemove = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTitle(`WithersBot Commands`)
            .setDescription('Commands: delrank')
            .addFields(
                { name: "Can't delete role", value: `There is no role ${args}` }
            )
            .setFooter('WithersBot helps')
            msg.channel.send(noRemove);
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