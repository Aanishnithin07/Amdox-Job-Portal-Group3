import express from 'express';

const router = express.Router();

// @route   GET /api/profile/
// @desc    Test profile route
// @access  Public
router.get('/', (req, res) => {
  res.json({ message: '✅ Profile route working' });
});

export default router;
