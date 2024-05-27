// File: profanityFilter.js (JavaScript)

const { Client } = require('discord.js');
const fetch = require('node-fetch');
const { logger } = require('../../util/logger');

const profanityFilter = {
  async filterProfanity(message) {
    try {
      const profanityList = await this.fetchProfanityList();
      const messageContent = message.content.toLowerCase();

      for (const profanity of profanityList) {
        if (messageContent.includes(profanity)) {
          await message.delete();
          logger.info(`Profanity '${profanity}' removed from message: ${messageContent}`);
          break;
        }
      }
    } catch (error) {
      logger.error(`Error filtering profanity: ${error.message}`);
    }
  },

  async fetchProfanityList() {
    try {
      const response = await fetch('https://example.com/profanityList');
      const profanityList = await response.json();

      return profanityList;
    } catch (error) {
      logger.error(`Error fetching profanity list: ${error.message}`);
      return [];
    }
  }
};

module.exports = profanityFilter;