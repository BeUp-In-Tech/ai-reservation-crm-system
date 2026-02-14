import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/landingpage.jsx';
import CustomerService from './pages/customerservice.jsx';
import CustomerService1 from './pages/customerservice1.jsx';
import BookingPayment from './pages/paymentsystem.jsx';
import AdminDashboard from './pages/adminDashboard.jsx';
import AdminBooking from './pages/adminBooking.jsx';
import AdminConfiguration from './pages/aiconfiguration.jsx';
import Analytics from './pages/analytics.jsx';
import Settings from './pages/setting.jsx';
import AddBusiness from './pages/addbusiness.jsx';
import AdminLogin from './pages/adminlogin.jsx';
import Login from './auth/login.jsx';
import ForgotPassword from './auth/forgotPassword.jsx';
import OTPEmail from './auth/otp.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/customerservice" element={<CustomerService />} />
        <Route path="/customerservice1" element={<CustomerService1 />} />
        <Route path="/paymentsystem" element={<BookingPayment />} />
        <Route path="/adminDashboard" element={<AdminDashboard />} />
        <Route path="/adminBooking" element={<AdminBooking />} />
        <Route path="/aiconfiguration" element={<AdminConfiguration />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/addbusiness" element={<AddBusiness />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/login" element={<Login />} /> 
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/otp-email" element={<OTPEmail />} />
      </Routes>
    </Router>
  );
}

export default App;
