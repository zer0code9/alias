const { prefix, by } = require("./../config.json");
const Discord = require("discord.js");
function users(msg, args) {
    const user = msg.mentions.users.first();

    let usermap = msg.guild.users
    .sort((a, b) => b.position + a.position) 
    .map(u => u)
    .join(`\n`);
    if (usermap.length > 1024) usermap = "To many users to display";
    if (!usermap) rolemap = "No users"; 
    const users = new Discord.MessageEmbed()
    .setColor('#00ff00')
    .setTitle(`:white_check_mark: USER COUNT :bust_in_silhouettes::1234:`)
    .setDescription('Moderation')
    .addFields(
        { name: `All Users of ${msg.guild.name} [${msg.guild.users.fetch()}]`, value: `${usermap}`}
    )
    .setFooter(`${by} helps`)
    msg.user.send(users);
}
module.exports = {
    name: "users",
    description: "Get a list of all the users of the server",
    example: prefix + "users",
    type: "Moderation",
    execute(msg, args) {
        users(msg, args);
    }
}