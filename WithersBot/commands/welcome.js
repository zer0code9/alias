module.exports = {
    name: "wsw",
    description: "WithersYoutube",
    execute(msg, args){
        msg.channel.send("https://www.youtube.com/channel/UCEhaRtTBEpzq3655QVpsOlQ")
    }
}
module.exports = {
    name: "hello",
    description: "Say hello",
    execute(msg, args){
        msg.channel.send("Hello :D nice to meet you!");
    }
}
module.exports = {
    name: "verison",
    description: "Verison of WithersBot",
    execute(msg, args){
        msg.channel.send("1.1.0");
    }
}