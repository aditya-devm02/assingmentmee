const express = require('express');
const router = express.Router();
const { getActivities, getActivity, createActivity } = require('../controllers/activities');
const { protect } = require('../middleware/auth');

// Get all activities (public)
router.get('/', getActivities);

// Get single activity (public)
router.get('/:id', getActivity);

// Create activity (private - for testing purposes)
router.post('/', protect, createActivity);

module.exports = router;