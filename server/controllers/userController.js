const User = require('../models/User');

/**
 * @desc    Get user profile
 * @route   GET /api/users/profile
 * @access  Private (requires authentication)
 */
exports.getProfile = async (req, res) => {
    try {
        // Find user by ID from the authenticated request
        // Exclude password field from the response
        const user = await User.findById(req.user.id).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({
            success: true,
            user
        });
    } catch (err) {
        console.error('Error in getProfile:', err);
        res.status(500).json({ 
            message: 'Server error while fetching profile',
            error: err.message 
        });
    }
};

/**
 * @desc    Update user profile
 * @route   PUT /api/users/profile
 * @access  Private (requires authentication)
 */
exports.updateProfile = async (req, res) => {
    try {
        // Find the user by ID
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Extract profile updates from request body
        const { 
            bio, 
            location, 
            resumeUrl, 
            skills, 
            experienceLevel, 
            companyName, 
            companyWebsite 
        } = req.body;

        // Deep merge: Preserve existing profile fields and update only provided ones
        user.profile = {
            ...user.profile,  // Spread existing profile data
            ...(bio !== undefined && { bio }),
            ...(location !== undefined && { location }),
            ...(resumeUrl !== undefined && { resumeUrl }),
            ...(skills !== undefined && { skills }),
            ...(experienceLevel !== undefined && { experienceLevel }),
            ...(companyName !== undefined && { companyName }),
            ...(companyWebsite !== undefined && { companyWebsite })
        };

        // Save the updated user
        await user.save();

        // Return updated user without password
        const updatedUser = await User.findById(user._id).select('-password');

        res.json({
            success: true,
            message: 'Profile updated successfully',
            user: updatedUser
        });
    } catch (err) {
        console.error('Error in updateProfile:', err);
        res.status(500).json({ 
            message: 'Server error while updating profile',
            error: err.message 
        });
    }
};
