<<<<<<< HEAD
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');

=======
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import jobRoutes from './routes/jobRoutes.js';

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

// Initialize Express app
>>>>>>> e97b18c25d89203b13e8c44d541c85ac4bd8eb9a
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
<<<<<<< HEAD

// Routes
app.use('/api/auth', authRoutes);

// Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
=======
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/jobs', jobRoutes);

// Health check route
app.get('/', (req, res) => {
  res.json({ message: '🚀 Job Listing Portal API is running!' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
>>>>>>> e97b18c25d89203b13e8c44d541c85ac4bd8eb9a
