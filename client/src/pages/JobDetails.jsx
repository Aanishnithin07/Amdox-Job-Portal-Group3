import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { jobAPI, applicationAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import './JobDetails.css';

const JobDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [applying, setApplying] = useState(false);
    const [hasApplied, setHasApplied] = useState(false);

    useEffect(() => {
        fetchJobDetails();
    }, [id]);

    useEffect(() => {
        if (user && user.role === 'job_seeker' && job) {
            checkApplicationStatus();
        }
    }, [user, job]);

    const fetchJobDetails = async () => {
        try {
            const response = await jobAPI.getJobById(id);
            if (response.data.success) {
                setJob(response.data.job);
            }
        } catch (err) {
            setError('Failed to load job details.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const checkApplicationStatus = async () => {
        try {
            const response = await applicationAPI.getMyApplications();
            if (response.data.success) {
                const applied = response.data.applications.some(app => app.job._id === id);
                setHasApplied(applied);
            }
        } catch (err) {
            console.error('Error checking application status:', err);
        }
    };

    const handleApply = async () => {
        if (!user) {
            navigate('/login');
            return;
        }

        if (user.role !== 'job_seeker') {
            alert('Only job seekers can apply for jobs.');
            return;
        }

        setApplying(true);
        try {
            const response = await applicationAPI.applyToJob(id);
            if (response.data.success) {
                alert('Application submitted successfully!');
                setHasApplied(true);
            }
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to apply.');
        } finally {
            setApplying(false);
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this job posting?')) {
            try {
                await jobAPI.deleteJob(id);
                navigate('/jobs');
            } catch (err) {
                alert('Failed to delete job.');
            }
        }
    };

    if (loading) return <div className="loading-spinner">Loading job details...</div>;
    if (error) return <div className="error-message">{error}</div>;
    if (!job) return <div className="error-message">Job not found.</div>;

    const isOwner = user && user.role === 'employer' && user.id === job.employer._id;

    return (
        <div className="job-details-container">
            <div className="job-details-card">
                <div className="job-header">
                    <h1>{job.title}</h1>
                    <div className="job-meta">
                        <span>🏢 {job.company}</span>
                        <span>📍 {job.location}</span>
                        <span>💰 {job.salary ? `$${job.salary.toLocaleString()}` : 'Negotiable'}</span>
                        <span>🕒 {job.jobType}</span>
                    </div>
                </div>

                <div className="job-body">
                    <div className="job-section">
                        <h3>Description</h3>
                        <p>{job.description}</p>
                    </div>

                    <div className="job-section">
                        <h3>Requirements</h3>
                        <ul className="requirements-list">
                            {job.requirements && job.requirements.map((req, index) => (
                                <li key={index}>{req}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="employer-info">
                        <h4>About the Employer</h4>
                        <p><strong>Contact:</strong> {job.employer.email}</p>
                        {job.employer.profile?.companyWebsite && (
                            <p>
                                <strong>Website:</strong>{' '}
                                <a
                                    href={job.employer.profile.companyWebsite}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {job.employer.profile.companyWebsite}
                                </a>
                            </p>
                        )}
                    </div>

                    <div className="action-buttons">
                        {user?.role === 'job_seeker' && (
                            <button
                                className="btn-apply"
                                onClick={handleApply}
                                disabled={applying || hasApplied}
                            >
                                {hasApplied ? 'Applied ✅' : (applying ? 'Applying...' : 'Apply Now')}
                            </button>
                        )}

                        {!user && (
                            <button className="btn-apply" onClick={() => navigate('/login')}>
                                Login to Apply
                            </button>
                        )}

                        {isOwner && (
                            <>
                                <button className="btn-edit" onClick={() => alert('Edit functionality to be implemented')}>
                                    Edit Job
                                </button>
                                <button className="btn-delete" onClick={handleDelete}>
                                    Delete Job
                                </button>
                                <button className="btn-apply" onClick={() => navigate(`/job/${id}/applications`)}>
                                    View Applicants
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobDetails;
