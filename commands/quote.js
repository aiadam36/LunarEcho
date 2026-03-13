const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('quote')
        .setDescription('Get a random inspirational quote'),
    async execute(interaction) {
        await interaction.deferReply();

        try {
            const response = await axios.get('https://zenquotes.io/api/random');
            const quote = response.data[0].q;
            const author = response.data[0].a;
            await interaction.editReply(`"${quote}" - ${author}`);
        } catch (error) {
            console.error(error);
            await interaction.editReply('Failed to fetch a quote. Try again later.');
        }
    }
};
