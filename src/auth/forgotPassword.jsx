import React, { useState } from 'react';
import '../assets/styles/forgotPassword.css';
import { Link, useNavigate } from 'react-router-dom';


const ForgotPassword = () => {
    const [email, setEmail] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle forgot password logic (send email)
        console.log('Password reset request sent to:', email);
        navigate('/otp-email');
    };

    return (
        <section className="forgot-password-section">
            <div className="forgot-password-container">
                <h2 className="forgot-password-title">Forgot Password</h2>
                <form className="forgot-password-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Enter your Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your registered email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="reset-btn">Send Reset Link</button>
                </form>
                <Link to="/login" className="back-to-login-link">Back to Login</Link>
            </div >
        </section >
    );
};

export default ForgotPassword;
