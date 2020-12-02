const { description } = require("./namechannel");

function test(msg, args) {
    msg.channel.send("test?");
    setTimeout({if (msg.content == "test") {msg.channel.reply("test is good")}, 600})
    if (msg.content == "test") {msg.channel.reply("test is good")}
}

module.exports = {
    name: "test",
    description: "just a test...",
    example: "none",
    execute(msg, args) {
        test(msg, args)
    }
}