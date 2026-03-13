const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

function isValidHex(hex) {
    return /^#?[0-9A-Fa-f]{6}$/.test(hex);
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('color')
        .setDescription('Generate or display information about a hex color.')
        .addStringOption(option =>
            option.setName('hex')
                .setDescription('Hex color code (e.g. #FF5733). Leave empty for random color.')
                .setRequired(false)
        ),

    async execute(interaction) {
        let hex = interaction.options.getString('hex');

        if (!hex) {
            hex = '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, '0');
        } else {
            if (!isValidHex(hex)) {
                return interaction.reply({ content: 'Please provide a valid 6-digit hex color code (with or without #).', ephemeral: true });
            }
            if (!hex.startsWith('#')) hex = '#' + hex;
        }

        const embed = new EmbedBuilder()
            .setTitle(`Color Information: ${hex.toUpperCase()}`)
            .setColor(hex)
            .setDescription(`Hex code: \`${hex.toUpperCase()}\``)
            .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() });

        await interaction.reply({ embeds: [embed] });
    },
};
