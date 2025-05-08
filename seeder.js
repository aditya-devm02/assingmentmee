const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Activity = require('./models/Activity');

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected for seeding'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Sample activities data
const activities = [
  {
    title: 'Cricket Tournament',
    description: 'Join our 5-over cricket tournament. Teams of 5 players compete in a knockout format.',
    location: 'Central Park Cricket Ground',
    date: new Date('2025-06-15'),
    time: '10:00 AM',
    capacity: 30
  },
  {
    title: 'Movie Night: Avengers Marathon',
    description: 'Watch all the Avengers movies back-to-back in our premium theater with unlimited popcorn.',
    location: 'Cineplex Downtown',
    date: new Date('2025-06-20'),
    time: '6:00 PM',
    capacity: 50
  },
  {
    title: 'Football Friendly Match',
    description: 'Casual 5-a-side football match. All skill levels welcome.',
    location: 'Sports Complex Field 3',
    date: new Date('2025-06-12'),
    time: '5:00 PM',
    capacity: 20
  },
  {
    title: 'Tennis Tournament',
    description: 'Singles tennis tournament. Bring your own racket.',
    location: 'City Tennis Courts',
    date: new Date('2025-06-18'),
    time: '9:00 AM',
    capacity: 16
  },
  {
    title: 'Yoga in the Park',
    description: 'Outdoor yoga session for all levels. Bring your own mat.',
    location: 'Riverside Park',
    date: new Date('2025-06-14'),
    time: '7:00 AM',
    capacity: 25
  }
];

// Import data into database
const importData = async () => {
  try {
    // Clear existing data
    await Activity.deleteMany();
    
    // Import activities
    await Activity.insertMany(activities);
    
    console.log('Data imported successfully');
    process.exit();
  } catch (error) {
    console.error('Error importing data:', error);
    process.exit(1);
  }
};

// Delete all data from database
const deleteData = async () => {
  try {
    await Activity.deleteMany();
    
    console.log('Data deleted successfully');
    process.exit();
  } catch (error) {
    console.error('Error deleting data:', error);
    process.exit(1);
  }
};

// Determine which operation to run based on command line arguments
if (process.argv[2] === '-d') {
  deleteData();
} else {
  importData();
}