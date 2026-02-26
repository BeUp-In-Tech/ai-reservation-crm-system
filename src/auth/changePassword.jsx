import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import '../assets/styles/forgotPassword.css';

const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!currentPassword || !newPassword || !confirmPassword) {
            setError('Please fill in all fields');
            return;
        }

        if (newPassword.length < 6) {
            setError('New password must be at least 6 characters long');
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('New passwords do not match');
            return;
        }

        const token = Cookies.get("access_token");

        if (!token) {
            setError("You are not logged in. Please login again.");
            setTimeout(() => navigate('/login'), 2000);
            return;
        }

        setError('');
        setSuccess('');
        setLoading(true);

        const api = axios.create({
            baseURL: import.meta?.env?.VITE_API_BASE_URL || '',
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        });

        try {
            await api.post(
                '/api/v1/admin/auth/change-password',
                {
                    current_password: currentPassword,
                    new_password: newPassword,
                    confirm_password: confirmPassword
                }
            );

            setSuccess('Password changed successfully! Redirecting...');
            setTimeout(() => navigate('/profile'), 2000);

        } catch (err) {
            console.error(err.response);

            if (err.response?.status === 401) {
                setError("Session expired. Please login again.");
                Cookies.remove('access_token');
                setTimeout(() => navigate('/login'), 2000);
            } else if (err.response?.status === 403) {
                setError("You are not authorized to perform this action.");
            } else {
                setError(
                    err.response?.data?.detail ||
                    err.response?.data?.message ||
                    err.response?.data?.error ||
                    'Failed to change password. Please try again.'
                );
            }
        } finally {
            setLoading(false);
        }
    };


    return (
        <section className="forgot-password-section">
            <div className="forgot-password-container">
                <h2 className="forgot-password-title">Change Password</h2>

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
                        <div><label htmlFor="current-password">Current Password</label>
                            <input
                                id="current-password"
                                type="password"
                                value={currentPassword}
                                onChange={(e) => {
                                    setCurrentPassword(e.target.value);
                                    if (error) setError('');
                                }}
                                placeholder="Enter your current password"
                                required
                            />
                        </div>
                        <div><label htmlFor="new-password">New Password</label>
                            <input
                                id="new-password"
                                type="password"
                                value={newPassword}
                                onChange={(e) => {
                                    setNewPassword(e.target.value);
                                    if (error) setError('');
                                }}
                                placeholder="Enter your new password"
                                required
                            />
                        </div>
                        <div><label htmlFor="confirm-password">Confirm New Password</label>
                            <input
                                id="confirm-password"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => {
                                    setConfirmPassword(e.target.value);
                                    if (error) setError('');
                                }}
                                placeholder="Confirm your new password"
                                required
                            />
                        </div>
                    </div>
                    <button type="submit" className="reset-btn" disabled={loading}>
                        {loading ? (
                            <><span className="spinner" /> Changing Password...</>
                        ) : (
                            'Change Password'
                        )}
                    </button>

                </form>

                <Link to="/profile" className="back-to-login-link">Back to Profile</Link>
            </div>
        </section>
    );
};

export default ChangePassword;