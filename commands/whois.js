const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('whois')
        .setDescription('Fetch WHOIS info for a domain using RDAP API.')
        .addStringOption(option =>
            option.setName('domain')
                .setDescription('Domain name to lookup (e.g. example.com)')
                .setRequired(true)
        ),

    async execute(interaction) {
        const domain = interaction.options.getString('domain').toLowerCase();

        await interaction.deferReply();

        try {
            const url = `https://rdap.org/domain/${encodeURIComponent(domain)}`;
            const response = await axios.get(url);

            const data = response.data;

            const registrar = data.entities?.find(e => e.roles?.includes('registrar'))?.vcardArray?.[1]
                ?.find(item => item[0] === 'fn')?.[3] || 'N/A';

            const status = data.status ? data.status.join(', ') : 'N/A';

            const nameservers = data.nameservers
                ? data.nameservers.map(ns => ns.ldhName || ns.objectClassName).join('\n')
                : 'N/A';

            const events = {};
            if (data.events) {
                for (const ev of data.events) {
                    if (ev.eventAction === 'registration') events.created = ev.eventDate;
                    else if (ev.eventAction === 'expiration') events.expires = ev.eventDate;
                }
            }

            const embed = new EmbedBuilder()
                .setTitle(`WHOIS info for ${domain}`)
                .setColor('Blue')
                .addFields(
                    { name: 'Registrar', value: registrar, inline: true },
                    { name: 'Created On', value: events.created || 'N/A', inline: true },
                    { name: 'Expires On', value: events.expires || 'N/A', inline: true },
                    { name: 'Status', value: status, inline: false },
                    { name: 'Name Servers', value: nameservers, inline: false }
                )
                .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() });

            await interaction.editReply({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            await interaction.editReply('Failed to fetch WHOIS info. Please make sure the domain is valid and try again.');
        }
    },
};
