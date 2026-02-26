import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../assets/styles/forgotPassword.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            setError('Please enter your email');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address');
            return;
        }

        setError('');
        setSuccess('');
        setLoading(true);

        try {
            await axios.post('/api/v1/admin/auth/forgot-password', { email });
            setSuccess('Reset link sent! Redirecting you to reset your password...');
            setTimeout(() => navigate('/reset-password'), 2000);
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="forgot-password-section">
            <div className="forgot-password-container">
                <h2 className="forgot-password-title">Forgot Password</h2>

                {error && (
                    <div className="alert alert-error" role="alert">
                        <span className="alert-icon">&#9888;</span>
                        <span className="alert-text">{error}</span>
                        <button className="alert-close" onClick={() => setError('')} aria-label="Dismiss">&times;</button>
                    </div>
                )}
                {success && (
                    <div className="alert alert-success" role="status">
                        <span className="alert-icon">&#10003;</span>
                        <span className="alert-text">{success}</span>
                    </div>
                )}

                <form className="forgot-password-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="fp-email">Email</label>
                        <input
                            id="fp-email"
                            type="email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                if (error) setError('');
                            }}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <button type="submit" className="reset-btn" disabled={loading}>
                        {loading ? (
                            <><span className="spinner" /> Sending Reset Link...</>
                        ) : (
                            'Send Reset Link'
                        )}
                    </button>
                </form>

                <Link to="/login" className="back-to-login-link">Back to Login</Link>
            </div>
        </section>
    );
};

export default ForgotPassword;