module.exports = {
    name: "server",
    description: "WithersWorld to WithersBot",
    execute(msg, args, server){
        msg.channel.send(`Hello ${msg.author}! and Welcome to ! I'm WithersBot and I'm here to help you throughout your time in the server!`);
    }
}
