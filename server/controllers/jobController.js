const Job = require('../models/Job');
const User = require('../models/User');

/**
 * @desc    Create a new job posting
 * @route   POST /api/jobs
 * @access  Private (Employer only)
 */
exports.createJob = async (req, res) => {
    try {
        // Check if user is an employer
        if (req.user.role !== 'employer') {
            return res.status(403).json({ 
                message: 'Access denied. Only employers can post jobs.' 
            });
        }

        // Extract job data from request body
        const { title, description, company, location, salary, jobType, requirements } = req.body;

        // Create new job with employer reference
        const job = new Job({
            title,
            description,
            company,
            location,
            salary,
            jobType,
            requirements,
            employer: req.user.id
        });

        // Save job to database
        await job.save();

        // Populate employer details before sending response
        await job.populate('employer', 'username email profile.companyName');

        res.status(201).json({
            success: true,
            message: 'Job posted successfully',
            job
        });
    } catch (err) {
        console.error('Error in createJob:', err);
        res.status(500).json({ 
            message: 'Server error while creating job',
            error: err.message 
        });
    }
};

/**
 * @desc    Get all job postings
 * @route   GET /api/jobs
 * @access  Public
 */
exports.getAllJobs = async (req, res) => {
    try {
        // Find all jobs and populate employer information
        const jobs = await Job.find()
            .populate('employer', 'username email profile.companyName profile.companyWebsite')
            .sort({ createdAt: -1 }); // Sort by newest first

        res.status(200).json({
            success: true,
            count: jobs.length,
            jobs
        });
    } catch (err) {
        console.error('Error in getAllJobs:', err);
        res.status(500).json({ 
            message: 'Server error while fetching jobs',
            error: err.message 
        });
    }
};

/**
 * @desc    Get jobs posted by current employer
 * @route   GET /api/jobs/my-jobs
 * @access  Private (Employer only)
 */
exports.getMyJobs = async (req, res) => {
    try {
        // Find all jobs posted by the authenticated employer
        const jobs = await Job.find({ employer: req.user.id })
            .populate('employer', 'username email profile.companyName')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: jobs.length,
            jobs
        });
    } catch (err) {
        console.error('Error in getMyJobs:', err);
        res.status(500).json({ 
            message: 'Server error while fetching your jobs',
            error: err.message 
        });
    }
};

/**
 * @desc    Get single job by ID
 * @route   GET /api/jobs/:id
 * @access  Public
 */
exports.getJobById = async (req, res) => {
    try {
        // Find job by ID and populate employer details
        const job = await Job.findById(req.params.id)
            .populate('employer', 'username email profile.companyName profile.companyWebsite profile.location');

        // Check if job exists
        if (!job) {
            return res.status(404).json({ 
                message: 'Job not found' 
            });
        }

        res.status(200).json({
            success: true,
            job
        });
    } catch (err) {
        console.error('Error in getJobById:', err);
        
        // Handle invalid ObjectId format
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ 
                message: 'Job not found - invalid ID format' 
            });
        }
        
        res.status(500).json({ 
            message: 'Server error while fetching job',
            error: err.message 
        });
    }
};

/**
 * @desc    Update a job posting
 * @route   PUT /api/jobs/:id
 * @access  Private (Job owner only)
 */
exports.updateJob = async (req, res) => {
    try {
        // Find the job by ID
        let job = await Job.findById(req.params.id);

        // Check if job exists
        if (!job) {
            return res.status(404).json({ 
                message: 'Job not found' 
            });
        }

        // Check if the authenticated user is the job owner
        if (job.employer.toString() !== req.user.id) {
            return res.status(401).json({ 
                message: 'Not authorized to update this job' 
            });
        }

        // Extract updatable fields from request body
        const { title, description, company, location, salary, jobType, requirements } = req.body;

        // Update job fields
        const updateFields = {};
        if (title !== undefined) updateFields.title = title;
        if (description !== undefined) updateFields.description = description;
        if (company !== undefined) updateFields.company = company;
        if (location !== undefined) updateFields.location = location;
        if (salary !== undefined) updateFields.salary = salary;
        if (jobType !== undefined) updateFields.jobType = jobType;
        if (requirements !== undefined) updateFields.requirements = requirements;

        // Update the job
        job = await Job.findByIdAndUpdate(
            req.params.id,
            updateFields,
            { new: true, runValidators: true }
        ).populate('employer', 'username email profile.companyName');

        res.status(200).json({
            success: true,
            message: 'Job updated successfully',
            job
        });
    } catch (err) {
        console.error('Error in updateJob:', err);
        
        // Handle invalid ObjectId format
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ 
                message: 'Job not found - invalid ID format' 
            });
        }
        
        res.status(500).json({ 
            message: 'Server error while updating job',
            error: err.message 
        });
    }
};

/**
 * @desc    Delete a job posting
 * @route   DELETE /api/jobs/:id
 * @access  Private (Job owner only)
 */
exports.deleteJob = async (req, res) => {
    try {
        // Find the job by ID
        const job = await Job.findById(req.params.id);

        // Check if job exists
        if (!job) {
            return res.status(404).json({ 
                message: 'Job not found' 
            });
        }

        // Check if the authenticated user is the job owner
        if (job.employer.toString() !== req.user.id) {
            return res.status(401).json({ 
                message: 'Not authorized to delete this job' 
            });
        }

        // Delete the job
        await Job.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: 'Job deleted successfully'
        });
    } catch (err) {
        console.error('Error in deleteJob:', err);
        
        // Handle invalid ObjectId format
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ 
                message: 'Job not found - invalid ID format' 
            });
        }
        
        res.status(500).json({ 
            message: 'Server error while deleting job',
            error: err.message 
        });
    }
};
