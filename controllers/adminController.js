// controllers/admin.controller.js
const Admin = require('../models/admin.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Booking = require('../models/booking.model');
const sendStatusEmail = require('../utils/mailer'); // Adjust the path as necessary

const SECRET_KEY = process.env.JWT_SECRET || 'secretkey';
exports.approveBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const updated = await Booking.findByIdAndUpdate(
      bookingId,
      { status: 'Approved' },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    // ✅ Send status email to leader
    console.log('Sending approval email to:', updated.leaderEmail);
    await sendStatusEmail(updated.leaderEmail, 'Approved', updated.leaderName, updated.slot);

    res.status(200).json({ message: 'Booking approved', booking: updated });
  } catch (error) {
    console.error('❌ Error approving booking:', error);
    res.status(500).json({ error: 'Failed to approve booking' });
  }
};

exports.rejectBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const updated = await Booking.findByIdAndUpdate(
      bookingId,
      { status: 'Rejected' },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    // ✅ Send status email to leader
    await sendStatusEmail(updated.leaderEmail, 'Rejected');

    res.status(200).json({ message: 'Booking rejected', booking: updated });
  } catch (error) {
    console.error('❌ Error rejecting booking:', error);
    res.status(500).json({ error: 'Failed to reject booking' });
  }
};


// Admin Register
exports.adminRegister = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if username already exists
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({ username, password: hashedPassword });
    await newAdmin.save();

    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Registration failed', error: err });
  }
};

// Existing login method remains
exports.adminLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(401).json({ message: 'Admin not found' });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid password' });

    const token = jwt.sign({ id: admin._id }, SECRET_KEY, { expiresIn: '7d' });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error });
  }
};
