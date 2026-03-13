const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('echo')
        .setDescription('Makes the bot repeat your message')
        .addStringOption(option =>
            option.setName('message')
                .setDescription('The message to echo')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        const ownerId = '838216841973334057';
        if (interaction.user.id !== ownerId) {
            return interaction.reply({ content: "You don't have permission to use this command.", ephemeral: true });
        }

        const message = interaction.options.getString('message');

        try {
            await interaction.deferReply({ ephemeral: true });
            await interaction.deleteReply();
            await interaction.channel.send(message);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'Failed to echo the message.', ephemeral: true });
        }
    },
};
