require('dotenv').config();
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers] });
client.commands = new Collection();
const token = process.env.TOKEN;

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error executing this command!', ephemeral: true });
    }
});

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    setActivity();
});

function setActivity() {
    try {
        client.user.setPresence({
            status: 'idle',
            activities: [
                {
                    name: 'my dev codes.',
                    type: 2
                }
            ]
        });
    } catch (error) {
        console.error('Failed to set activity:', error);
    }
}

client.on('reconnecting', () => {
    setActivity();
});

setInterval(setActivity, 1000 * 60 * 60);

client.login(token);
