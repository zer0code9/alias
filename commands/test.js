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