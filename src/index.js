// index.js

// Import necessary modules
const Discord = require('discord.js');
const { Client, Intents } = Discord;
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const dotenv = require('dotenv');
const { config } = dotenv;
const { connectToDatabase } = require('./data/database');
const { setupBotCommands } = require('./bot/commands/moderation');
const { setupBotSettings } = require('./bot/commands/settings');
const { setupFilters } = require('./bot/filters/spamFilter');
const { setupProfanityFilter } = require('./bot/filters/profanityFilter');
const { setupActions } = require('./bot/actions/warn');
const { setupMuteAction } = require('./bot/actions/mute');
const { setupKickAction } = require('./bot/actions/kick');
const { setupNotifications } = require('./bot/notifications/moderatorAlerts');
const { setupUserActions } = require('./bot/notifications/userActions');
const { setupLogger } = require('./util/logger');
const { setupServer } = require('./server/server');
const { setupModerationLogModel } = require('./data/models/moderationLog');
const { setupModerationSettings } = require('./config/moderationSettings');
const { setupDotenvConfig } = require('./config/dotenvConfig');

// Load environment variables
config();

// Setup database connection
connectToDatabase();

// Setup moderation log model
setupModerationLogModel();

// Setup moderation settings
setupModerationSettings();

// Setup dotenv configuration
setupDotenvConfig();

// Setup bot commands
setupBotCommands();

// Setup bot settings
setupBotSettings();

// Setup filters
setupFilters();

// Setup profanity filter
setupProfanityFilter();

// Setup actions
setupActions();

// Setup mute action
setupMuteAction();

// Setup kick action
setupKickAction();

// Setup notifications
setupNotifications();

// Setup user actions
setupUserActions();

// Setup logger
setupLogger();

// Setup server
setupServer();

// Login to Discord
client.login(process.env.DISCORD_TOKEN);