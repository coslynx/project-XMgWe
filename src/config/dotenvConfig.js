// Filename: src/config/dotenvConfig.js

require('dotenv').config();

// Set environment variables for Discord API token and other sensitive information
process.env.DISCORD_TOKEN = 'your_discord_token_here';
process.env.MONGODB_URI = 'your_mongodb_uri_here';

module.exports = {
  discordToken: process.env.DISCORD_TOKEN,
  mongoURI: process.env.MONGODB_URI
};