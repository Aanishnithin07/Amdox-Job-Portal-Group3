import { useState, useEffect } from 'react';
import { applicationAPI } from '../services/api';
import './Applications.css';

const MyApplications = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        try {
            const response = await applicationAPI.getMyApplications();
            if (response.data.success) {
                setApplications(response.data.applications);
            }
        } catch (err) {
            setError('Failed to fetch applications.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleWithdraw = async (id) => {
        if (window.confirm('Are you sure you want to withdraw this application?')) {
            try {
                await applicationAPI.deleteApplication(id);
                setApplications(prev => prev.filter(app => app._id !== id));
            } catch (err) {
                alert('Failed to withdraw application.');
            }
        }
    };

    if (loading) return <div className="loading-spinner">Loading applications...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="applications-container">
            <div className="applications-card">
                <div className="applications-header">
                    <h2>My Applications</h2>
                </div>

                {applications.length > 0 ? (
                    <div className="table-responsive">
                        <table className="applications-table">
                            <thead>
                                <tr>
                                    <th>Job Title</th>
                                    <th>Company</th>
                                    <th>Applied Date</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {applications.map(app => (
                                    <tr key={app._id}>
                                        <td>{app.job?.title || 'Job Deleted'}</td>
                                        <td>{app.job?.company || 'N/A'}</td>
                                        <td>{new Date(app.appliedAt).toLocaleDateString()}</td>
                                        <td>
                                            <span className={`status-badge status-${app.status}`}>
                                                {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                                            </span>
                                        </td>
                                        <td>
                                            <button
                                                className="action-btn btn-withdraw"
                                                onClick={() => handleWithdraw(app._id)}
                                            >
                                                Withdraw
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="no-data">
                        <h3>You haven't applied to any jobs yet.</h3>
                        <p>Go to the Jobs page to find your dream job!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyApplications;
