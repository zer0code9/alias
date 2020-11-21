const { prefix } = require("/home/asorinus/workspace/myFirstProject/WithersWorld/WithersBot/config.json");
function kickUser(msg, args) {
  let guild = msg.guild;
    if (`${msg.author}` !== `${guild.owner}`) {msg.channel.send(`You are not the owner, ${msg.author}`); return;} else {
    if (msg.mentions.users.size) {
        const taggedUser = msg.mentions.users.first();
        taggedUser.kick();
        msg.channel.send(`${taggedUser.username} has been successfully kicked.\n\ **Only use "kick" when someone has a bad behavior**`);
      } else {
        if (!msg.mentions.users.size) {
          msg.channel.send(`I need a tag in order to kick someone.\n\ **Only use "kick" when someone has a bad behavior**`)
        } else {
          msg.reply(`I don't know that person`);
        }
      }
}
}

module.exports = {
    name: "kick",
    description: "Only use it when someone has a bad behavior",
    example: prefix + "kick [@username]",
    execute(msg, args){
        kickUser(msg, args);
    }
}