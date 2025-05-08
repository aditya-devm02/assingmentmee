const Booking = require('../models/Booking');
const Activity = require('../models/Activity');
const mongoose = require('mongoose');

// @desc    Book an activity
// @route   POST /api/bookings
// @access  Private
const bookActivity = async (req, res) => {
  try {
    const { activityId } = req.body;
    const userId = req.user.id;

    // Check if activity exists
    const activity = await Activity.findById(activityId);
    if (!activity) {
      return res.status(404).json({
        success: false,
        message: 'Activity not found'
      });
    }

    // Check if user has already booked this activity
    const existingBooking = await Booking.findOne({
      user: userId,
      activity: activityId,
      status: 'confirmed'
    });

    if (existingBooking) {
      return res.status(400).json({
        success: false,
        message: 'You have already booked this activity'
      });
    }

    // Check if activity is at capacity
    if (activity.bookingsCount >= activity.capacity) {
      return res.status(400).json({
        success: false,
        message: 'This activity is fully booked'
      });
    }

    // Create booking
    const booking = await Booking.create({
      user: userId,
      activity: activityId
    });

    // Increment bookingsCount in the activity
    await Activity.findByIdAndUpdate(activityId, {
      $inc: { bookingsCount: 1 }
    });

    // Populate the activity details in the response
    await booking.populate('activity');

    res.status(201).json({
      success: true,
      message: 'Activity booked successfully',
      booking
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get user's bookings
// @route   GET /api/bookings
// @access  Private
const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate('activity')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      bookings
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Cancel a booking
// @route   PUT /api/bookings/:id/cancel
// @access  Private
const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Check if booking belongs to user
    if (booking.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to cancel this booking'
      });
    }

    // Check if booking is already cancelled
    if (booking.status === 'cancelled') {
      return res.status(400).json({
        success: false,
        message: 'This booking is already cancelled'
      });
    }

    // Update booking status
    booking.status = 'cancelled';
    await booking.save();

    // Decrement bookingsCount in the activity
    await Activity.findByIdAndUpdate(booking.activity, {
      $inc: { bookingsCount: -1 }
    });

    res.status(200).json({
      success: true,
      message: 'Booking cancelled successfully',
      booking
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

module.exports = {
  bookActivity,
  getUserBookings,
  cancelBooking
};