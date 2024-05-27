// File: src/bot/commands/moderation.js (JavaScript)

const { Client, Intents } = require('discord.js');
const { moderationSettings } = require('../../config/moderationSettings');
const { warnUser, muteUser, kickUser } = require('../actions/actions');
const { logModerationAction } = require('../../data/models/moderationLog');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once('ready', () => {
  console.log('Moderation bot is online!');
});

client.on('messageCreate', async (message) => {
  // Automated message filtering
  if (message.author.bot) return; // Ignore messages from other bots

  // Check for spam
  if (message.content.length > moderationSettings.spamThreshold) {
    // Remove message and warn user
    await message.delete();
    await warnUser(message.author, 'Spamming');
    await logModerationAction('Spam', message.author);
  }

  // Check for profanity
  if (moderationSettings.profanityList.some(word => message.content.toLowerCase().includes(word))) {
    // Remove message and warn user
    await message.delete();
    await warnUser(message.author, 'Using Profanity');
    await logModerationAction('Profanity', message.author);
  }
});

client.on('messageDelete', async (message) => {
  // Log deleted messages
  await logModerationAction('Message Deleted', message.author);
});

client.on('messageUpdate', async (oldMessage, newMessage) => {
  // Log message edits
  await logModerationAction('Message Edited', newMessage.author);
});

client.on('guildMemberAdd', async (member) => {
  // Welcome message
  const welcomeMessage = `Welcome to the server, ${member.user.username}! Please read the rules.`;
  await member.send(welcomeMessage);
});

client.login(process.env.DISCORD_TOKEN);