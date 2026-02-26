import React from 'react';
import { Routes, Route } from 'react-router-dom';

import AdminLogin from '../auth/login';
import ForgotPassword from '../auth/forgotPassword';

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<AdminLogin />} />
            <Route path="/login" element={<AdminLogin />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
    );
};

export default App;
