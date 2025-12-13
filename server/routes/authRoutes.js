import express from 'express';

const router = express.Router();

// @route   GET /api/auth/
// @desc    Test auth route
// @access  Public
router.get('/', (req, res) => {
  res.json({ message: '✅ Auth route working' });
});

export default router;
