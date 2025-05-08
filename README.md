# Activity Booking App API

A RESTful API for a basic activity booking application. This API allows users to register, log in, view activities, book activities, and view their bookings.

## Features

- User authentication (register, login) with JWT
- Public endpoints for viewing available activities
- Protected endpoints for booking activities and viewing bookings
- Password hashing with bcrypt
- Input validation with Joi
- Clean code architecture with routes, controllers, and models
- MongoDB database integration
- Error handling and validation

## Technologies Used

- Node.js with Express.js
- MongoDB with Mongoose ODM
- JWT for authentication
- bcrypt for password hashing
- Joi for request validation

## Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/activity-booking-app.git
   cd activity-booking-app
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Configure environment variables
   ```
   cp .env.example .env
   ```
   Then edit the `.env` file with your MongoDB connection string and JWT secret

4. Seed the database with sample activities
   ```
   npm run seed
   ```

5. Start the server
   ```
   npm start
   ```
   For development with auto-restart:
   ```
   npm run dev
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user profile (protected)

### Activities
- `GET /api/activities` - Get all activities (public)
- `GET /api/activities/:id` - Get a single activity (public)
- `POST /api/activities` - Create a new activity (protected)

### Bookings
- `POST /api/bookings` - Book an activity (protected)
- `GET /api/bookings` - Get all bookings for the logged-in user (protected)
- `PUT /api/bookings/:id/cancel` - Cancel a booking (protected)

## API Documentation

Please refer to the included Postman collection for detailed API documentation and examples.

## Request & Response Examples

### Register User

Request:
```json
POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "phoneNumber": "1234567890",
  "password": "password123"
}
```

Response:
```json
{
  "success": true,
  "user": {
    "id": "5f9d7a3b9d3f2c0e8c1c5e0a",
    "name": "John Doe",
    "email": "john@example.com",
    "phoneNumber": "1234567890"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### List Activities

Request:
```
GET /api/activities
```

Response:
```json
{
  "success": true,
  "count": 5,
  "total": 5,
  "totalPages": 1,
  "currentPage": 1,
  "activities": [
    {
      "_id": "5f9d7a3b9d3f2c0e8c1c5e0b",
      "title": "Cricket Tournament",
      "description": "Join our 5-over cricket tournament. Teams of 5 players compete in a knockout format.",
      "location": "Central Park Cricket Ground",
      "date": "2025-06-15T00:00:00.000Z",
      "time": "10:00 AM",
      "capacity": 30,
      "bookingsCount": 0,
      "createdAt": "2025-05-08T10:12:15.123Z",
      "updatedAt": "2025-05-08T10:12:15.123Z"
    },
    // ... more activities
  ]
}
```

### Book an Activity

Request:
```json
POST /api/bookings
Authorization: Bearer <token>
{
  "activityId": "5f9d7a3b9d3f2c0e8c1c5e0b"
}
```

Response:
```json
{
  "success": true,
  "message": "Activity booked successfully",
  "booking": {
    "_id": "5f9d7a3b9d3f2c0e8c1c5e0c",
    "user": "5f9d7a3b9d3f2c0e8c1c5e0a",
    "activity": {
      "_id": "5f9d7a3b9d3f2c0e8c1c5e0b",
      "title": "Cricket Tournament",
      "description": "Join our 5-over cricket tournament. Teams of 5 players compete in a knockout format.",
      "location": "Central Park Cricket Ground",
      "date": "2025-06-15T00:00:00.000Z",
      "time": "10:00 AM",
      "capacity": 30,
      "bookingsCount": 1,
      "createdAt": "2025-05-08T10:12:15.123Z",
      "updatedAt": "2025-05-08T10:12:15.123Z"
    },
    "bookingDate": "2025-05-08T10:25:36.789Z",
    "status": "confirmed",
    "createdAt": "2025-05-08T10:25:36.789Z",
    "updatedAt": "2025-05-08T10:25:36.789Z"
  }
}
```

## Deployment

This API can be deployed to platforms like Vercel, Render, or Cyclic. Update the `.env` file with your production MongoDB URI before deploying.

## Future Improvements

- Add user roles (admin, regular user)
- Implement email confirmation for user registration
- Add activity categories and search functionality
- Implement notification system for upcoming bookings
- Add payment integration

## License

MIT
