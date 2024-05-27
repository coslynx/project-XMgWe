// File: src/data/database.js (JavaScript)

const mongoose = require('mongoose');

// MongoDB connection URL
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

const db = mongoose.connection;

// Check MongoDB connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Define the schema for moderation log
const moderationLogSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  action: { type: String, required: true },
  reason: { type: String },
  timestamp: { type: Date, default: Date.now }
});

// Create model for moderation log
const ModerationLog = mongoose.model('ModerationLog', moderationLogSchema);

module.exports = { ModerationLog };