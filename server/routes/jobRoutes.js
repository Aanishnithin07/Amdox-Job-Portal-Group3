const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    createJob,
    getAllJobs,
    getMyJobs,
    getJobById,
    updateJob,
    deleteJob
} = require('../controllers/jobController');

// @route   GET /api/jobs
// @desc    Get all job postings
// @access  Public
router.get('/', getAllJobs);

// @route   GET /api/jobs/my-jobs
// @desc    Get jobs posted by current employer
// @access  Private (Employer only)
router.get('/my-jobs', protect, getMyJobs);

// @route   GET /api/jobs/:id
// @desc    Get single job by ID
// @access  Public
router.get('/:id', getJobById);

// @route   POST /api/jobs
// @desc    Create a new job posting
// @access  Private (Employer only)
router.post('/', protect, createJob);

// @route   PUT /api/jobs/:id
// @desc    Update a job posting
// @access  Private (Job owner only)
router.put('/:id', protect, updateJob);

// @route   DELETE /api/jobs/:id
// @desc    Delete a job posting
// @access  Private (Job owner only)
router.delete('/:id', protect, deleteJob);

module.exports = router;
