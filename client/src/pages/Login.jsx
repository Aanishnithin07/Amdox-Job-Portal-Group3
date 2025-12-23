import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';
import { authAPI } from '../services/api';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState({ email: '', password: '', general: '' });
    const [loading, setLoading] = useState(false);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError({ email: '', password: '', general: '' });
        setLoading(true);

        try {
            const response = await authAPI.login({ email, password });
            login(response.data.user, response.data.token);
            navigate('/dashboard'); 
        } catch (err) {
            const msg = err.response?.data?.message || "Server Error";
            if (msg === "User not found") {
                setError(prev => ({ ...prev, email: "User not found" }));
            } else if (msg === "Incorrect password") {
                setError(prev => ({ ...prev, password: "Incorrect password" }));
            } else {
                setError(prev => ({ ...prev, general: msg }));
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-header">
                <h1>🚀 Job Listing Portal</h1>
                <p>Your Gateway to Amazing Opportunities</p>
            </div>
            <div className="login-card">
                <h2>Welcome Back!</h2>
                <p className="login-subtitle">Sign in to continue to your account</p>
                
                <form onSubmit={handleLogin} className="login-form">
                    <div className="form-field">
                        <input 
                            type="email" 
                            placeholder="Email Address" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className={error.email ? 'error' : ''}
                        />
                        {error.email && <p className="error-text">{error.email}</p>}
                    </div>

                    <div className="form-field">
                        <div className="password-wrapper">
                            <input 
                                type={showPassword ? "text" : "password"} 
                                placeholder="Password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className={error.password ? 'error' : ''}
                            />
                            <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                        {error.password && <p className="error-text">{error.password}</p>}
                    </div>

                    {error.general && (
                        <div className="alert-error">
                            {error.general}
                        </div>
                    )}

                    <button type="submit" className="login-btn" disabled={loading}>
                        {loading ? '🔄 Logging in...' : '🔐 Login'}
                    </button>
                </form>

                <p className="footer-text">
                    New User? <span onClick={() => navigate('/register')} className="link">Create an account</span>
                </p>
            </div>
        </div>
    );
};

export default Login;