const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dictionary')
        .setDescription('Get the definition of a word.')
        .addStringOption(option => 
            option.setName('word')
                .setDescription('The word to define')
                .setRequired(true)),

    async execute(interaction) {
        const word = interaction.options.getString('word');

        try {
            const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
            const data = response.data[0];

            const embed = new EmbedBuilder()
                .setColor(0x3498db)
                .setTitle(`Definition of **${word}**`)
                .setDescription(`**Phonetic:** ${data.phonetic || 'N/A'}`)
                .setFooter({ text: 'Powered by Free Dictionary API' });

            data.meanings.forEach(meaning => {
                embed.addFields({ 
                    name: `**${meaning.partOfSpeech}**`, 
                    value: meaning.definitions[0].definition 
                });
            });

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            await interaction.reply({ content: `Couldn't find a definition for **${word}**.`, ephemeral: true });
        }
    }
};
