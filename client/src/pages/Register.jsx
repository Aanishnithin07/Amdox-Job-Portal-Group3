import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { authAPI } from '../services/api';
import './Register.css';

const Register = () => {
    const [formData, setFormData] = useState({ 
        username: '', 
        email: '', 
        password: '',
        role: 'job_seeker'
    });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();

    const validate = () => {
        let tempErrors = {};
        
        if (!formData.username.trim()) {
            tempErrors.username = "Username is required";
        } else if (formData.username.length < 3) {
            tempErrors.username = "Username must be at least 3 characters";
        }

        if (!formData.email.endsWith('@gmail.com')) {
            tempErrors.email = "Please use a valid @gmail.com email address";
        }

        const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[a-zA-Z]).{8,}$/;
        if (!passwordRegex.test(formData.password)) {
            tempErrors.password = "Password must be 8+ characters with 1 uppercase, 1 symbol, and 1 number";
        }

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        
        setLoading(true);
        setErrorMsg('');
        setSuccessMsg('');

        try {
            await authAPI.register(formData);
            setSuccessMsg('✅ Registration successful! Redirecting to login...');
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            setErrorMsg(err.response?.data?.message || "Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-container">
            <div className="register-header">
                <h1>🚀 Job Listing Portal</h1>
                <p>Start Your Career Journey Today</p>
            </div>
            
            <div className="register-card">
                <h2>Create Account</h2>
                <p className="register-subtitle">Join thousands of professionals</p>
                
                <form onSubmit={handleSubmit} className="register-form">
                    <div className="form-field">
                        <input 
                            type="text" 
                            placeholder="Username" 
                            value={formData.username}
                            onChange={(e) => setFormData({...formData, username: e.target.value})}
                            className={errors.username ? 'error' : ''}
                            required
                        />
                        {errors.username && <p className="error-text">{errors.username}</p>}
                    </div>

                    <div className="form-field">
                        <input 
                            type="email" 
                            placeholder="Email Address" 
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className={errors.email ? 'error' : ''}
                            required
                        />
                        {errors.email && <p className="error-text">{errors.email}</p>}
                    </div>

                    <div className="form-field">
                        <div className="password-wrapper">
                            <input 
                                type={showPassword ? "text" : "password"} 
                                placeholder="Password" 
                                value={formData.password}
                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                                className={errors.password ? 'error' : ''}
                                required
                            />
                            <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                        {errors.password && <p className="error-text">{errors.password}</p>}
                    </div>

                    <div className="form-field">
                        <label className="role-label">I am a:</label>
                        <div className="role-selector">
                            <label className={`role-option ${formData.role === 'job_seeker' ? 'selected' : ''}`}>
                                <input
                                    type="radio"
                                    name="role"
                                    value="job_seeker"
                                    checked={formData.role === 'job_seeker'}
                                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                                />
                                <span className="role-content">
                                    <span className="role-icon">👔</span>
                                    <span className="role-text">Job Seeker</span>
                                </span>
                            </label>
                            <label className={`role-option ${formData.role === 'employer' ? 'selected' : ''}`}>
                                <input
                                    type="radio"
                                    name="role"
                                    value="employer"
                                    checked={formData.role === 'employer'}
                                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                                />
                                <span className="role-content">
                                    <span className="role-icon">🏢</span>
                                    <span className="role-text">Employer</span>
                                </span>
                            </label>
                        </div>
                    </div>

                    {errorMsg && (
                        <div className="alert-error">
                            {errorMsg}
                        </div>
                    )}

                    {successMsg && (
                        <div className="alert-success">
                            {successMsg}
                        </div>
                    )}

                    <button type="submit" className="register-btn" disabled={loading}>
                        {loading ? '🔄 Creating Account...' : '✨ Create Account'}
                    </button>
                </form>

                <p className="footer-text">
                    Already have an account? <span onClick={() => navigate('/login')} className="link">Sign in</span>
                </p>
            </div>
        </div>
    );
};

export default Register;