const { prefix, by } = require("./../config.json");
const Discord = require("discord.js");

function channelName(msg) {
    const nameChannel = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle("CHANGED EDIT :pencil:")
    .setDescription("Command: channel")
    .addFields(
        { name: `Name`, value: `Type a channel name`},
    )
    .setFooter(`${by} helps`)
    msg.channel.send(nameChannel).then(() => {
        msg.channel.awaitMessages(filter, {max: 1, time: 30000, errors: ['time']})
    })
    .then(msg => {
        if (msg.first() != msg.mentions.channels.first()) {
            const noAdd = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setTitle(`${by} Commands`)
                .setDescription("Command: addchannel")
                .addFields(
                    { name: "No Name", value: `I need a name in order to create a new channel`},
                    { name: "Command:", value: `Create a new channel\n\`\`\`${prefix}addchannel [name]\`\`\``}
                )
                .setFooter(`${by} helps`)
                msg.channel.send(noAdd);
                return false;
        } else {
            const channel = msg.first();
            return true;
        }
    })
}

function channelAdd(msg) {
    if (channelName(msg)) {
        const add = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`${by} Commands`)
            .setDescription("Channel")
            .addFields(
                { name: "A new channel has been created", value: `\`\`\`New channel name: ${name}\`\`\``}
            )
            .setFooter(`${by} helps`)
            msg.channel.send(add);
    }
}

module.exports = {
    name: "channelz",
    description: "Edit a channel",
    example: prefix + "channel",
    type: "info",
    execute(msg, args) {
        let filter = m => m.author.id === msg.author.id
        // CHOOSE
        const edit = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle("CHANGED EDIT :pencil:")
            .setDescription("Command: channel")
            .addFields(
                { name: `Add`, value: `Create a new channel`},
                { name: `Del`, value: `Remove an existing channel`}
            )
            .setFooter(`${by} helps`)

        msg.channel.send(edit).then(() => {
            msg.channel.awaitMessages(filter, {
              max: 1,
              time: 30000,
              errors: ['time']
            })
            .then(msg => {
                msg = msg.first()
                if (msg.content.toLowerCase() == "add") {channelAdd(msg)}
            })
            .catch(error => {
                msg.channel.send('Timeout' + `${error}`);
            });
    })
  }
}