const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema({
  name: String,
  enrollmentNo: String,
  email: String,
});


const bookingSchema = new mongoose.Schema({
  leaderName: {
    type: String,
    required: true,
  },
  leaderEnrollmentNo: {
    type: String,
    required: true,
  },
  leaderEmail: {
    type: String,
    required: true,
  },
  roomNumber: {
    type: Number,
    enum: [1, 2],
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  slot: {
    type: String,
    required: true,
    enum: [
      "09:30 AM - 10:30 AM",
      "10:30 AM - 11:30 AM",
      "11:30 AM - 12:30 PM",
      "12:30 PM - 01:30 PM",
      "01:30 PM - 02:30 PM",
      "02:30 PM - 03:30 PM",
      "03:30 PM - 04:30 PM",
      "04:30 PM - 05:30 PM"
    ]
  },
  teamMembers: [teamMemberSchema],
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;