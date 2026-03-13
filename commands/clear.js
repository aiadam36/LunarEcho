const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('clear')
    .setDescription('Clears messages in this channel (up to 100 at a time).')
    .addIntegerOption(option =>
      option
        .setName('amount')
        .setDescription('Number of messages to delete (default 10, max 100)')
        .setMinValue(1)
        .setMaxValue(100)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });

    const amount = interaction.options.getInteger('amount') || 10;
    const channel = interaction.channel;

    try {
      const messages = await channel.messages.fetch({ limit: amount + 1 });
      const now = Date.now();
      const fourteenDays = 14 * 24 * 60 * 60 * 1000;

      const newerMessages = messages.filter(msg => (now - msg.createdTimestamp) < fourteenDays).first(amount);
      const olderMessages = messages.filter(msg => (now - msg.createdTimestamp) >= fourteenDays).first(amount);

      if (newerMessages.length > 0) {
        await channel.bulkDelete(newerMessages, true);
      }

      for (const msg of olderMessages) {
        try {
          await msg.delete();
          await new Promise(res => setTimeout(res, 1000));
        } catch (err) {
          console.error(`Failed to delete message ${msg.id}:`, err);
        }
      }

      await interaction.editReply(`Deleted up to ${amount} messages.`);
    } catch (error) {
      console.error(error);
      await interaction.editReply('Failed to delete messages. Messages older than 14 days cannot be bulk deleted.');
    }
  },
};
