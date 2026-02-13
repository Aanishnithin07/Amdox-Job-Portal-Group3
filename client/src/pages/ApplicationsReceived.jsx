import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { applicationAPI } from '../services/api';
import './Applications.css';

const ApplicationsReceived = () => {
    const { id } = useParams(); // Job ID
    const navigate = useNavigate();
    const [applications, setApplications] = useState([]);
    const [jobTitle, setJobTitle] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchApplicants();
    }, [id]);

    const fetchApplicants = async () => {
        try {
            const response = await applicationAPI.getJobApplicants(id);
            if (response.data.success) {
                setApplications(response.data.applications);
                setJobTitle(response.data.jobTitle);
            }
        } catch (err) {
            setError('Failed to fetch applicants. Ensure you are the owner of this job.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (appId, newStatus) => {
        try {
            await applicationAPI.updateStatus(appId, newStatus);
            setApplications(prev => prev.map(app =>
                app._id === appId ? { ...app, status: newStatus } : app
            ));
        } catch (err) {
            alert('Failed to update status.');
        }
    };

    if (loading) return <div className="loading-spinner">Loading applicants...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="applications-container">
            <div className="applications-card">
                <div className="applications-header">
                    <div>
                        <h2>Applicants for: {jobTitle}</h2>
                        <button
                            className="action-btn"
                            style={{ marginTop: '1rem', background: '#718096', color: 'white' }}
                            onClick={() => navigate(`/jobs/${id}`)}
                        >
                            ← Back to Job
                        </button>
                    </div>
                </div>

                {applications.length > 0 ? (
                    <div className="table-responsive">
                        <table className="applications-table">
                            <thead>
                                <tr>
                                    <th>Applicant</th>
                                    <th>Email</th>
                                    <th>Applied Date</th>
                                    <th>Status</th>
                                    <th>Resume</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {applications.map(app => (
                                    <tr key={app._id}>
                                        <td>{app.applicant.username}</td>
                                        <td>{app.applicant.email}</td>
                                        <td>{new Date(app.appliedAt).toLocaleDateString()}</td>
                                        <td>
                                            <span className={`status-badge status-${app.status}`}>
                                                {app.status.toUpperCase()}
                                            </span>
                                        </td>
                                        <td>
                                            {app.applicant.profile?.resumeUrl ? (
                                                <a
                                                    href={app.applicant.profile.resumeUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    style={{ color: '#667eea' }}
                                                >
                                                    View Resume
                                                </a>
                                            ) : 'N/A'}
                                        </td>
                                        <td>
                                            <select
                                                value={app.status}
                                                onChange={(e) => handleStatusUpdate(app._id, e.target.value)}
                                                className="status-select"
                                                style={{ padding: '0.3rem', borderRadius: '4px' }}
                                            >
                                                <option value="applied">Applied</option>
                                                <option value="reviewed">Reviewed</option>
                                                <option value="hired">Hired</option>
                                                <option value="rejected">Rejected</option>
                                            </select>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="no-data">
                        <h3>No applications received yet.</h3>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ApplicationsReceived;
