const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const bookingRoutes = require('./routes/booking.routes');
const adminRoutes = require('./routes/admin.routes');

const app = express();
const PORT = 5000;
const HOST = '0.0.0.0'

app.use(cors());

app.use(cors({
  origin: ['http://localhost:5173'], // or add deployed frontend domain later
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));
app.use(express.json());


// Connect routes
app.use('/api/bookings', bookingRoutes);
app.use('/api/admin' , adminRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ MongoDB connected');
  app.listen(PORT , HOST, () => console.log(`🚀 Server running on port ${PORT}`));
})
.catch((err) => console.error('❌ MongoDB connection failed:', err));
