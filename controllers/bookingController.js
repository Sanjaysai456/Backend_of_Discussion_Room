const Booking = require('../models/booking.model');

// Create a new booking
const createBooking = async (req, res) => {
  try {
    const { date, slot, roomNumber } = req.body;

    // Step 1: Check if a booking already exists for that date, slot, and room
    const existingBooking = await Booking.findOne({ date, slot, roomNumber });

    if (existingBooking) {
      return res.status(400).json({
        message: '❌ This slot is already booked for the selected room.',
      });
    }

    // Step 2: Proceed to create the booking
    const newBooking = new Booking(req.body);
    await newBooking.save();

    res.status(201).json({
      message: '✅ Booking request submitted!',
      booking: newBooking,
    });

  } catch (error) {
    console.error('❌ Error creating booking:', error);
    res.status(500).json({ error: 'Failed to create booking' });
  }
};

// Get all bookings (for admin)
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (error) {
    console.error('❌ Error fetching bookings:', error);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
};

// Approve a booking

// Reject a booking


module.exports = {
  createBooking,
  getAllBookings,
  
};
