const { prefix } = require("/home/asorinus/workspace/myFirstProject/WithersWorld/WithersBot/config.json");
const Discord = require("discord.js");
function cInfo(msg, args) {
    let user = msg.mentions.members.first();
    let rolei = args.slice(1).join(" ");
    if (args == 0){
    const channelInfo = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setTitle(`Info on`)
    .setDescription('WithersBot Commands:')
    .addFields(
        { name: "Info", value: `Get info on a role\n\`\`\`${prefix}role info [role]\`\`\``},
        { name: "Add", value: `Add a permission to a role\n\`\`\`${prefix}role add [role] [permission]\`\`\`` },
        { name: "Remove", value: `Remove a permission of a role\n\`\`\`${prefix}role remove [role] [permission]\`\`\``},
        { name: "Create", value: `Create a role\n\`\`\`${prefix}role create [role]\`\`\``},
        { name: "Delete", value: `Delete a role\n\`\`\`${prefix}role delete [role]\`\`\``},
        { name: "Name", value: `Change the name of a role\n\`\`\`${prefix}role name [role] [roleName]\`\`\``}
    )
    .setFooter('The Bot of WithersWorld')
msg.channel.send(channelInfo);
    }
    if (args[0] === "info") {
        let roleName = msg.guild.roles.cache.find(role => role.name === args[1]);
    }
    if (args[0] == "add") {
        let perm = args[2].toUpperCase;
        let command = guild.roles.everyone.setPermissions([`${perm}`]);
    }
    if (args[0] == "create") {
        let command = guild.roles.create({ data: { name: `${args[1]}` } });
    }
}
module.exports = {
    name: "role",
    description: "Get info on any channel of a server!",
    example: prefix + "role",
    execute(msg, args) {
        cInfo(msg, args);
    }
}