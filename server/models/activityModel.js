const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//Describes an activity
const activitySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  }
}, {timestamps: true});

module.exports = mongoose.model('Activity', activitySchema);


//1430
// { '02:30pm' } comes from frontend -> in backend this is saved as amOrPm = req.body.slice(5)
//let time = 0
// if (amOrPm === 'pm') time += 12
// take value of string from index 0 to 4 and add that to time


