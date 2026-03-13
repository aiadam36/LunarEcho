const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('meme')
        .setDescription('Sends a random meme from Reddit.'),
    async execute(interaction) {
        try {
            const res = await axios.get('https://www.reddit.com/r/memes/hot.json?limit=50');
            const posts = res.data.data.children.filter(post => post.data.post_hint === 'image');

            if (!posts.length) {
                return await interaction.reply({ content: 'No memes found.', ephemeral: true });
            }

            const meme = posts[Math.floor(Math.random() * posts.length)].data;

            const embed = new EmbedBuilder()
                .setTitle(meme.title)
                .setURL(`https://reddit.com${meme.permalink}`)
                .setImage(meme.url)
                .setFooter({ text: `Upvotes: ${meme.ups} | Comments: ${meme.num_comments}` })
                .setColor('Random');

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'Failed to fetch meme. Try again later.', ephemeral: true });
        }
    },
};
