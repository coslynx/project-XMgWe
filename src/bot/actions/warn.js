// File: src/bot/actions/warn.js (JavaScript)

const { MessageEmbed } = require('discord.js');
const { logger } = require('../../util/logger');

const warnUser = async (message, user, reason) => {
  try {
    // Logic to warn the user
    const warnEmbed = new MessageEmbed()
      .setColor('#ff0000')
      .setTitle('You have been warned!')
      .setDescription(`Reason: ${reason}`)
      .setTimestamp();

    await user.send({ embeds: [warnEmbed] });
    logger.info(`User ${user.username} has been warned for: ${reason}`);

    return `User ${user.username} has been warned for: ${reason}`;
  } catch (error) {
    logger.error(`Error warning user: ${error.message}`);
    return 'An error occurred while warning the user.';
  }
};

module.exports = { warnUser };