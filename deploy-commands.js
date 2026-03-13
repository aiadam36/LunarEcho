require('dotenv').config();
const { REST, Routes } = require('discord.js');
const fs = require('fs');

const token = process.env.TOKEN;
const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
    try {
        console.log('Refreshing application (/) commands...');
        await rest.put(Routes.applicationCommands('1354758755711057970'), { body: commands });
        console.log('Successfully reloaded commands!');
    } catch (error) {
        console.error(error);
    }
})();
