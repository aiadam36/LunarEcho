const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');

const endpoints = {
  hentai: 'https://api.waifu.im/search?is_nsfw=true&included_tags=hentai',
  oppai: 'https://api.waifu.im/search?is_nsfw=true&included_tags=oppai',
  oral: 'https://api.waifu.im/search?is_nsfw=true&included_tags=oral',
  ero: 'https://api.waifu.im/search?is_nsfw=true&included_tags=ero',
  maid: 'https://api.waifu.im/search?is_nsfw=true&included_tags=maid',
  milf: 'https://api.waifu.im/search?is_nsfw=true&included_tags=milf',
  ecchi: 'https://api.waifu.im/search?is_nsfw=true&included_tags=ecchi',
  ass: 'https://api.waifu.im/search?is_nsfw=true&included_tags=ass',
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName('nsfw')
    .setDescription('Sends a random NSFW image.')
    .addStringOption(option =>
      option
        .setName('type')
        .setDescription('Choose the type of NSFW image')
        .setRequired(true)
        .addChoices(
          { name: 'Hentai', value: 'hentai' },
          { name: 'Oppai', value: 'oppai' },
          { name: 'Oral', value: 'oral' },
          { name: 'Ero', value: 'ero' },
          { name: 'Maid', value: 'maid' },
          { name: 'Milf', value: 'milf' },
          { name: 'Ecchi', value: 'ecchi' },
          { name: 'Ass', value: 'ass' }
        )
    ),

  async execute(interaction) {
    if (!interaction.channel.nsfw) {
      return interaction.reply({ content: '🚫 This command can only be used in NSFW channels.', ephemeral: true });
    }
    
    const type = interaction.options.getString('type');
    const url = endpoints[type];

    try {
      const res = await axios.get(url);
      const imageUrl = res.data.images?.[0]?.url;

      if (!imageUrl) {
        return await interaction.reply({ content: '❌ Could not fetch image. API might be down or empty.', ephemeral: true });
      }

      const embed = new EmbedBuilder()
        .setTitle(`NSFW: ${type.charAt(0).toUpperCase() + type.slice(1)}`)
        .setImage(imageUrl)
        .setColor('Random')
        .setFooter({ text: 'Powered by waifu.im' });

      await interaction.reply({ embeds: [embed] });

    } catch (error) {
      console.error(error);
      await interaction.reply({ content: '❌ Internal error while fetching image.', ephemeral: true });
    }
  },
};
