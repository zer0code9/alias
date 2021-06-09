const { prefix, by } = require("./../config.json");

module.exports = {
    name: "avatar",
    description: "See the avatars of others!",
    example: "still in progress",
    execute(msg, args){
        if (!msg.mentions.users.size) {
			return msg.channel.send(`Your avatar: <${msg.author.avatarURL()}>`);
		}

		const avatarList = msg.mentions.users.map(user => {
			return `${user.username}'s avatar: <${user.avatarURL()}>`;
		});

		msg.channel.send(avatarList); 
    }
}
