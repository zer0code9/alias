const { prefix } = require("/home/asorinus/workspace/myFirstProject/WithersWorld/WithersBot/config.json");

module.exports = {
    name: "avatar",
    description: "See the avatars of others!",
    example: "still in progress",
    execute(msg, args){
        if (!msg.mentions.users.size) {
			return msg.channel.send(`Your avatar: <${msg.author.displayAvatarURL}>`);
		}

		const avatarList = msg.mentions.users.map(user => {
			return `${user.username}'s avatar: <${user.displayAvatarURL}>`;
		});

		msg.channel.send(avatarList);
    }
}
