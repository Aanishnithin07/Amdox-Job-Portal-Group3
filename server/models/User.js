const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true,
        trim: true
    },
    email: { 
        type: String, 
        required: true, 
        unique: true,
        lowercase: true,
        trim: true
    },
    password: { 
        type: String, 
        required: true 
    },
    role: {
        type: String,
        enum: ['job_seeker', 'employer'],
        default: 'job_seeker',
        required: true
    },
    profile: {
        // Common fields for both roles
        bio: {
            type: String,
            maxlength: 500
        },
        location: {
            type: String,
            trim: true
        },
        
        // Job Seeker specific fields
        resumeUrl: {
            type: String,
            trim: true
        },
        skills: {
            type: [String],
            default: []
        },
        experienceLevel: {
            type: String,
            enum: ['entry', 'mid', 'senior', 'lead', ''],
            default: ''
        },
        
        // Employer specific fields
        companyName: {
            type: String,
            trim: true
        },
        companyWebsite: {
            type: String,
            trim: true
        }
    }
}, {
    timestamps: true
});

// Add validation to ensure role-specific fields are used correctly
UserSchema.pre('save', function(next) {
    if (this.role === 'job_seeker') {
        // Clear employer-specific fields for job seekers
        this.profile.companyName = undefined;
        this.profile.companyWebsite = undefined;
    } else if (this.role === 'employer') {
        // Clear job seeker-specific fields for employers
        this.profile.resumeUrl = undefined;
        this.profile.skills = undefined;
        this.profile.experienceLevel = undefined;
    }
    next();
});

module.exports = mongoose.model('User', UserSchema);