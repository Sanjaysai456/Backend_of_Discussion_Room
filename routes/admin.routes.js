const express = require("express");
const router = express.Router();
const {
  adminRegister,
  adminLogin,
  approveBooking,
  rejectBooking,
} = require("../controllers/adminController");
const authMiddleware = require("../middlewares/auth");

// Admin Auth Routes
router.post("/register", adminRegister);
router.post("/login", adminLogin);

// Protected Admin Routes
router.put("/bookings/:id/approve", authMiddleware, approveBooking);
router.put("/bookings/:id/reject", authMiddleware, rejectBooking);

module.exports = router;
