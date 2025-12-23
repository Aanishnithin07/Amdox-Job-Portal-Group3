import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './Dashboard.css';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <>
            <Navbar />
            <div className="dashboard-container">
                <div className="dashboard-hero">
                    <h1>Welcome Back, {user?.username}! 👋</h1>
                    <p className="hero-subtitle">Ready to explore amazing opportunities?</p>
                </div>

                <div className="dashboard-content">
                    <div className="stats-grid">
                        <div className="stat-card">
                            <div className="stat-icon">💼</div>
                            <h3>10,000+</h3>
                            <p>Jobs Available</p>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon">📝</div>
                            <h3>0</h3>
                            <p>Applications</p>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon">⭐</div>
                            <h3>0</h3>
                            <p>Saved Jobs</p>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon">📊</div>
                            <h3>0</h3>
                            <p>Interview Calls</p>
                        </div>
                    </div>

                    <div className="quick-actions">
                        <h2>Quick Actions</h2>
                        <div className="actions-grid">
                            <button 
                                className="action-btn primary"
                                onClick={() => navigate('/profile')}
                            >
                                <span className="action-icon">👤</span>
                                <span className="action-text">
                                    <strong>Complete Profile</strong>
                                    <small>Add your skills and experience</small>
                                </span>
                            </button>
                            <button className="action-btn">
                                <span className="action-icon">🔍</span>
                                <span className="action-text">
                                    <strong>Browse Jobs</strong>
                                    <small>Find your dream job</small>
                                </span>
                            </button>
                            <button className="action-btn">
                                <span className="action-icon">📄</span>
                                <span className="action-text">
                                    <strong>Upload Resume</strong>
                                    <small>Stand out from the crowd</small>
                                </span>
                            </button>
                            <button className="action-btn">
                                <span className="action-icon">🎯</span>
                                <span className="action-text">
                                    <strong>Job Alerts</strong>
                                    <small>Get notified instantly</small>
                                </span>
                            </button>
                        </div>
                    </div>

                    <div className="recent-activity">
                        <h2>Recent Activity</h2>
                        <div className="activity-list">
                            <div className="activity-empty">
                                <span className="empty-icon">📭</span>
                                <p>No recent activity yet</p>
                                <small>Start applying to jobs to see your activity here</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;