const { SlashCommandBuilder } = require('discord.js');

function binaryToText(binary) {
    return binary
        .split(' ')
        .map(bin => String.fromCharCode(parseInt(bin, 2)))
        .join('');
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('binary2text')
        .setDescription('Convert binary to text.')
        .addStringOption(option =>
            option.setName('binary')
                .setDescription('The binary to convert to text (space separated bytes)')
                .setRequired(true)
        ),

    async execute(interaction) {
        const inputBinary = interaction.options.getString('binary');

        if (!/^[01\s]+$/.test(inputBinary)) {
            return interaction.reply({ content: 'Invalid binary input! Please use space-separated 8-bit binary bytes.', ephemeral: true });
        }

        try {
            const text = binaryToText(inputBinary);
            const output = `\`\`\`text\n${text}\n\`\`\``;
            await interaction.reply(output);
        } catch {
            await interaction.reply({ content: 'Error converting binary to text. Please ensure proper format.', ephemeral: true });
        }
    },
};
