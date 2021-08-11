const { prefix, by } = require("/home/asorinus/workspace/myFirstProject/splashy/SplashBot/config.json");
const Discord = require("discord.js");
async function abc(msg, args) {
    let filter = m => m.author.id === msg.author.id
    msg.channel.send(`Are you sure to delete all data? \`YES\` / \`NO\``).then(() => {
        msg.channel.awaitMessages(filter, {
          max: 1,
          time: 30000,
          errors: ['time']
        })
        .then(msg => {
            msg = msg.first()
          if (msg.content.toUpperCase() == 'YES' || msg.content.toUpperCase() == 'Y') {
            msg.channel.send(`Deleted`)
          } else if (msg.content.toUpperCase() == 'NO' || msg.content.toUpperCase() == 'N') {
            msg.channel.send(`Terminated`)
          } else {
            msg.channel.send(`Terminated: Invalid Response`)
          }
        })
        .catch(error => {
            msg.channel.send('Timeout' + `${error}`);
        });
    })
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