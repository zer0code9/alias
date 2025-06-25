const { emojiType } = require('../../config');
const { ApplicationCommandOptionType, EmbedBuilder, Message, ChatInputCommandInteraction, MessageFlags } = require('discord.js');
const AliasEmbeds = require("../../helpers/embeds");
const AliasUtils = require("../../helpers/utils");
const AliasSends = require("../../helpers/sends");
const { model } = require('../../database/database');

module.exports = {
    settings: {
        name: "prompt",
        idDB: "",
        description: "Ask Alias a little something",
        category: "Utility",
        botPerms: [],
        memPerms: [],
        existMsg: false,
        existInt: true,
        type: 1,
        options: [
            {
                name: "prompt",
                description: "The prompt to answer [string-phrase]",
                type: ApplicationCommandOptionType.String,
                specific: "string-phrase",
                required: true,
            }
        ]
    },

    /**
     * 
     * @param {Message} msg 
     * @param {String[]} args 
     */
    // async msgRun(msg, args){
    //     const prompt = args.join(" ");

    //     try {
    //         const Prompt = await this.Prompt(prompt);
    //         AliasSends.sendEmbed(msg, Prompt);
    //     } catch {
    //         AliasSends.sendError(msg, this.settings.name);
    //     }
    //     msg.delete();
    // },

    /**
     * 
     * @param {ChatInputCommandInteraction} int 
     */
    async intRun(int) {
        const prompt = int.options.getString("prompt");

        this.PromptReact(int, prompt);
    },

    /**
     * 
     * @param {ChatInputCommandInteraction} type 
     * @param {string} prompt 
     */
    async PromptReact(type, prompt) {
        const settings = this.settings;

        // const response = "AI offers a lot of potential benefits across various aspects of life. Here are some key areas where AI can be really good:\n\n*   **Automation:** AI can automate repetitive tasks, freeing up humans to focus on more creative and strategic work. This can lead to increased efficiency and productivity in industries like manufacturing, customer service, and data analysis.\n\n*   **Improved Decision-Making:** AI algorithms can analyze vast amounts of data to identify patterns and insights that humans might miss. This can lead to better decision-making in areas like finance, healthcare, and marketing."

        let page = 1;

        const Getting = AliasEmbeds.embedSuccess('RESPONDING', emojiType.ai, 'memo', settings.category, [
            { name: `${prompt}`, value: `Getting response...` }
        ])
        const cResponse = await type.reply({ embeds: [Getting], withResponse: true });
        const cMessage = cResponse.resource.message;
        
        const result = await model.generateContent({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { maxOutputTokens: 1020 }
        });
        const response = result.response.text();

        const Reacting = AliasEmbeds.embedSuccess('REACTING', emojiType.ai, 'pushpin', settings.category, [
            { name: `${prompt}`, value: `Adding reactions...` }
        ])
        await cMessage.edit({ embeds: [Reacting] });

        await cMessage.react('⬅️');
        await cMessage.react('➡️');
        await cMessage.react('❌');

        const filter = (reaction, user) => {
            return ['⬅️', '➡️', '❌'].includes(reaction.emoji.name) && user.id === type.user.id;
        };
        const collector = cMessage.createReactionCollector({ filter, time: 60_000 });

        const getPages = () => {
            const num = 1020;
            const pages = [];
            for (let i = 0; i < response.length; i += num) {
                pages.push(response.slice(i, i + num));
            }
            return pages;
        }

        const getPageEmbed = (page) => {
            let responseEdit = getPages()[page - 1];

            return AliasEmbeds.embedSuccess('RESPONDED', emojiType.ai, 'page_facing_up', `${this.settings.category} - ${page} / ${getPages().length}`, [
                { name: `${prompt}`, value: `${responseEdit || 'No more response'}` }
            ])
        }
        await cMessage.edit({ embeds: [getPageEmbed(page)] });

        collector.on('collect', (reaction, user) => {
            reaction.users.remove(user.id);
            if (reaction.emoji.name === '⬅️') {
                --page;
                if (page < 1) page = 1;
            } else if (reaction.emoji.name === '➡️') {
                ++page;
                if (page > getPages().length) page = getPages().length;
            } else {
                collector.stop();
            }
            cMessage.edit({ embeds: [getPageEmbed(page)] });
        });

        collector.on('end', (collected) => {
            cMessage.delete();
        });
    }
}