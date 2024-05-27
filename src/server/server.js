// server.js (JavaScript)

const express = require('express');
const { Client, Intents } = require('discord.js');
const winston = require('winston');
const { createLogger, format, transports } = winston;
const { combine, timestamp, label, prettyPrint } = format;
const { MongoClient } = require('mongodb');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

const discordClient = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const logger = createLogger({
  level: 'info',
  format: combine(
    label({ label: 'discord-moderation-bot' }),
    timestamp(),
    prettyPrint()
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'error.log', level: 'error' })
  ]
});

const mongoClient = new MongoClient(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/', (req, res) => {
  res.send('Discord Moderation Bot is running!');
});

discordClient.on('ready', () => {
  logger.info('Discord Bot is ready.');
});

discordClient.login(process.env.DISCORD_TOKEN);

mongoClient.connect((err) => {
  if (err) {
    logger.error(`MongoDB connection error: ${err}`);
  } else {
    logger.info('Connected to MongoDB');
  }
});

app.listen(port, () => {
  logger.info(`Server is running on http://localhost:${port}`);
});