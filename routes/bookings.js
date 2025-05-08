const express = require('express');
const router = express.Router();
const { bookActivity, getUserBookings, cancelBooking } = require('../controllers/bookings');
const { protect } = require('../middleware/auth');
const { validateBooking } = require('../middleware/validator');

// Book an activity
router.post('/', protect, validateBooking, bookActivity);

// Get user's bookings
router.get('/', protect, getUserBookings);

// Cancel a booking
router.put('/:id/cancel', protect, cancelBooking);

module.exports = router;