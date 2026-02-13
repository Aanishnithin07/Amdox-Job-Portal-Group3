import { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FiUser, FiLogOut, FiHome } from 'react-icons/fi';
import './Navbar.css';

const Navbar = () => {
    const { user, isAuthenticated, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    <span className="logo-icon">💼</span> Job Portal
                </Link>

                <ul className="navbar-menu">
                    {isAuthenticated ? (
                        <>
                            <li className="navbar-item">
                                <Link to="/" className="navbar-link">
                                    <FiHome /> Home
                                </Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/jobs" className="navbar-link">
                                    Jobs
                                </Link>
                            </li>
                            {user?.role === 'employer' && (
                                <li className="navbar-item">
                                    <Link to="/post-job" className="navbar-link">
                                        Post Job
                                    </Link>
                                </li>
                            )}
                            {user?.role === 'job_seeker' && (
                                <li className="navbar-item">
                                    <Link to="/my-applications" className="navbar-link">
                                        My Applications
                                    </Link>
                                </li>
                            )}
                            <li className="navbar-item">
                                <Link to="/dashboard" className="navbar-link">
                                    Dashboard
                                </Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/profile" className="navbar-link">
                                    <FiUser /> Profile
                                </Link>
                            </li>
                            <li className="navbar-item">
                                <span className="navbar-username">Hi, {user?.username || 'User'}</span>
                            </li>
                            <li className="navbar-item">
                                <button onClick={handleLogout} className="navbar-btn logout-btn">
                                    <FiLogOut /> Logout
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="navbar-item">
                                <Link to="/login" className="navbar-btn login-btn">Login</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/register" className="navbar-btn register-btn">Register</Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
