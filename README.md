# LunarEcho

A Discord bot built with discord.js v14, featuring moderation, utility, and fun slash commands.

## Installation

1. Clone the repository and install dependencies:

```bash
git clone https://github.com/aiadam36/LunarEcho.git
cd LunarEcho
npm install
```

2. Copy `.env.example` to `.env` and fill in your values:

```
TOKEN=your_bot_token
CLIENT_ID=your_client_id
OWNER_ID=your_user_id
```

3. Register slash commands with Discord:

```bash
npm run deploy-commands
```

4. Start the bot:

```bash
node index.js
```

## Commands

| Command | Description |
|---|---|
| `/ping` | Check the bot's latency |
| `/uptime` | Show how long the bot has been online |
| `/avatar [user]` | Display a user's avatar |
| `/userinfo [user]` | Show info about a user |
| `/serverinfo` | Show info about the server |
| `/color [hex]` | Display or generate a hex color |
| `/reverse <text>` | Reverse a string |
| `/text2binary <text>` | Convert text to binary |
| `/binary2text <binary>` | Convert binary to text |
| `/8ball <question>` | Ask the magic 8-ball |
| `/coinflip` | Flip a coin |
| `/roll [dice]` | Roll dice (e.g. `2d20`) |
| `/joke [category]` | Get a random joke |
| `/meme` | Fetch a random meme |
| `/fact` | Get a random fact |
| `/quote` | Get a random inspirational quote |
| `/iplookup <ip>` | Look up an IP address |
| `/dnslookup <domain>` | Look up DNS records for a domain |
| `/whois <domain>` | Fetch WHOIS info for a domain |
| `/shorten <url>` | Shorten a URL |
| `/dictionary <word>` | Look up a word definition |
| `/ban <user>` | Ban a user (requires Ban Members) |
| `/kick <user>` | Kick a user (requires Kick Members) |
| `/warn <user> <reason>` | Warn a user (requires Moderate Members) |
| `/clear [amount]` | Delete messages (requires Manage Messages) |
| `/echo <message>` | Send a message as the bot (owner only) |
| `/nsfw <type>` | NSFW image — Age-Restricted channels only |

## Contributing

Contributions are welcome. Feel free to open an issue or submit a pull request for bug fixes, new commands, or improvements.
