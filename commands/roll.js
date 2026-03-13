const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

function parseDice(input) {
    const diceRegex = /^(\d{0,2})d(\d{1,3})$/i;
    const match = diceRegex.exec(input);
    if (!match) return null;

    let count = parseInt(match[1]) || 1;
    let sides = parseInt(match[2]);

    if (count > 20) count = 20;
    if (sides > 1000) sides = 1000;

    return { count, sides };
}

function rollDice(count, sides) {
    const rolls = [];
    for (let i = 0; i < count; i++) {
        rolls.push(Math.floor(Math.random() * sides) + 1);
    }
    return rolls;
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('roll')
        .setDescription('Roll dice like 1d6 or 2d20')
        .addStringOption(option =>
            option.setName('dice')
                .setDescription('Dice notation (e.g. 2d20, d100). Defaults to 1d6.')
                .setRequired(false)
        ),

    async execute(interaction) {
        const input = interaction.options.getString('dice') || '1d6';
        const dice = parseDice(input);

        if (!dice) {
            return interaction.reply({ content: 'Invalid dice format! Use NdM, e.g. 2d20 or d6.', ephemeral: true });
        }

        const rolls = rollDice(dice.count, dice.sides);
        const total = rolls.reduce((a, b) => a + b, 0);

        const embed = new EmbedBuilder()
            .setTitle(`🎲 Rolling ${dice.count}d${dice.sides}`)
            .setDescription(rolls.join(' + ') + ` = **${total}**`)
            .setColor('Random')
            .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() });

        await interaction.reply({ embeds: [embed] });
    },
};
