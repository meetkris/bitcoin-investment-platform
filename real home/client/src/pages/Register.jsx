import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signUp, signInWithGoogle } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data, error } = await signUp({
                email,
                password,
            });
            if (error) throw error;
            alert('Registration successful! Please check your email for verification.');
            navigate('/login');
        } catch (err) {
            alert(err.message);
        }
    };

    const handleGoogleSignUp = async () => {
        try {
            const { error } = await signInWithGoogle();
            if (error) {
                // Handle specific OAuth errors
                if (error.message.includes('provider is not enabled') || error.message.includes('Unsupported provider')) {
                    alert('Google Sign-Up is not yet configured. Please use email/password to create an account, or contact support to enable Google authentication.');
                } else {
                    throw error;
                }
            }
            // Redirect happens automatically via OAuth flow
        } catch (err) {
            console.error('Google Sign-Up Error:', err);
            alert(err.message || 'Failed to sign up with Google. Please try again or use email/password.');
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-split">
                <div className="auth-sidebar" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80')" }}>
                    <div className="auth-sidebar-content">
                        <h2>Join RealEstate</h2>
                        <p>Create an account to save properties, schedule tours, and more.</p>
                    </div>
                </div>
                <div className="auth-main">
                    <div className="auth-form-container">
                        <h2>Create Account</h2>
                        <p className="auth-subtitle">Get started with your free account today</p>

                        <button onClick={handleGoogleSignUp} className="btn-google">
                            <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                            Sign up with Google
                        </button>

                        <div className="auth-divider">
                            <span>or</span>
                        </div>

                        <form onSubmit={handleSubmit} className="auth-form">
                            <input
                                type="email"
                                placeholder="Email address"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                            />
                            <button type="submit" className="btn btn-primary">Create Account</button>
                        </form>

                        <div className="auth-footer">
                            Already have an account? <a href="/login">Log in</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
