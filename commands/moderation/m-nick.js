const { prefix, by } = require("../../config.json");
const { MessageEmbed, Permissions } = require('discord.js');
const { Timeout, Wronganswer, Perm, Cancel, Invalid, Unknown } = require("../../errors");
async function nick(msg, args, example) {
    let user = msg.guild.members.cache.get(args[0]) || msg.mentions.users.first();
    if (args.length == 1) user = msg.author;
    let name = args.slice(1).join(" ");
    if (args.length == 1) name = args.join(" ");

    if (!user) return Invalid(msg, 'No User', 'I need a user to change their name', `${example}`);
    if (!name) return Invalid(msg, 'No Name', 'I need a name to change the name', `${example}`);

    await user.setNickname(`${name}`)
    const change = new MessageEmbed()
    .setColor("#00ff00")
    .setTitle(":white_check_mark: RENAMED MEMBER :bust_in_silhouette::pencil2:")
    .setDescription("Moderation")
    .addFields(
        { name: `New Nickname for ${user.username}`, value: `New nickname: ${name}` }
    )
    .setFooter({ text: `${by} helps` })
    await msg.channel.send({ embeds: [change] });
    msg.delete();
}

module.exports = {
    name: "nick",
    description: "Change the nickname of a member",
    example: prefix + "nick [member] [name]",
    type: "moderation",
    execute(msg, args) {
        if (!msg.guild.me.permissions.has(Permissions.FLAGS.CHANGE_NICKNAME)) return Perm(msg, `No permission`, `You don't have the permission to change your own nickname or someone's`);
        if (!msg.member.permissions.has(Permissions.FLAGS.CHANGE_NICKNAME)) return Perm(msg, `No permission`, `I dont have the permission to change the nickname of someone`);
        nick(msg, args, this.example);
    }
}