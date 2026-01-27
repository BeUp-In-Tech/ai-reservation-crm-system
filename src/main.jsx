import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './assets/styles/style.css'
import './assets/styles/customer.css'
import './assets/styles/customer1.css'
import './assets/styles/payment.css'
import './assets/styles/header.css'
import './assets/styles/adminDashboard.css'
import './assets/styles/adminBooking.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
