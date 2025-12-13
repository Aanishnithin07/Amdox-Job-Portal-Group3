import express from 'express';

const router = express.Router();

// @route   GET /api/jobs/
// @desc    Test job route
// @access  Public
router.get('/', (req, res) => {
  res.json({ message: '✅ Job route working' });
});

export default router;
