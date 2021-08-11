const { prefix, by } = require("./../config.json");
const Discord = require("discord.js");


module.exports = {
    name: "channelz",
    description: "Edit a channel",
    example: prefix + "channel",
    type: "info",
    execute(msg, args) {
        

        function channelName() {
            const nameChannel = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setTitle("CHANGED EDIT :pencil:")
                .setDescription("Command: channel")
                .addFields(
                    { name: `Name`, value: `Type a channel name`},
                )
                .setFooter(`${by} helps`)
                let filterName = m => m.author.id === msg.author.id
            msg.channel.send(nameChannel).then(() => {
                msg.channel.awaitMessages(filterName, {
                    max: 1,
                    time: 30000,
                    errors: ['time']
                })
            })
            .then(msgN => {
                const channelN = msgN.first();
                let channel = msgN.guild.channels(channelN.mentions.channels.first())
                if (!channel) {
                    const noAdd = new Discord.MessageEmbed()
                        .setColor("RANDOM")
                        .setTitle(`${by} Commands`)
                        .setDescription("Command: addchannel")
                        .addFields(
                            { name: "Canceled", value: `Wrong answer cancelation`},
                            { name: "No Name", value: `I need a name in order to create a new channel`}
                        )
                        .setFooter(`${by} helps`)
                    msg.channel.send(noAdd);
                    return false;
                } else {
                    return true;
                }
            })
            .catch(error => {
                msg.channel.send("Canceled" + ` ${error}`)
            })
        }

        function channelAdd() {
            if (channelName()) {
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
        
        
        
        // CHOOSE
        let filter = m => m.author.id === msg.author.id
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
                if (msg.content.toLowerCase() == "add") {channelAdd()}
            })
            .catch(error => {
                msg.channel.send('Timeout' + `${error}`);
            });
        })
  }
}