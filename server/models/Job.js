const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Job title is required'],
        trim: true,
        maxlength: [100, 'Job title cannot exceed 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Job description is required'],
        trim: true,
        maxlength: [5000, 'Description cannot exceed 5000 characters']
    },
    company: {
        type: String,
        required: [true, 'Company name is required'],
        trim: true,
        maxlength: [100, 'Company name cannot exceed 100 characters']
    },
    location: {
        type: String,
        required: [true, 'Job location is required'],
        trim: true,
        maxlength: [100, 'Location cannot exceed 100 characters']
    },
    salary: {
        type: Number,
        min: [0, 'Salary cannot be negative'],
        default: null
    },
    jobType: {
        type: String,
        enum: {
            values: ['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote'],
            message: '{VALUE} is not a valid job type'
        },
        default: 'Full-time',
        required: true
    },
    requirements: {
        type: [String],
        default: [],
        validate: {
            validator: function(arr) {
                return arr.length <= 20;
            },
            message: 'Cannot have more than 20 requirements'
        }
    },
    employer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Employer reference is required']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt
});

// Index for faster queries
jobSchema.index({ employer: 1, createdAt: -1 });
jobSchema.index({ title: 'text', description: 'text', company: 'text' }); // Text search index

// Virtual for formatting salary display
jobSchema.virtual('salaryFormatted').get(function() {
    if (!this.salary) return 'Negotiable';
    return `$${this.salary.toLocaleString()}`;
});

// Pre-save middleware to validate employer role
jobSchema.pre('save', async function(next) {
    if (this.isNew || this.isModified('employer')) {
        const User = mongoose.model('User');
        const employer = await User.findById(this.employer);
        
        if (!employer) {
            return next(new Error('Employer not found'));
        }
        
        if (employer.role !== 'employer') {
            return next(new Error('Only employers can post jobs'));
        }
    }
    next();
});

module.exports = mongoose.model('Job', jobSchema);
