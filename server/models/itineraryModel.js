const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Describe an itinerary
const itinerarySchema = new Schema({
  itinerary_name: {
    type: String,
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  start_date: {
    type: Date,
    required: true
  },
  end_date: {
    type: Date,
    required: true
  },
  // Can someone review the syntax for this? -ak
  activities: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Activity'
    }
  ]
});

module.exports = mongoose.model('Itinerary', itinerarySchema);
