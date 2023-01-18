const { prefix, by } = require("../../config.json");
const { MessageEmbed, Permissions } = require('discord.js');
function ball(msg, args) {
    let answers = [
        "yes",
        "maybe",
        "no",
        "sometimes",
        "never",
        "for sure",
        "of course",
    ]
    var num = Math.floor(Math.random() * (answers.length + 1));
    msg.channel.send(answers[num]);
}

module.exports = {
    name: "8ball",
    description: "The 8ball you love!",
    example: prefix + "8ball",
    type: "fun",
    execute(msg, args) {
        ball(msg, args);
    }
}