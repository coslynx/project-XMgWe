// moderationLog.js (JavaScript)

const mongoose = require('mongoose');

const moderationLogSchema = new mongoose.Schema({
  action: {
    type: String,
    required: true
  },
  user: {
    type: String,
    required: true
  },
  reason: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const ModerationLog = mongoose.model('ModerationLog', moderationLogSchema);

module.exports = ModerationLog;