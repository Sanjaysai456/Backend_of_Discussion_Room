const express = require('express');
const router = express.Router();

const {
    createBooking,
    getAllBookings,
    
} = require('../controllers/bookingController');

// Create booking
router.post('/', createBooking);

// Get all bookings
router.get('/', getAllBookings);




module.exports = router;
