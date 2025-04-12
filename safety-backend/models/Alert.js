const mongoose = require('mongoose');

const AlertSchema = new mongoose.Schema({
  latitude: Number,
  longitude: Number,
  timestamp: { type: Date, default: Date.now },
  mediaUrl: String, // optional field
  userId: String,
});

module.exports = mongoose.model('Alert', AlertSchema);
