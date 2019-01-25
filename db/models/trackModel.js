const mongoose = require('mongoose');

const trackSchema = new mongoose.Schema({
  name: { type: String },
  url: {
    required: true,
    type: String,
  },
});

const Track = mongoose.model('Track', trackSchema);

module.exports = Track;
