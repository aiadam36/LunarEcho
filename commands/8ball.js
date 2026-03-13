const { SlashCommandBuilder } = require('discord.js');

const responses = [
    'Yes.', 'No.', 'Maybe.', 'Definitely.', 'I don’t think so.', 
    'Ask again later.', 'Of course.', 'Not in a million years.'
];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('8ball')
        .setDescription('Ask the magic 8-ball a yes/no question.')
        .addStringOption(option => option.setName('question').setDescription('Your question').setRequired(true)),
    async execute(interaction) {
        const question = interaction.options.getString('question');
        const answer = responses[Math.floor(Math.random() * responses.length)];

        await interaction.reply(`Question: ${question}\nAnswer: ${answer}`);
    },
};
