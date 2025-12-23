import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { userAPI } from '../services/api';
import Navbar from '../components/Navbar';
import './Profile.css';

const Profile = () => {
    const { user, updateUser } = useContext(AuthContext);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    
    const [profileData, setProfileData] = useState({
        bio: '',
        location: '',
        resumeUrl: '',
        skills: [],
        experienceLevel: '',
        companyName: '',
        companyWebsite: ''
    });

    const [skillInput, setSkillInput] = useState('');

    useEffect(() => {
        fetchProfile();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await userAPI.getProfile();
            const userData = response.data.user;
            setProfileData({
                bio: userData.profile?.bio || '',
                location: userData.profile?.location || '',
                resumeUrl: userData.profile?.resumeUrl || '',
                skills: userData.profile?.skills || [],
                experienceLevel: userData.profile?.experienceLevel || '',
                companyName: userData.profile?.companyName || '',
                companyWebsite: userData.profile?.companyWebsite || ''
            });
            updateUser(userData);
        } catch {
            setError('Failed to load profile');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        setError('');
        setSuccess('');
        
        try {
            const response = await userAPI.updateProfile(profileData);
            updateUser(response.data.user);
            setSuccess('Profile updated successfully!');
            setIsEditing(false);
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update profile');
        } finally {
            setSaving(false);
        }
    };

    const handleAddSkill = () => {
        if (skillInput.trim() && !profileData.skills.includes(skillInput.trim())) {
            setProfileData({
                ...profileData,
                skills: [...profileData.skills, skillInput.trim()]
            });
            setSkillInput('');
        }
    };

    const handleRemoveSkill = (skillToRemove) => {
        setProfileData({
            ...profileData,
            skills: profileData.skills.filter(skill => skill !== skillToRemove)
        });
    };

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="profile-loading">
                    <div className="spinner"></div>
                    <p>Loading profile...</p>
                </div>
            </>
        );
    }

    const isJobSeeker = user?.role === 'job_seeker';

    return (
        <>
            <Navbar />
            <div className="profile-container">
                <div className="profile-card">
                    <div className="profile-header">
                        <div className="profile-avatar">
                            {user?.username?.charAt(0).toUpperCase()}
                        </div>
                        <div className="profile-header-info">
                            <h1>{user?.username}</h1>
                            <p className="profile-email">{user?.email}</p>
                            <span className={`role-badge ${user?.role}`}>
                                {user?.role === 'job_seeker' ? '👔 Job Seeker' : '🏢 Employer'}
                            </span>
                        </div>
                        <button 
                            onClick={() => setIsEditing(!isEditing)}
                            className="edit-btn"
                        >
                            {isEditing ? '❌ Cancel' : '✏️ Edit Profile'}
                        </button>
                    </div>

                    {error && <div className="alert alert-error">{error}</div>}
                    {success && <div className="alert alert-success">{success}</div>}

                    <div className="profile-body">
                        {/* Common Fields */}
                        <div className="form-group">
                            <label>📝 Bio</label>
                            {isEditing ? (
                                <textarea
                                    value={profileData.bio}
                                    onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                                    placeholder="Tell us about yourself..."
                                    maxLength={500}
                                    rows={4}
                                />
                            ) : (
                                <p className="profile-value">{profileData.bio || 'No bio added yet'}</p>
                            )}
                        </div>

                        <div className="form-group">
                            <label>📍 Location</label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={profileData.location}
                                    onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                                    placeholder="City, Country"
                                />
                            ) : (
                                <p className="profile-value">{profileData.location || 'Not specified'}</p>
                            )}
                        </div>

                        {/* Job Seeker Fields */}
                        {isJobSeeker && (
                            <>
                                <div className="form-group">
                                    <label>📄 Resume URL</label>
                                    {isEditing ? (
                                        <input
                                            type="url"
                                            value={profileData.resumeUrl}
                                            onChange={(e) => setProfileData({...profileData, resumeUrl: e.target.value})}
                                            placeholder="https://drive.google.com/..."
                                        />
                                    ) : (
                                        <p className="profile-value">
                                            {profileData.resumeUrl ? (
                                                <a href={profileData.resumeUrl} target="_blank" rel="noopener noreferrer">
                                                    View Resume
                                                </a>
                                            ) : 'No resume uploaded'}
                                        </p>
                                    )}
                                </div>

                                <div className="form-group">
                                    <label>💼 Experience Level</label>
                                    {isEditing ? (
                                        <select
                                            value={profileData.experienceLevel}
                                            onChange={(e) => setProfileData({...profileData, experienceLevel: e.target.value})}
                                        >
                                            <option value="">Select level</option>
                                            <option value="entry">Entry Level</option>
                                            <option value="mid">Mid Level</option>
                                            <option value="senior">Senior Level</option>
                                            <option value="lead">Lead/Manager</option>
                                        </select>
                                    ) : (
                                        <p className="profile-value">{profileData.experienceLevel || 'Not specified'}</p>
                                    )}
                                </div>

                                <div className="form-group">
                                    <label>🛠️ Skills</label>
                                    {isEditing ? (
                                        <div className="skills-input-container">
                                            <input
                                                type="text"
                                                value={skillInput}
                                                onChange={(e) => setSkillInput(e.target.value)}
                                                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                                                placeholder="Add a skill (press Enter)"
                                            />
                                            <button type="button" onClick={handleAddSkill} className="add-skill-btn">
                                                + Add
                                            </button>
                                        </div>
                                    ) : null}
                                    <div className="skills-container">
                                        {profileData.skills.length > 0 ? (
                                            profileData.skills.map((skill, index) => (
                                                <span key={index} className="skill-badge">
                                                    {skill}
                                                    {isEditing && (
                                                        <button 
                                                            onClick={() => handleRemoveSkill(skill)}
                                                            className="remove-skill-btn"
                                                        >
                                                            ×
                                                        </button>
                                                    )}
                                                </span>
                                            ))
                                        ) : (
                                            <p className="no-data">No skills added</p>
                                        )}
                                    </div>
                                </div>
                            </>
                        )}

                        {/* Employer Fields */}
                        {!isJobSeeker && (
                            <>
                                <div className="form-group">
                                    <label>🏢 Company Name</label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={profileData.companyName}
                                            onChange={(e) => setProfileData({...profileData, companyName: e.target.value})}
                                            placeholder="Your company name"
                                        />
                                    ) : (
                                        <p className="profile-value">{profileData.companyName || 'Not specified'}</p>
                                    )}
                                </div>

                                <div className="form-group">
                                    <label>🌐 Company Website</label>
                                    {isEditing ? (
                                        <input
                                            type="url"
                                            value={profileData.companyWebsite}
                                            onChange={(e) => setProfileData({...profileData, companyWebsite: e.target.value})}
                                            placeholder="https://yourcompany.com"
                                        />
                                    ) : (
                                        <p className="profile-value">
                                            {profileData.companyWebsite ? (
                                                <a href={profileData.companyWebsite} target="_blank" rel="noopener noreferrer">
                                                    {profileData.companyWebsite}
                                                </a>
                                            ) : 'Not specified'}
                                        </p>
                                    )}
                                </div>
                            </>
                        )}

                        {isEditing && (
                            <div className="profile-actions">
                                <button 
                                    onClick={handleSave} 
                                    className="save-btn"
                                    disabled={saving}
                                >
                                    {saving ? '💾 Saving...' : '💾 Save Changes'}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;
