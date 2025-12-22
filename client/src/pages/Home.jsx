import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { MdEmail, MdWork, MdSchool, MdGroups } from 'react-icons/md';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Home = () => {
    const navigate = useNavigate();

    const handleGoogleLogin = () => {
        window.location.href = "https://accounts.google.com/";
    };

    const styles = {
        container: {
            fontFamily: "'Inter', sans-serif",
            minHeight: '100vh',
            backgroundColor: '#D2E0FF',
            color: '#333',
            overflowX: 'hidden'
        },
        nav: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '15px 8%',
            backgroundColor: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(10px)',
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            boxShadow: '0 4px 15px rgba(0,0,0,0.08)'
        },
        logo: { color: '#004aad', fontSize: '30px', fontWeight: '800', cursor: 'pointer' },
        heroSection: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '80px 10%',
            flexWrap: 'wrap'
        },
        heroLeft: { flex: 1, minWidth: '320px' },
        mainTitle: { 
            fontSize: '52px', 
            fontWeight: '900', 
            color: '#004aad',
            textShadow: '3px 6px 10px rgba(0,0,0,0.15)',
            marginBottom: '10px',
            animation: 'fadeInUp 1s ease-out'
        },
        subTitle: { fontSize: '22px', marginBottom: '30px', color: '#444' },
        highlightText: { 
            backgroundColor: '#FFD700', 
            padding: '2px 12px', 
            borderRadius: '8px',
            fontWeight: 'bold',
            boxShadow: '4px 4px 0px #b8860b'
        },
        authCard: {
            background: 'white',
            padding: '30px',
            borderRadius: '20px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.12)',
            maxWidth: '400px'
        },
        bodyStats: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
            padding: '60px 10%',
            backgroundColor: '#ffffff'
        },
        footer: {
            backgroundColor: '#1a1a1a',
            color: '#fff',
            padding: '50px 10% 20px 10%',
            textAlign: 'center'
        }
    };

    return (
        <div style={styles.container}>
            <style>
                {`
                    @keyframes fadeInUp {
                        from { opacity: 0; transform: translateY(30px); }
                        to { opacity: 1; transform: translateY(0); }
                    }

                    /* Interactive Button Styles */
                    .interactive-btn {
                        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                        cursor: pointer;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 12px;
                        font-weight: 600;
                    }

                    .interactive-btn:hover {
                        transform: translateY(-3px);
                        box-shadow: 0 8px 20px rgba(0,0,0,0.2);
                        filter: brightness(1.1);
                    }

                    .interactive-btn:active {
                        transform: translateY(1px);
                        text-decoration: underline;
                        box-shadow: inset 0 3px 5px rgba(0,0,0,0.2);
                    }

                    /* Interactive Links */
                    .footer-link, .nav-link {
                        cursor: pointer;
                        transition: all 0.2s;
                        position: relative;
                        padding-bottom: 2px;
                    }

                    .footer-link:hover, .nav-link:hover {
                        color: #004aad;
                        text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
                    }

                    .footer-link:active, .nav-link:active {
                        text-decoration: underline;
                        font-weight: bold;
                    }

                    /* Stat Card Shadow */
                    .stat-card {
                        transition: all 0.3s;
                        border-bottom: 4px solid #004aad;
                        background: #f8faff;
                        padding: 30px;
                        border-radius: 15px;
                        text-align: center;
                    }

                    .stat-card:hover {
                        box-shadow: 0 10px 25px rgba(0,74,173,0.15);
                        transform: scale(1.05);
                    }
                `}
            </style>

            {/* Navbar */}
            <nav style={styles.nav}>
                <div style={styles.logo} onClick={() => navigate('/')}>JobPoint</div>
                <div>
                    <span className="nav-link" onClick={() => navigate('/register')} style={{marginRight: '20px', fontSize: '16px', fontWeight: 'bold', color: '#444'}}>Join now</span>
                    <button className="interactive-btn" onClick={() => navigate('/login')} style={{padding: '10px 24px', borderRadius: '25px', border: '2px solid #004aad', color: '#004aad', fontSize: '16px', background: 'white', display:'inline-flex'}}>Sign in</button>
                </div>
            </nav>

            {/* Header Content */}
            <div style={styles.heroSection}>
                <div style={styles.heroLeft}>
                    <h1 style={styles.mainTitle}>
                        Find job and <br />
                        <span style={styles.highlightText}>build your future</span>
                    </h1>
                    <p style={styles.subTitle}>
                        <b>Find the right job</b> for you among millions of listings and top companies hiring.
                    </p>
                    
                    <div style={styles.authCard}>
                        <button className="interactive-btn" onClick={handleGoogleLogin} style={{width: '100%', padding: '14px', borderRadius: '30px', border: '1px solid #dadce0', backgroundColor: '#fff', marginBottom: '15px'}}>
                            <FcGoogle size={24} /> Continue with Google
                        </button>
                        <button className="interactive-btn" onClick={() => navigate('/register')} style={{width: '100%', padding: '14px', borderRadius: '30px', border: 'none', backgroundColor: '#004aad', color: 'white'}}>
                            <MdEmail size={24} /> Continue with Email
                        </button>
                        <p style={{marginTop: '20px', fontSize: '12px', color: '#777'}}>
                            By clicking Continue, you agree to JobPoint’s User Agreement and Privacy Policy.
                        </p>
                    </div>
                </div>

                <div style={{flex: 1, textAlign: 'center'}}>
                    <img 
                        src="https://img.freepik.com/premium-photo/online-job-search-brisk-website-worker-search-job-opportunities_31965-683808.jpg?w=740" 
                        alt="Professional working" 
                        style={{width: '95%', borderRadius: '20px', boxShadow: '0 40px 70px rgba(0,0,0,0.25)', border: '6px solid white'}} 
                    />
                </div>
            </div>

            {/* Main Content Body */}
            <div style={styles.bodyStats}>
                <div className="stat-card">
                    <MdWork size={40} color="#004aad" />
                    <h2 style={{fontSize: '32px', margin: '10px 0'}}>10k+</h2>
                    <p style={{color: '#666', fontWeight: 'bold'}}>Jobs Available</p>
                </div>
                <div className="stat-card">
                    <MdGroups size={40} color="#004aad" />
                    <h2 style={{fontSize: '32px', margin: '10px 0'}}>500+</h2>
                    <p style={{color: '#666', fontWeight: 'bold'}}>Companies Hiring</p>
                </div>
                <div className="stat-card">
                    <MdSchool size={40} color="#004aad" />
                    <h2 style={{fontSize: '32px', margin: '10px 0'}}>5k+</h2>
                    <p style={{color: '#666', fontWeight: 'bold'}}>For Graduates</p>
                </div>
                <div className="stat-card">
                    <MdWork size={40} color="#004aad" />
                    <h2 style={{fontSize: '32px', margin: '10px 0'}}>2k+</h2>
                    <p style={{color: '#666', fontWeight: 'bold'}}>Internships</p>
                </div>
                <div className="stat-card">
                    <MdGroups size={40} color="#004aad" />
                    <h2 style={{fontSize: '32px', margin: '10px 0'}}>5k+</h2>
                    <p style={{color: '#666', fontWeight: 'bold'}}>For freshers</p>
                </div>
            </div>

            {/* Footer */}
            <footer style={styles.footer}>
                <div style={{fontSize: '24px', display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '30px'}}>
                    <FaFacebook className="footer-link" />
                    <FaTwitter className="footer-link" />
                    <FaLinkedin className="footer-link" />
                    <FaInstagram className="footer-link" />
                </div>
                <div style={{display: 'flex', justifyContent: 'center', gap: '30px', marginBottom: '20px', flexWrap: 'wrap', fontSize: '14px', color: '#bbb'}}>
                    <span className="footer-link">Privacy Policy</span>
                    <span className="footer-link">Terms & Conditions</span>
                    <span className="footer-link">Cookie Policy</span>
                    <span className="footer-link">Community Guidelines</span>
                </div>
                <div style={{borderTop: '1px solid #333', paddingTop: '20px', fontSize: '14px', color: '#666'}}>
                    <p>JobPoint © 2025. Empowering Careers Worldwide.</p>
                </div>
            </footer>
        </div>
    );
};

export default Home;