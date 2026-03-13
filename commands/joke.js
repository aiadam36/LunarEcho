const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');

const categories = ['Any', 'Programming', 'Misc', 'Dark', 'Pun', 'Spooky', 'Christmas'];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('joke')
        .setDescription('Get a random joke from selected category.')
        .addStringOption(option =>
            option.setName('category')
                .setDescription('Select joke category')
                .setRequired(false)
                .addChoices(
                    { name: 'All', value: 'Any' },
                    { name: 'Programming', value: 'Programming' },
                    { name: 'Misc', value: 'Misc' },
                    { name: 'Dark', value: 'Dark' },
                    { name: 'Pun', value: 'Pun' },
                    { name: 'Spooky', value: 'Spooky' },
                    { name: 'Christmas', value: 'Christmas' }
                )
        ),

    async execute(interaction) {
        const category = interaction.options.getString('category') || 'Any';

        try {
            const res = await axios.get(`https://v2.jokeapi.dev/joke/${category}?format=json&blacklistFlags=nsfw,religious,political,racist,sexist,explicit`);
            const joke = res.data;

            let jokeText;

            if (joke.type === 'single') {
                jokeText = joke.joke;
            } else if (joke.type === 'twopart') {
                jokeText = `${joke.setup}\n\n${joke.delivery}`;
            } else {
                jokeText = "Hmm, couldn't fetch a joke right now.";
            }

            const embed = new EmbedBuilder()
                .setTitle(`Here's a ${category} joke for you!`)
                .setDescription(jokeText)
                .setColor('Yellow')
                .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() });

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            await interaction.reply('Sorry, I couldn\'t get a joke right now. Try again later.');
        }
    },
};
