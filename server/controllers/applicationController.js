const Application = require('../models/Application');
const Job = require('../models/Job');

/**
 * @desc    Apply to a job
 * @route   POST /api/applications/:jobId
 * @access  Private (Job Seekers only)
 */
exports.applyToJob = async (req, res) => {
    try {
        const { jobId } = req.params;

        // Check if job exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ 
                message: 'Job not found' 
            });
        }

        // Check if user has already applied to this job
        const existingApplication = await Application.findOne({
            job: jobId,
            applicant: req.user.id
        });

        if (existingApplication) {
            return res.status(400).json({ 
                message: 'You have already applied to this job' 
            });
        }

        // Create new application
        const application = new Application({
            job: jobId,
            applicant: req.user.id
        });

        await application.save();

        // Populate applicant and job details before sending response
        await application.populate('applicant', 'username email profile');
        await application.populate('job', 'title company location jobType');

        res.status(201).json({
            success: true,
            message: 'Application submitted successfully',
            application
        });
    } catch (err) {
        console.error('Error in applyToJob:', err);
        
        // Handle duplicate application error (if compound index catches it)
        if (err.code === 11000) {
            return res.status(400).json({ 
                message: 'You have already applied to this job' 
            });
        }
        
        // Handle invalid ObjectId format
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ 
                message: 'Job not found - invalid ID format' 
            });
        }
        
        res.status(500).json({ 
            message: 'Server error while submitting application',
            error: err.message 
        });
    }
};

/**
 * @desc    Get all applicants for a specific job
 * @route   GET /api/applications/job/:jobId
 * @access  Private (Employer - Job owner only)
 */
exports.getJobApplicants = async (req, res) => {
    try {
        const { jobId } = req.params;

        // Find the job and verify it exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ 
                message: 'Job not found' 
            });
        }

        // Security check: Verify that the authenticated user is the job's employer
        if (job.employer.toString() !== req.user.id) {
            return res.status(403).json({ 
                message: 'Not authorized to view applicants for this job' 
            });
        }

        // Find all applications for this job
        const applications = await Application.find({ job: jobId })
            .populate('applicant', 'username email profile.bio profile.location profile.skills profile.experienceLevel profile.resumeUrl')
            .sort({ appliedAt: -1 }); // Sort by newest first

        res.status(200).json({
            success: true,
            count: applications.length,
            jobTitle: job.title,
            applications
        });
    } catch (err) {
        console.error('Error in getJobApplicants:', err);
        
        // Handle invalid ObjectId format
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ 
                message: 'Job not found - invalid ID format' 
            });
        }
        
        res.status(500).json({ 
            message: 'Server error while fetching applicants',
            error: err.message 
        });
    }
};

/**
 * @desc    Get all applications submitted by current user
 * @route   GET /api/applications/my-applications
 * @access  Private (Job Seekers)
 */
exports.getMyApplications = async (req, res) => {
    try {
        // Find all applications submitted by the authenticated user
        const applications = await Application.find({ applicant: req.user.id })
            .populate('job', 'title company location jobType salary status')
            .populate({
                path: 'job',
                populate: {
                    path: 'employer',
                    select: 'username email profile.companyName profile.companyWebsite'
                }
            })
            .sort({ appliedAt: -1 }); // Sort by newest first

        res.status(200).json({
            success: true,
            count: applications.length,
            applications
        });
    } catch (err) {
        console.error('Error in getMyApplications:', err);
        res.status(500).json({ 
            message: 'Server error while fetching your applications',
            error: err.message 
        });
    }
};

/**
 * @desc    Update application status (for employers)
 * @route   PUT /api/applications/:id/status
 * @access  Private (Employer - Job owner only)
 */
exports.updateApplicationStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        // Validate status
        const validStatuses = ['applied', 'reviewed', 'hired', 'rejected'];
        if (!status || !validStatuses.includes(status)) {
            return res.status(400).json({ 
                message: 'Invalid status. Must be one of: applied, reviewed, hired, rejected' 
            });
        }

        // Find the application
        const application = await Application.findById(id).populate('job');
        if (!application) {
            return res.status(404).json({ 
                message: 'Application not found' 
            });
        }

        // Security check: Verify the authenticated user is the job's employer
        if (application.job.employer.toString() !== req.user.id) {
            return res.status(403).json({ 
                message: 'Not authorized to update this application' 
            });
        }

        // Update application status
        application.status = status;
        await application.save();

        // Populate details before sending response
        await application.populate('applicant', 'username email profile');

        res.status(200).json({
            success: true,
            message: `Application status updated to ${status}`,
            application
        });
    } catch (err) {
        console.error('Error in updateApplicationStatus:', err);
        
        // Handle invalid ObjectId format
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ 
                message: 'Application not found - invalid ID format' 
            });
        }
        
        res.status(500).json({ 
            message: 'Server error while updating application status',
            error: err.message 
        });
    }
};

/**
 * @desc    Delete/withdraw an application
 * @route   DELETE /api/applications/:id
 * @access  Private (Applicant only)
 */
exports.deleteApplication = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the application
        const application = await Application.findById(id);
        if (!application) {
            return res.status(404).json({ 
                message: 'Application not found' 
            });
        }

        // Security check: Verify the authenticated user is the applicant
        if (application.applicant.toString() !== req.user.id) {
            return res.status(403).json({ 
                message: 'Not authorized to delete this application' 
            });
        }

        // Delete the application
        await Application.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: 'Application withdrawn successfully'
        });
    } catch (err) {
        console.error('Error in deleteApplication:', err);
        
        // Handle invalid ObjectId format
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ 
                message: 'Application not found - invalid ID format' 
            });
        }
        
        res.status(500).json({ 
            message: 'Server error while deleting application',
            error: err.message 
        });
    }
};
