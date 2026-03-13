const { SlashCommandBuilder } = require('discord.js');
const dns = require('dns').promises;

module.exports = {
  data: new SlashCommandBuilder()
    .setName('dnslookup')
    .setDescription('Lookup DNS records for a domain.')
    .addStringOption(option =>
      option.setName('domain')
        .setDescription('The domain to lookup DNS records for')
        .setRequired(true)
    ),

  async execute(interaction) {
    const domain = interaction.options.getString('domain');

    await interaction.deferReply();

    try {
      const [aRecords, mxRecords, txtRecords, nsRecords] = await Promise.all([
        dns.resolve(domain, 'A').catch(() => []),
        dns.resolve(domain, 'MX').catch(() => []),
        dns.resolve(domain, 'TXT').catch(() => []),
        dns.resolve(domain, 'NS').catch(() => [])
      ]);

      let reply = `**DNS records for ${domain}:**\n\n`;

      reply += `**A Records:**\n${aRecords.length ? aRecords.join('\n') : 'None'}\n\n`;
      reply += `**MX Records:**\n${mxRecords.length ? mxRecords.map(mx => `${mx.exchange} (Priority: ${mx.priority})`).join('\n') : 'None'}\n\n`;
      reply += `**TXT Records:**\n${txtRecords.length ? txtRecords.map(txt => txt.join('')).join('\n') : 'None'}\n\n`;
      reply += `**NS Records:**\n${nsRecords.length ? nsRecords.join('\n') : 'None'}`;

      await interaction.editReply(reply);
    } catch (error) {
      console.error(error);
      await interaction.editReply('Failed to lookup DNS records. Please ensure the domain is valid.');
    }
  },
};
