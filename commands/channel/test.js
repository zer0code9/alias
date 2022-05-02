const { prefix, by } = require("../../config.json");
const { MessageEmbed, Permissions, MessageButton } = require('discord.js');
async function abc(msg, args) {
    console.log(!msg.guild.me.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS));
    const Embed = new MessageEmbed()
    .setColor("#ff0000")
    .setTitle(`test`)
    .addFields(
        { name: `test`, value: `working?` }
    )
    .setFooter(`${by} helps`)
    const Button = new MessageButton()
    .setEmoji(":o:")
    .setLabel("Ok")
    return msg.channel.send({ embeds: [Embed], buttons: [Button] })
}

module.exports = {
    name: "test",
    description: "test",
    example: prefix + "test",
    type: "test",
    execute(msg, args) {
        abc(msg, args);
    }
}
/*
let authorid = msg.author.id;

    const filter1 = response1 => { return response1.author.id === authorid; }

    msg.channel.send().then(() => {
      msg.channel.awaitMessages(filter1, { max: 1 })
      .then(collected1 => {
        const response1 = collected1.first();
        let User = msg.guild.member(response1.mentions.users.first());
  
        const filter2 = response2 => { return response2.author.id === authorid; }
  
        msg.channel.send().then(() => {
          msg.channel.awaitMessages(filter2, { max: 1 })
          .then(collected2 => {
            const response2 = collected2.first();
            let Reason = response2.content;
    
            User.mute(Reason);
          });
        })
        
      });
    })
    */