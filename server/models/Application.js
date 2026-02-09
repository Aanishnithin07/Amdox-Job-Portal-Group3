const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: [true, 'Job reference is required']
    },
    applicant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Applicant reference is required']
    },
    status: {
        type: String,
        enum: {
            values: ['applied', 'reviewed', 'hired', 'rejected'],
            message: '{VALUE} is not a valid application status'
        },
        default: 'applied',
        required: true
    },
    appliedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt
});

// Compound index to ensure a user can only apply to a specific job once
applicationSchema.index({ job: 1, applicant: 1 }, { unique: true });

// Index for querying applications by status
applicationSchema.index({ status: 1, appliedAt: -1 });

// Index for employer to view applications for their jobs
applicationSchema.index({ job: 1, status: 1 });

// Pre-save middleware to validate applicant is a job seeker
applicationSchema.pre('save', async function(next) {
    if (this.isNew || this.isModified('applicant')) {
        const User = mongoose.model('User');
        const applicant = await User.findById(this.applicant);
        
        if (!applicant) {
            return next(new Error('Applicant not found'));
        }
        
        if (applicant.role !== 'job_seeker') {
            return next(new Error('Only job seekers can apply for jobs'));
        }
    }
    next();
});

// Pre-save middleware to validate job exists
applicationSchema.pre('save', async function(next) {
    if (this.isNew || this.isModified('job')) {
        const Job = mongoose.model('Job');
        const job = await Job.findById(this.job);
        
        if (!job) {
            return next(new Error('Job not found'));
        }
    }
    next();
});

// Static method to check if user already applied
applicationSchema.statics.hasApplied = async function(jobId, applicantId) {
    const application = await this.findOne({ job: jobId, applicant: applicantId });
    return !!application;
};

// Static method to get application count by status
applicationSchema.statics.getCountByStatus = async function(jobId, status) {
    return await this.countDocuments({ job: jobId, status });
};

module.exports = mongoose.model('Application', applicationSchema);
