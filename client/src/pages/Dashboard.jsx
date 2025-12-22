import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div style={styles.fullPage}>
            <div style={styles.card}>
                <h1 style={{ color: '#0d47a1' }}>Welcome to Job Portal</h1>
                <hr />
                {user ? (
                    <div style={{ marginTop: '20px' }}>
                        <p style={styles.successText}>Login Successful!</p>
                        <p><strong>Username:</strong> {user.username}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        
                        <div style={styles.statsContainer}>
                            <div style={styles.statBox}><h3>10000+</h3><p>Jobs Available</p></div>
                            <div style={styles.statBox}><h3>0</h3><p>Applied</p></div>
                        </div>

                        <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
                    </div>
                ) : (
                    <div>
                        <p>User not found. Please register first.</p>
                        <button onClick={() => navigate('/register')} style={styles.loginBtn}>Go to Register</button>
                    </div>
                )}
            </div>
        </div>
    );
};

const styles = {
    fullPage: { height: '100vh', backgroundColor: '#e3f2fd', display: 'flex', justifyContent: 'center', alignItems: 'center' },
    card: { background: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 8px 20px rgba(0,0,0,0.1)', textAlign: 'center', width: '450px' },
    successText: { color: 'green', fontWeight: 'bold', fontSize: '18px' },
    statsContainer: { display: 'flex', justifyContent: 'space-around', margin: '30px 0' },
    statBox: { padding: '15px', backgroundColor: '#f0f4f8', borderRadius: '8px', width: '40%' },
    logoutBtn: { backgroundColor: '#d32f2f', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' },
    loginBtn: { backgroundColor: '#1976d2', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }
};

export default Dashboard;