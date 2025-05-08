const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Activity title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Activity description is required'],
    trim: true
  },
  location: {
    type: String,
    required: [true, 'Activity location is required'],
    trim: true
  },
  date: {
    type: Date,
    required: [true, 'Activity date is required']
  },
  time: {
    type: String,
    required: [true, 'Activity time is required'],
    trim: true
  },
  capacity: {
    type: Number,
    default: 20
  },
  bookingsCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;