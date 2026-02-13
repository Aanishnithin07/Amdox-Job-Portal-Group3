import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jobAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import './PostJob.css';

const PostJob = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [currentReq, setCurrentReq] = useState('');

    const [formData, setFormData] = useState({
        title: '',
        company: user?.profile?.companyName || '',
        location: user?.profile?.location || '',
        jobType: 'Full-time',
        salary: '',
        description: '',
        requirements: []
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddRequirement = (e) => {
        e.preventDefault();
        if (currentReq.trim()) {
            setFormData(prev => ({
                ...prev,
                requirements: [...prev.requirements, currentReq.trim()]
            }));
            setCurrentReq('');
        }
    };

    const handleRemoveRequirement = (index) => {
        setFormData(prev => ({
            ...prev,
            requirements: prev.requirements.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await jobAPI.createJob(formData);
            alert('Job posted successfully! 🎉');
            navigate('/jobs');
        } catch (err) {
            console.error('Error posting job:', err);
            alert(err.response?.data?.message || 'Failed to post job. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="post-job-container">
            <div className="post-job-card">
                <div className="post-job-header">
                    <h1>Post a New Job</h1>
                    <p>Find the perfect candidate for your company</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Job Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="form-input"
                            placeholder="e.g. Senior React Developer"
                            required
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Company Name</label>
                            <input
                                type="text"
                                name="company"
                                value={formData.company}
                                onChange={handleChange}
                                className="form-input"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Location</label>
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                className="form-input"
                                placeholder="e.g. Remote, New York, NY"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Job Type</label>
                            <select
                                name="jobType"
                                value={formData.jobType}
                                onChange={handleChange}
                                className="form-select"
                            >
                                <option value="Full-time">Full-time</option>
                                <option value="Part-time">Part-time</option>
                                <option value="Contract">Contract</option>
                                <option value="Internship">Internship</option>
                                <option value="Remote">Remote</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Salary (Optional)</label>
                            <input
                                type="number"
                                name="salary"
                                value={formData.salary}
                                onChange={handleChange}
                                className="form-input"
                                placeholder="e.g. 80000"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Job Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="form-textarea"
                            placeholder="Describe the role, responsibilities, and what you're looking for..."
                            required
                        />
                    </div>

                    <div className="requirements-section">
                        <label>Requirements & Skills</label>
                        <ul className="requirements-list-edit">
                            {formData.requirements.map((req, index) => (
                                <li key={index} className="requirement-item">
                                    <span>{req}</span>
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveRequirement(index)}
                                        className="remove-req-btn"
                                    >
                                        ×
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <div className="add-req-container">
                            <input
                                type="text"
                                value={currentReq}
                                onChange={(e) => setCurrentReq(e.target.value)}
                                className="form-input"
                                placeholder="Add a requirement..."
                                onKeyPress={(e) => e.key === 'Enter' && handleAddRequirement(e)}
                            />
                            <button
                                type="button"
                                onClick={handleAddRequirement}
                                className="add-req-btn"
                            >
                                Add
                            </button>
                        </div>
                    </div>

                    <button type="submit" className="submit-btn" disabled={loading}>
                        {loading ? 'Posting Job...' : '✨ Publish Job Listing'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PostJob;
