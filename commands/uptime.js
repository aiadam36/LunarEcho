const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

function formatDuration(seconds) {
    const days = Math.floor(seconds / (24 * 3600));
    seconds %= 24 * 3600;
    const hours = Math.floor(seconds / 3600);
    seconds %= 3600;
    const minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);

    return [
        days > 0 ? `${days}d` : null,
        hours > 0 ? `${hours}h` : null,
        minutes > 0 ? `${minutes}m` : null,
        `${seconds}s`
    ].filter(Boolean).join(' ');
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('uptime')
        .setDescription('Shows how long the bot has been online.'),

    async execute(interaction) {
        const uptimeSeconds = process.uptime();
        const uptime = formatDuration(uptimeSeconds);

        const embed = new EmbedBuilder()
            .setTitle('Bot Uptime')
            .setDescription(`🟢 Online for: **${uptime}**`)
            .setColor('Green')
            .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() });

        await interaction.reply({ embeds: [embed] });
    },
};
