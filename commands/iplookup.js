const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('iplookup')
    .setDescription('Get geolocation and ISP info for an IP address.')
    .addStringOption(option =>
      option.setName('ip')
        .setDescription('The IP address to look up')
        .setRequired(true)
    ),

  async execute(interaction) {
    const ip = interaction.options.getString('ip');

    const ipv4Regex = /^(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)){3}$/;
    if (!ipv4Regex.test(ip)) {
      return interaction.reply({ content: 'Please provide a valid IPv4 address.', ephemeral: true });
    }

    await interaction.deferReply();

    try {
      const response = await axios.get(`http://ip-api.com/json/${ip}`);

      if (response.data.status !== 'success') {
        return interaction.editReply('Failed to retrieve info for this IP address.');
      }

      const data = response.data;

      const embed = new EmbedBuilder()
        .setTitle(`IP Lookup: ${ip}`)
        .setColor('Blue')
        .addFields(
          { name: 'Country', value: data.country || 'N/A', inline: true },
          { name: 'Region', value: data.regionName || 'N/A', inline: true },
          { name: 'City', value: data.city || 'N/A', inline: true },
          { name: 'ISP', value: data.isp || 'N/A', inline: true },
          { name: 'Organization', value: data.org || 'N/A', inline: true },
          { name: 'Timezone', value: data.timezone || 'N/A', inline: true },
          { name: 'ZIP', value: data.zip || 'N/A', inline: true },
          { name: 'Latitude', value: data.lat?.toString() || 'N/A', inline: true },
          { name: 'Longitude', value: data.lon?.toString() || 'N/A', inline: true }
        )
        .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() });

      await interaction.editReply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      await interaction.editReply('Error fetching IP information. Please try again later.');
    }
  },
};
