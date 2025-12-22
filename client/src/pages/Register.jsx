import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Register = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    const validate = () => {
        let tempErrors = {};
        if (!formData.email.endsWith('@gmail.com')) tempErrors.email = "Incorrect mail (must be @gmail.com)";
        const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[a-zA-Z]).{8,}$/;
        if (!passwordRegex.test(formData.password)) tempErrors.password = "Incorrect password (min 8 chars, 1 Capital, 1 Symbol, 1 Number)";
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        try {
            const res = await axios.post('http://localhost:5000/api/auth/register', formData);
            setMsg(res.data.message);
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            setMsg(err.response?.data?.message || "User or Email already exists");
        }
    };

    const styles = {
        container: { height: '100vh', backgroundColor: '#e3f2fd', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' },
        header: { color: '#0d47a1', fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' },
        formCard: { background: 'white', padding: '40px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', textAlign: 'center', width: '350px' },
        input: { width: '100%', padding: '10px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box' },
        passwordContainer: { position: 'relative' },
        eyeIcon: { position: 'absolute', right: '10px', top: '20px', cursor: 'pointer' },
        button: { width: '100%', padding: '10px', backgroundColor: '#1976d2', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' },
        errorText: { color: 'red', fontSize: '12px', textAlign: 'left' },
        successMsg: { color: 'green', marginTop: '10px' },
        link: { color: '#1976d2', textDecoration: 'underline', cursor: 'pointer' }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Job Listing Portal</h1>
            <div style={styles.formCard}>
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Username" style={styles.input} onChange={(e) => setFormData({...formData, username: e.target.value})} />
                    <input type="text" placeholder="Email" style={styles.input} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                    {errors.email && <p style={styles.errorText}>{errors.email}</p>}
                    <div style={styles.passwordContainer}>
                        <input type={showPassword ? "text" : "password"} placeholder="Password" style={styles.input} onChange={(e) => setFormData({...formData, password: e.target.value})} />
                        <span style={styles.eyeIcon} onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                    {errors.password && <p style={styles.errorText}>{errors.password}</p>}
                    <button type="submit" style={styles.button}>Register</button>
                </form>
                {msg && <p style={styles.successMsg}>{msg}</p>}
                <p style={{marginTop:'15px'}}>Already have an account? <span onClick={() => navigate('/login')} style={styles.link}>login</span></p>
            </div>
        </div>
    );
};

export default Register;