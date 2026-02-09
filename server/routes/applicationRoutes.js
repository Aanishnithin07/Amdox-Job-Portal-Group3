const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    applyToJob,
    getJobApplicants,
    getMyApplications,
    updateApplicationStatus,
    deleteApplication
} = require('../controllers/applicationController');

// @route   POST /api/applications/:jobId
// @desc    Apply to a job
// @access  Private (Job Seekers only)
router.post('/:jobId', protect, applyToJob);

// @route   GET /api/applications/job/:jobId
// @desc    Get all applicants for a specific job
// @access  Private (Employer - Job owner only)
router.get('/job/:jobId', protect, getJobApplicants);

// @route   GET /api/applications/my-applications
// @desc    Get all applications submitted by current user
// @access  Private (Job Seekers)
router.get('/my-applications', protect, getMyApplications);

// @route   PUT /api/applications/:id/status
// @desc    Update application status (reviewed, hired, rejected)
// @access  Private (Employer - Job owner only)
router.put('/:id/status', protect, updateApplicationStatus);

// @route   DELETE /api/applications/:id
// @desc    Withdraw/delete an application
// @access  Private (Applicant only)
router.delete('/:id', protect, deleteApplication);

module.exports = router;
