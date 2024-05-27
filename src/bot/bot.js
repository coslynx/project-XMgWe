// File: src/bot/bot.js (JavaScript)

const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const moderation = require('./commands/moderation');
const settings = require('./commands/settings');
const spamFilter = require('./filters/spamFilter');
const profanityFilter = require('./filters/profanityFilter');
const warn = require('./actions/warn');
const mute = require('./actions/mute');
const kick = require('./actions/kick');
const moderatorAlerts = require('./notifications/moderatorAlerts');
const userActions = require('./notifications/userActions');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  // Filter out spam and profanity
  if (spamFilter.detectSpam(message.content)) {
    moderation.removeMessage(message);
    return;
  }
  if (profanityFilter.detectProfanity(message.content)) {
    moderation.warnUser(message.author);
    return;
  }

  // Handle commands
  if (message.content.startsWith('!warn')) {
    warn.warnUser(message.mentions.users.first());
  } else if (message.content.startsWith('!mute')) {
    mute.muteUser(message.mentions.users.first());
  } else if (message.content.startsWith('!kick')) {
    kick.kickUser(message.mentions.users.first());
  }
});

client.on('guildMemberAdd', (member) => {
  userActions.notifyUserJoin(member);
});

client.login(process.env.DISCORD_TOKEN);