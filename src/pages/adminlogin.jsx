import React from 'react';
import { Routes, Route } from 'react-router-dom';

import AdminLogin from '../auth/login';
import ForgotPassword from '../auth/forgotPassword';
import OTPEmail from '../auth/otp';

const App = () => {
    const otp = "123456"; // Example OTP, this would be dynamically generated.

    return (
        <Routes>
            <Route path="/" element={<AdminLogin />} />
            <Route path="/login" element={<AdminLogin />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/otp-email" element={<OTPEmail otp={otp} />} />
        </Routes>
    );
};

export default App;
