// File: src/bot/actions/mute.js (JavaScript)

const { Client } = require('discord.js');
const { muteUser } = require('../../util/muteUtils');
const { logger } = require('../../util/logger');

/**
 * Mute a user in the Discord server.
 * @param {Client} client - The Discord client
 * @param {Message} message - The message that triggered the command
 * @param {Array} args - The command arguments
 */
const mute = async (client, message, args) => {
    try {
        // Check if the user has permission to mute members
        if (!message.member.hasPermission('MANAGE_ROLES')) {
            return message.reply('You do not have permission to use this command.');
        }

        // Get the user to be muted
        const user = message.mentions.users.first();
        if (!user) {
            return message.reply('Please mention the user you want to mute.');
        }

        // Mute the user
        await muteUser(user);

        // Send a confirmation message
        message.channel.send(`${user.tag} has been muted.`);
        
        // Log the mute action
        logger.info(`${user.tag} has been muted by ${message.author.tag}`);
    } catch (error) {
        logger.error(`Error in mute command: ${error.message}`);
        message.reply('An error occurred while trying to mute the user.');
    }
};

module.exports = mute;