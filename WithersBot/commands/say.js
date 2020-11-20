const { execute } = require("./server");

function sayIt(msg, args) {
    if (args == 0){
        msg.channel.send("**How to use**\n```zsay [word]```");
        return;
    }else {
        msg.channel.send(`${args}`);
        msg.delete();
    }
}

module.exports = {
    name: "say",
    description: "Make WithersBot say something",
    example: "zsay [word]",
    execute(msg, args){
        sayIt(msg, args)
    }
}