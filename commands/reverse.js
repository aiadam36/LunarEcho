const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reverse')
        .setDescription('Reverses the given text.')
        .addStringOption(option => option.setName('text').setDescription('The text to reverse').setRequired(true)),
    async execute(interaction) {
        const text = interaction.options.getString('text');
        const reversed = text.split('').reverse().join('');

        await interaction.reply(`Reversed: ${reversed}`);
    },
};
