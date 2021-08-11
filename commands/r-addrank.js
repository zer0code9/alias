const { prefix, by } = require("./../config.json");
const Discord = require("discord.js");
function addRank(msg, args) {
    if (!msg.member.hasPermission("MANAGE_ROLES")) return msg.channel.send(`You don't have the permission to manage roles, ${msg.author}`)
    if(!msg.guild.me.hasPermission("MANAGE_ROLES")) return msg.channel.send(`I dont have the permissions to manage roles, ${msg.author}`)
    const role = msg.mentions.roles.first();
    const name = args.join(" ");
    if (name) {
        msg.guild.roles.create({ data: { name: `${name}` } });
        const add = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("CREATED ROLE :label::heavy_plus_sign:")
        .setDescription("Rank")
        .addFields(
            { name: "A new role has been created", value: `\`\`\`New role name: ${name}\`\`\``}
        )
        .setFooter(`${by} helps`)
        msg.channel.send(add);
    } else {
        const noAdd = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`${by} Commands`)
        .setDescription("Command: addrank")
        .addFields(
            { name: "No Name", value: `I need a name in order to create a new role`},
            { name: "Command:", value: `Create a new rank\n\`\`\`${prefix}addrank [name]\`\`\``}
        )
        .setFooter(`${by} helps`)
        msg.channel.send(noAdd);
    }
}

module.exports = {
    name: "addrank",
    description: "Create a new role",
    example: prefix + "addrank [name]",
    type: "rank",
    execute(msg, args) {
        if (!msg.member.hasPermission("MANAGE_ROLES")) return msg.channel.send(`You don't have the permission to manage roles, ${msg.author}`)
        if(!msg.guild.me.hasPermission("MANAGE_ROLES")) return msg.channel.send(`I dont have the permissions to manage roles, ${msg.author}`)
        let authorid = msg.author.id;

        const filter1 = response1 => { return response1.author.id === authorid; }

        const Name = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`${by} Commands`)
        .setDescription("Command: addrank")
        .addFields(
            { name: "Name", value: `I need a name to continue` }
        )
        .setFooter(`${by} helps`)
    
        msg.channel.send(Name).then(() => {
            msg.channel.awaitMessages(filter1, { max: 1 })
            .then(collected1 => {
                const name = collected1.first();
                msg.guild.roles.create({ data: { name: `${name}` } });

                const Add = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setTitle("CREATED CHANNEL :label::heavy_plus_sign:")
                .setDescription("Rank")
                .addFields(
                    { name: "A new role has been created", value: `\`\`\`${name}\`\`\``}
                )
                .setFooter(`${by} helps`)
                msg.channel.send(Add);
            });
        })
    }
}