const { SlashCommandBuilder } = require('discord.js');

function textToBinary(text) {
    return text
        .split('')
        .map(char => char.charCodeAt(0).toString(2).padStart(8, '0'))
        .join(' ');
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('text2binary')
        .setDescription('Convert text to binary.')
        .addStringOption(option =>
            option.setName('text')
                .setDescription('The text to convert to binary')
                .setRequired(true)
        ),

    async execute(interaction) {
        const inputText = interaction.options.getString('text');
        const binary = textToBinary(inputText);

        const output = `\`\`\`text\n${binary}\n\`\`\``;

        await interaction.reply(output);
    },
};
