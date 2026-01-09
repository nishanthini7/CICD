// index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import Routes
const hrRoutes = require('./routes/hrRoutes');
const candidate = require('./routes/candidate')
const admin = require('./routes/admin')

const app = express(); // ✅ Fix: You missed declaring `app`
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // ✅ Required to read req.body

// Routes
app.use('/hr', hrRoutes);
app.use('/candidate', candidate);
app.use('/admin', admin);
// app.use('/api/admin', adminRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ MongoDB connected');
  app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
})
.catch(err => console.error('❌ MongoDB connection failed:', err));
