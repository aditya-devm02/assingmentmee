const Activity = require('../models/Activity');

// @desc    Get all activities
// @route   GET /api/activities
// @access  Public
const getActivities = async (req, res) => {
  try {
    // Fetch all activities with pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const activities = await Activity.find()
      .sort({ date: 1 })
      .skip(skip)
      .limit(limit);

    const totalActivities = await Activity.countDocuments();

    res.status(200).json({
      success: true,
      count: activities.length,
      total: totalActivities,
      totalPages: Math.ceil(totalActivities / limit),
      currentPage: page,
      activities
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

// @desc    Get single activity
// @route   GET /api/activities/:id
// @access  Public
const getActivity = async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);

    if (!activity) {
      return res.status(404).json({
        success: false,
        message: 'Activity not found'
      });
    }

    res.status(200).json({
      success: true,
      activity
    });
  } catch (error) {
    console.error(error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Activity not found'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Create new activity (for admin purposes)
// @route   POST /api/activities
// @access  Private (ideally admin only, but for this assignment we'll use auth)
const createActivity = async (req, res) => {
  try {
    const { title, description, location, date, time, capacity } = req.body;

    const activity = await Activity.create({
      title,
      description,
      location,
      date,
      time,
      capacity: capacity || 20
    });

    res.status(201).json({
      success: true,
      activity
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
  getActivities,
  getActivity,
  createActivity
};