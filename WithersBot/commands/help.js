const prefix = require("../index.js");

function sendHelp(msg, args){};

module.exports = {
    name: "help",
    description: "Get help on the commands of WithersBot",
    example: prefix + "help [command]",
    execute(msg, args){
        sendHelp(msg, args);
    }
}