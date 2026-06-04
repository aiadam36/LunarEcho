const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('fact')
        .setDescription('Get a random fact'),
    async execute(interaction) {
        await interaction.deferReply();

        try {
            const response = await axios.get('https://uselessfacts.jsph.pl/random.json?language=en');
            const fact = response.data.text;
            await interaction.editReply(`Random Fact: ${fact}`);
        } catch (error) {
            console.error(error);
            await interaction.editReply('Failed to fetch a fact. Try again later.');
        }
    }
};
