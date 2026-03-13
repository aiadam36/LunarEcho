const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('warn')
        .setDescription('Warn a user and notify them via DM.')
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
        .addUserOption(option => option.setName('user').setDescription('User to warn').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('Reason for warning').setRequired(true)),
    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason');
        const admin = interaction.user;

        try {
            await user.send(`You have been warned in **${interaction.guild.name}** for: **${reason}**`);
        } catch (error) {
            console.log(`Could not send DM to ${user.tag}.`);
        }

        try {
            await admin.send(`You warned **${user.tag}** in **${interaction.guild.name}**.\nReason: **${reason}**`);
        } catch (error) {
            console.log(`Could not DM the admin ${admin.tag}.`);
        }

        await interaction.reply({ content: `You warned **${user.tag}** for: **${reason}**`, ephemeral: true });
    },
};
