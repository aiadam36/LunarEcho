const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('shorten')
        .setDescription('Shorten a long URL using TinyURL.')
        .addStringOption(option =>
            option.setName('url')
                .setDescription('The URL to shorten')
                .setRequired(true)
        ),

    async execute(interaction) {
        const longUrl = interaction.options.getString('url');

        try {
            new URL(longUrl);
        } catch {
            return interaction.reply({ content: 'Please provide a valid URL.', ephemeral: true });
        }

        try {
            const response = await axios.get(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`);
            const shortUrl = response.data;

            await interaction.reply(`🔗 Shortened URL: ${shortUrl}`);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'Failed to shorten URL. Try again later.', ephemeral: true });
        }
    },
};
