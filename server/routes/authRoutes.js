<<<<<<< HEAD
const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

// @route POST /api/auth/register
router.post('/register', register);

// @route POST /api/auth/login
router.post('/login', login);

module.exports = router;
=======
import express from 'express';

const router = express.Router();

// @route   GET /api/auth/
// @desc    Test auth route
// @access  Public
router.get('/', (req, res) => {
  res.json({ message: '✅ Auth route working' });
});

export default router;
>>>>>>> e97b18c25d89203b13e8c44d541c85ac4bd8eb9a
