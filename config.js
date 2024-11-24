module.exports = {
    bot: {
        name: "Alias",
        version: "2.12.2",
        id: "768214696019886121",
        prefix: "z",
        seperator: "-"
    },

    ready: {
        status: "online",
        activity: "Discord",
        type: "PLAYING"
    },

    event: {
        guildCre: true,
        guildDel: false,
        messageCre: true,
        messageDel: true,
        interactionCre: true,
        inviteCre: false,
        inviteDel: false,
        memberAdd: false,
        memberRem: false,
        reactionAdd: false,
        reactionRem: false,
    },

    colorEmbed: {
        success: "#00ff00",
        error: "#FF0000",
        warning: "#FF4433",
        neutral: "#FFFFFF",
        asking: "#000000"
    },

    emojiType: {
        guild: "desktop",
        bot: "robot",
        channel: "file_folder",
        role: "label",
        user: "bust_in_silhouette",
        emoji: "envelope",
        fun: "teddy_bear",
        time: "clock12",

        create: "heavy_plus_sign",
        delete: "heavy_minus_sign",
        move: "arrow_heading_up",
        rename: "pencil2",
        count: "1234",
        edit: "pencil",

        success: "white_check_mark",
        
        error: "x",
        warning: "warning",
        stop: "stop_sign",
        no: "no_entry_sign",
    }
}