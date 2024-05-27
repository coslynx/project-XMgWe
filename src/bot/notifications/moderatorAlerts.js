// File: src/bot/notifications/moderatorAlerts.js (JavaScript)

const winston = require('winston');

const moderatorAlerts = {
  sendAlert: (message) => {
    winston.info(`Moderator Alert: ${message}`);
  },
  sendUserAction: (action, user) => {
    winston.info(`User Action: ${action} - ${user}`);
  }
};

module.exports = moderatorAlerts;