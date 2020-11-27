const { prefix } = require("/home/asorinus/workspace/myFirstProject/WithersWorld/WithersBot/config.json");
const Discord = require("discord.js");
function la(msg, args) {
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
        if (args !=0 ) {
            const remove = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle("WithersBot Commands")
            .setDescription("Command: ")
            .addFields(
                { name: "A role has been deleted", value: `Deleted role: ${args}`}
            )
            .setFooter("WithersBot helps")
            msg.channel.send(remove);
        }
    }
}

module.exports = {
    name: "delrank",
    description: "Delete a role",
    example: prefix + "delrank [role]",
    type: "rank",
    execute(msg, args) {
        la(msg, args)
    }
}