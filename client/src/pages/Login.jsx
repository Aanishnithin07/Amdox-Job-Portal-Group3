import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState({ email: '', password: '', general: '' });
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError({ email: '', password: '', general: '' });
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            login({ email: email, username: res.data.username });
            alert("Login Successful!");
            navigate('/dashboard'); 
        } catch (err) {
            const msg = err.response?.data?.message || "Server Error";
            if (msg === "User not found") setError(prev => ({ ...prev, email: "User not found" }));
            else if (msg === "Incorrect password") setError(prev => ({ ...prev, password: "Incorrect password" }));
            else setError(prev => ({ ...prev, general: msg }));
        }
    };

    const styles = {
        container: { height: '100vh', backgroundColor: '#e3f2fd', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' },
        header: { color: '#0d47a1', marginBottom: '20px' },
        formCard: { background: 'white', padding: '40px', borderRadius: '10px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', textAlign: 'center', width: '350px' },
        input: { width: '100%', padding: '12px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ddd', boxSizing: 'border-box' },
        passwordContainer: { position: 'relative' },
        eyeIcon: { position: 'absolute', right: '15px', top: '22px', cursor: 'pointer', color: '#666' },
        button: { width: '100%', padding: '12px', backgroundColor: '#1976d2', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '10px', fontWeight: 'bold' },
        errorText: { color: 'red', fontSize: '12px', textAlign: 'left', margin: '0 0 10px 5px' },
        footerText: { marginTop: '20px', fontSize: '14px' },
        link: { color: '#1976d2', textDecoration: 'underline', cursor: 'pointer', fontWeight: '500' }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Job Listing Portal</h1>
            <div style={styles.formCard}>
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <input type="text" placeholder="Email (@gmail.com)" style={styles.input} onChange={(e) => setEmail(e.target.value)} />
                    {error.email && <p style={styles.errorText}>{error.email}</p>}
                    <div style={styles.passwordContainer}>
                        <input type={showPassword ? "text" : "password"} placeholder="Password" style={styles.input} onChange={(e) => setPassword(e.target.value)} />
                        <span style={styles.eyeIcon} onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                    {error.password && <p style={styles.errorText}>{error.password}</p>}
                    <button type="submit" style={styles.button}>Login</button>
                    {error.general && <p style={styles.errorText}>{error.general}</p>}
                </form>
                <p style={styles.footerText}>
                    New User? <span onClick={() => navigate('/register')} style={styles.link}>register first</span>
                </p>
            </div>
        </div>
    );
};

export default Login;