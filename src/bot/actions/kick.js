// File: src/bot/actions/kick.js (JavaScript)

const { Client, Intents, Collection } = require('discord.js');
const { token } = require('../../../config/dotenvConfig');
const { kickUser } = require('../../util/messaging');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.once('ready', () => {
  console.log('Bot is ready for kicking users.');
});

client.on('messageCreate', async (message) => {
  if (message.content.startsWith('!kick')) {
    const member = message.mentions.members.first();
    if (member) {
      try {
        await kickUser(member);
        message.reply(`${member.user.tag} has been kicked successfully.`);
      } catch (error) {
        console.error('Error kicking user:', error);
        message.reply('There was an error kicking the user.');
      }
    } else {
      message.reply('Please mention a user to kick.');
    }
  }
});

client.login(token);