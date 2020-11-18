module.exports = {
    name: "hello",
    description: "Say hello",
    execute(msg, args){
        msg.channel.send("Hello :D nice to meet you!");
    }
}