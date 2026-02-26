import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Phone, PhoneOff, Users, CheckCircle, Smile, Paperclip,
  DollarSign, MapPin, FileText, X, Mic, MicOff,
} from 'lucide-react';
import '../assets/styles/customer1.css';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import VoiceCallModal from '../components/VoiceCallModal';
import market from '../assets/market.png';
import sending from '../assets/sending.png';
import axios from 'axios';

// ── Axios instance ──────────────────────────────────────────────────────────
const api = axios.create({
  baseURL: import.meta?.env?.VITE_API_BASE_URL || 'https://reservation-xynh.onrender.com',
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
});

// ── Unique session ID per browser tab ──────────────────────────────────────
const getSessionId = () => {
  let sid = sessionStorage.getItem('chat_session_id');
  if (!sid) {
    sid = `sess_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    sessionStorage.setItem('chat_session_id', sid);
  }
  return sid;
};

// ── Normalise service shape ────────────────────────────────────────────────
const normalizeService = (item, i) => {
  const rawPrice = item.price ?? item.base_price;
  return {
    id:               item.id ?? item._id ?? i,
    title:            item.title ?? item.name ?? item.service_name ?? 'Untitled Service',
    description:      item.description ?? item.desc ?? '',
    price:            rawPrice != null
                        ? (typeof rawPrice === 'number' ? rawPrice : parseFloat(rawPrice) || 0)
                        : 0,
    priceDisplay:     rawPrice != null ? `$${parseFloat(rawPrice).toFixed(2)}` : 'Free',
    currency:         item.currency ?? 'USD',
    duration_minutes: item.duration_minutes ?? 60,
    business_id:      item.business_id ?? null,
    business_name:    item.business_name ?? item.business?.name ?? null,
    business_type:    item.business_type ?? item.service_type_name
                        ?? item.business?.service_type_name ?? null,
  };
};

// ── Payment Success Banner ─────────────────────────────────────────────────
function PaymentSuccessBanner({ bookingId, serviceName, onDismiss }) {
  return (
    <div style={{
      position: 'fixed', top: '1.5rem', left: '50%', transform: 'translateX(-50%)',
      zIndex: 2000, background: '#f0fdf4', border: '1.5px solid #86efac',
      borderRadius: '14px', padding: '1.25rem 1.75rem',
      boxShadow: '0 8px 32px rgba(34,197,94,0.18)',
      display: 'flex', alignItems: 'flex-start', gap: '1rem',
      maxWidth: '480px', width: '90vw',
      animation: 'slideDown 0.35s cubic-bezier(.4,0,.2,1)',
    }}>
      <div style={{
        width: '40px', height: '40px', borderRadius: '50%',
        background: '#22c55e', display: 'flex', alignItems: 'center',
        justifyContent: 'center', flexShrink: 0,
      }}>
        <CheckCircle size={22} color="white" />
      </div>
      <div style={{ flex: 1 }}>
        <p style={{ margin: 0, fontWeight: '700', color: '#15803d', fontSize: '1rem' }}>
          Payment Confirmed! 🎉
        </p>
        <p style={{ margin: '0.25rem 0 0', fontSize: '0.85rem', color: '#166534' }}>
          Your booking for <strong>{serviceName}</strong> is confirmed.
          {bookingId && <> Booking ID: <strong>{bookingId}</strong></>}
        </p>
        <p style={{ margin: '0.5rem 0 0', fontSize: '0.78rem', color: '#4ade80' }}>
          A confirmation has been sent. You can continue chatting below.
        </p>
      </div>
      <button onClick={onDismiss} style={{
        background: 'none', border: 'none', cursor: 'pointer',
        color: '#86efac', flexShrink: 0, padding: 0,
      }}>
        <X size={18} />
      </button>
    </div>
  );
}

// ── Payment Options Card ───────────────────────────────────────────────────
function PaymentOptionsCard({ bookingId, paymentUrl, onPayLater }) {
  return (
    <div style={{ padding: '1rem', minWidth: '260px', maxWidth: '320px' }}>
      <p style={{ fontWeight: '600', marginBottom: '0.4rem', fontSize: '0.95rem' }}>
        💳 How would you like to pay?
      </p>
      <p style={{ fontSize: '0.78rem', color: '#64748b', marginBottom: '1rem' }}>
        Booking ID: <strong>{bookingId}</strong>
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <a href={paymentUrl} target="_blank" rel="noopener noreferrer"
          style={{
            display: 'block', background: '#2563eb', color: 'white',
            textAlign: 'center', padding: '0.6rem 1rem', borderRadius: '8px',
            fontWeight: '600', textDecoration: 'none', fontSize: '0.875rem',
          }}>
          💳 Pay Now
        </a>
        <button onClick={() => onPayLater(bookingId)}
          style={{
            display: 'block', width: '100%', background: 'white', color: '#2563eb',
            border: '1.5px solid #2563eb', padding: '0.6rem 1rem', borderRadius: '8px',
            fontWeight: '600', cursor: 'pointer', fontSize: '0.875rem',
          }}>
          🕐 Pay Later
        </button>
      </div>
    </div>
  );
}

// ── Inject keyframes once ──────────────────────────────────────────────────
const keyframeStyle = `
@keyframes slideDown {
  from { opacity: 0; transform: translateX(-50%) translateY(-20px); }
  to   { opacity: 1; transform: translateX(-50%) translateY(0); }
}
`;
if (!document.getElementById('booking-keyframes')) {
  const s = document.createElement('style');
  s.id = 'booking-keyframes';
  s.textContent = keyframeStyle;
  document.head.appendChild(s);
}

// ── Main page component ────────────────────────────────────────────────────
export default function BookingAssistant() {
  const { business_slug } = useParams();
  const location          = useLocation();
  const navigate          = useNavigate();

  const bidFromQuery = new URLSearchParams(location.search).get('bid');
  const sessionId    = useRef(getSessionId()).current;

  // ── Detect return from payment page ───────────────────────────────────
  // /paymentsystem redirects back here with ?payment=success&booking_id=XXX
  // OR passes state via navigate(-1) / navigate(path, { state })
  const locationState   = location.state ?? {};
  const paymentStatus   = new URLSearchParams(location.search).get('payment');
  const returnBookingId = new URLSearchParams(location.search).get('booking_id')
                          ?? locationState.bookingId
                          ?? null;
  const returnService   = locationState.serviceName ?? null;

  // ── State ──────────────────────────────────────────────────────────────
  const [services,            setServices]            = useState([]);
  const [selectedService,     setSelectedService]     = useState(null);
  const [selectedTime]                                = useState('7:00 PM');
  const [message,             setMessage]             = useState('');
  const [chatMessages,        setChatMessages]        = useState([]);
  const [chatLoading,         setChatLoading]         = useState(false);
  const [servicesLoading,     setServicesLoading]     = useState(false);
  const [error,               setError]               = useState(null);
  const [progress,            setProgress]            = useState(30);
  const [conversationStarted, setConversationStarted] = useState(false);
  const [conversationId,      setConversationId]      = useState(null);
  const [paymentLoading,      setPaymentLoading]      = useState(false);
  const [detectedBookingId,   setDetectedBookingId]   = useState(null);
  const [businessId,          setBusinessId]          = useState(null);
  const [showVoiceCall,       setShowVoiceCall]       = useState(false);

  // Payment return success state
  const [paymentSuccess,      setPaymentSuccess]      = useState(
    paymentStatus === 'success'
  );
  const [successBookingId,    setSuccessBookingId]    = useState(returnBookingId);
  const [successServiceName,  setSuccessServiceName]  = useState(returnService);

  const chatEndRef = useRef(null);

  const business = services.length > 0
    ? { name: services[0].business_name, service_type_name: services[0].business_type }
    : null;

  // ── Clean up the URL after reading payment status ─────────────────────
  useEffect(() => {
    if (paymentStatus === 'success') {
      // Strip query params so refresh doesn't re-show the banner
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, [paymentStatus]);

  // ── Auto-dismiss success banner after 8s ──────────────────────────────
  useEffect(() => {
    if (!paymentSuccess) return;
    const t = setTimeout(() => setPaymentSuccess(false), 8000);
    return () => clearTimeout(t);
  }, [paymentSuccess]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  // ── Fetch services + derive business_id ───────────────────────────────
  useEffect(() => {
    if (!business_slug) return;
    const fetchServices = async () => {
      setServicesLoading(true);
      setError(null);
      try {
        const res = await api.get(`/api/v1/public/${business_slug}/services/`, {
          params: { popular_only: false },
        });
        const raw = Array.isArray(res.data)
          ? res.data
          : res.data?.data ?? res.data?.services ?? res.data?.results ?? [];
        const normalized = raw.map(normalizeService);
        setServices(normalized);

        const bid = normalized.find((s) => s.business_id)?.business_id ?? null;
        if (bid) {
          setBusinessId(bid);
        } else {
          try {
            const bizRes = await api.get(`/api/v1/public/${business_slug}`);
            const fallbackId = bizRes.data?.id ?? bizRes.data?.business_id ?? null;
            if (fallbackId) setBusinessId(fallbackId);
          } catch (_) {}
        }

        if (bidFromQuery) {
          const match = normalized.find((s) => String(s.id) === String(bidFromQuery));
          if (match) { setSelectedService(match); setProgress(65); }
        }

        // If returning from payment with a service name, try to pre-select it
        if (returnService && !bidFromQuery) {
          const match = normalized.find(
            (s) => s.title.toLowerCase() === returnService.toLowerCase()
          );
          if (match) { setSelectedService(match); setProgress(100); }
        }
      } catch (err) {
        const status = err?.response?.status;
        const msg    = err?.response?.data?.message ?? err?.response?.data?.error;
        setError(!err.response
          ? 'Network error — cannot reach the server.'
          : (msg ?? `Error ${status} loading services.`));
      } finally {
        setServicesLoading(false);
      }
    };
    fetchServices();
  }, [business_slug]);

  // ── If payment was successful, inject a confirmation chat message ──────
  useEffect(() => {
    if (!paymentSuccess || !successBookingId) return;
    const msg = `✅ Payment confirmed! Your booking${successServiceName ? ` for **${successServiceName}**` : ''} is all set. Booking ID: **${successBookingId}**. Is there anything else I can help you with?`;
    setChatMessages((prev) => {
      // Avoid duplicate
      if (prev.some((m) => m.text?.includes(successBookingId))) return prev;
      return [...prev, { role: 'assistant', text: msg }];
    });
    setProgress(100);
  }, [paymentSuccess]);

  // ── Start conversation when service selected ──────────────────────────
  useEffect(() => {
    if (!selectedService || !business_slug) return;
    const startConversation = async () => {
      // Don't wipe messages if we just returned from payment
      if (!paymentSuccess) {
        setChatMessages([]);
        setConversationStarted(false);
      }
      setChatLoading(true);
      setDetectedBookingId(null);
      try {
        const res = await api.post('/api/v1/chat/conversations', {
          business_slug,
          service_name:    selectedService.title,
          user_session_id: sessionId,
          channel:         'CHAT',
        });
        const convId = res.data?.id ?? res.data?.conversation_id ?? res.data?.data?.id;
        if (convId) setConversationId(convId);

        const aiReply =
          res.data?.first_message ??
          res.data?.message       ??
          res.data?.reply         ??
          res.data?.data?.message ??
          `Hello! I see you're interested in "${selectedService.title}". What time would work best for you?`;

        if (!paymentSuccess) {
          setChatMessages([{ role: 'assistant', text: aiReply }]);
        }
        setConversationStarted(true);
      } catch {
        if (!paymentSuccess) {
          setChatMessages([{
            role: 'assistant',
            text: `Hello! I see you're interested in "${selectedService.title}". What time would work best for you?`,
          }]);
        }
        setConversationStarted(true);
      } finally {
        setChatLoading(false);
      }
    };
    startConversation();
  }, [selectedService]);

  // ── Extract booking ID from AI text ──────────────────────────────────
  const extractBookingId = (text) => {
    const patterns = [
      /booking\s*(?:id|ID|Id)[:\s#]*([A-Za-z0-9_-]{4,})/i,
      /\b(BK[-_]?[A-Z0-9]{4,})\b/i,
      /\b([A-Z]{2,4}[-_]?[0-9]{4,})\b/,
    ];
    for (const p of patterns) { const m = text.match(p); if (m) return m[1]; }
    return null;
  };

  // ── Trigger payment card ──────────────────────────────────────────────
  const triggerPaymentOptions = async (bookingId) => {
    if (!bookingId || paymentLoading) return;
    setPaymentLoading(true);
    try {
      const response   = await api.post('/api/v1/payments/create-intent', { booking_id: bookingId });
      const paymentUrl = response.data?.payment_url || response.data?.url;
      if (paymentUrl) {
        setChatMessages((prev) => [
          ...prev, { role: 'assistant', type: 'payment_options', bookingId, paymentUrl },
        ]);
      } else {
        setChatMessages((prev) => [
          ...prev, { role: 'assistant', text: "Booking confirmed! However, I couldn't generate a payment link. Please contact support." },
        ]);
      }
    } catch {
      setChatMessages((prev) => [
        ...prev, { role: 'assistant', text: 'There was an error setting up payment. Please try again.' },
      ]);
    } finally {
      setPaymentLoading(false);
    }
  };

  // ── Pay Later ─────────────────────────────────────────────────────────
  const handlePayLater = async (bookingId) => {
    if (!bookingId) return;
    try {
      await api.post('/api/v1/payments/pay-later', { booking_id: bookingId });
      setChatMessages((prev) => [
        ...prev, { role: 'assistant', text: '✅ Got it! Your booking is reserved. You can pay when you arrive.' },
      ]);
    } catch {
      setChatMessages((prev) => [
        ...prev, { role: 'assistant', text: 'Something went wrong with the pay-later option. Please contact us directly.' },
      ]);
    }
  };

  // ── Send message ──────────────────────────────────────────────────────
  const handleSendMessage = async () => {
    const trimmed = message.trim();
    if (!trimmed || chatLoading || !selectedService) return;
    setChatMessages((prev) => [...prev, { role: 'user', text: trimmed }]);
    setMessage('');
    setChatLoading(true);
    try {
      const endpoint = conversationId
        ? `/api/v1/chat/conversations/${conversationId}/messages`
        : '/api/v1/chat/conversations';
      const payload  = conversationId
        ? { message: trimmed }
        : { business_slug, service_name: selectedService.title, user_session_id: sessionId, channel: 'CHAT', message: trimmed };

      const res     = await api.post(endpoint, payload);
      const aiReply =
        res.data?.message ?? res.data?.reply ?? res.data?.data?.message
        ?? "I'm here to help. Could you please clarify?";

      setChatMessages((prev) => [...prev, { role: 'assistant', text: aiReply }]);

      if (!detectedBookingId) {
        const foundId = extractBookingId(aiReply);
        if (foundId) { setDetectedBookingId(foundId); triggerPaymentOptions(foundId); }
      }
    } catch {
      setChatMessages((prev) => [
        ...prev, { role: 'assistant', text: 'Sorry, something went wrong. Please try again.' },
      ]);
    } finally {
      setChatLoading(false);
    }
  };

  const handleKeyDown       = (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendMessage(); } };
  const handleServiceSelect = (s) => { setSelectedService(s); setProgress(65); };

  // ── Navigate to payment page ───────────────────────────────────────────
  // The payment page should redirect back here with:
  //   ?payment=success&booking_id=<id>
  // OR use navigate(-1) with state: { bookingId, serviceName, paymentStatus: 'success' }
  const handleConfirmBooking = () => {
    if (!selectedService) { alert('Please select a service first.'); return; }
    navigate('/paymentsystem', {
      state: {
        serviceId:       selectedService.id,
        serviceName:     selectedService.title,
        price:           selectedService.price,
        selectedTime,
        selectedDate:    'Saturday, Oct 28th',
        businessName:    business?.name ?? business_slug,
        // Tell payment page where to return on success:
        returnPath:      `/${business_slug}?payment=success`,
      },
    });
  };

  // ── Render ─────────────────────────────────────────────────────────────
  return (
    <div className="booking-container">
      <Header icon="check" showThemeToggle={true} />

      {/* Payment success banner — floats at top */}
      {paymentSuccess && (
        <PaymentSuccessBanner
          bookingId={successBookingId}
          serviceName={successServiceName ?? selectedService?.title}
          onDismiss={() => setPaymentSuccess(false)}
        />
      )}

      <main className="maincontent">
        <div className="contentgrid" style={{ maxWidth: '80%', minWidth: '80%' }}>

          {/* ── Left Sidebar ── */}
          <aside className="sidebar">
            <div className="booking-card">
              <div className="card-header">
                <div className="cart-icon"><img src={market} alt="market" /></div>
                <div>
                  <h2 className="card-title" style={{ fontSize: '1.25rem' }}>
                    {servicesLoading ? 'Loading...' : (business?.name || business_slug || 'Booking Inquiry')}
                  </h2>
                  <p className="card-subtitle">
                    {business?.service_type_name || 'Direct Reservation'}
                  </p>
                </div>
              </div>

              <div className="booking-details">
                <div className="section-title-small"
                  style={{ marginBottom: '0.75rem', fontWeight: '600', color: '#1e293b' }}>
                  AVAILABLE SERVICES
                </div>

                {error && <p style={{ fontSize: '0.875rem', color: '#ef4444' }}>{error}</p>}

                <div className="services-list-mini"
                  style={{ maxHeight: '200px', overflowY: 'auto', marginBottom: '1rem', color: 'black', backgroundColor: 'white' }}>
                  {servicesLoading ? (
                    <p style={{ fontSize: '0.875rem' }}>Loading services...</p>
                  ) : services.length === 0 && !error ? (
                    <p style={{ fontSize: '0.875rem' }}>No services available.</p>
                  ) : (
                    services.map((s) => (
                      <div key={s.id}
                        className={`service-item-mini ${selectedService?.id === s.id ? 'active' : ''}`}
                        onClick={() => handleServiceSelect(s)}
                        style={{
                          padding: '0.75rem', borderRadius: '8px', marginBottom: '0.5rem',
                          border:          `1px solid ${selectedService?.id === s.id ? '#2563eb' : '#e2e8f0'}`,
                          cursor:          'pointer',
                          backgroundColor: selectedService?.id === s.id ? '#eff6ff' : 'white',
                          transition:      'all 0.2s',
                        }}>
                        <div style={{ fontSize: '0.875rem', fontWeight: '500' }}>{s.title}</div>
                        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{s.priceDisplay}</div>
                      </div>
                    ))
                  )}
                </div>

                {selectedService && (
                  <>
                    <hr style={{ margin: '1rem 0', border: 'none', borderTop: '1px solid #e2e8f0' }} />
                    <div className="detail-row">
                      <div className="detail-label"><Users className="detail-icon" /><span>Selected Service</span></div>
                      <span className="detail-value">{selectedService.title}</span>
                    </div>
                    {selectedService.priceDisplay && (
                      <div className="detail-row">
                        <div className="detail-label"><DollarSign className="detail-icon" /><span>Price</span></div>
                        <span className="detail-value">{selectedService.priceDisplay}</span>
                      </div>
                    )}
                    {selectedService.location && (
                      <div className="detail-row">
                        <div className="detail-label"><MapPin className="detail-icon" /><span>Location</span></div>
                        <span className="detail-value">{selectedService.location}</span>
                      </div>
                    )}
                    {selectedService.description && (
                      <div className="detail-row" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                        <div className="detail-label"><FileText className="detail-icon" /><span>Description</span></div>
                        <span className="detail-value"
                          style={{ fontSize: '0.875rem', lineHeight: '1.4', marginTop: '0.25rem' }}>
                          {selectedService.description}
                        </span>
                      </div>
                    )}
                  </>
                )}
              </div>

              <div className="progress-section">
                <div className="progress-header">
                  <span className="progress-label">BOOKING PROGRESS</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${progress}%` }} />
                </div>
                <p className="progress-text">
                  {progress === 100
                    ? '✅ Booking complete!'
                    : 'Almost there! Select your preferred time.'}
                </p>
              </div>
            </div>

            <div className="confirmation-card">
              <div className="confirmation-icon"><CheckCircle className="check-icon" /></div>
              <div>
                <h3 className="confirmation-title">Instant Confirmation</h3>
                <p className="confirmation-text">
                  Your booking will be confirmed immediately after you pick a time. No phone calls required.
                </p>
              </div>
            </div>
          </aside>

          {/* ── Right — Chat + Voice ── */}
          <section className="chat-section">
            <div className="chat-container">

              {/* Chat Header */}
              <div className="chat-header">
                <div className="assistant-info">
                  <div className="assistant-avatar"><div className="avatar-circle" /></div>
                  <div>
                    <h3 className="assistant-name">AI Booking Assistant</h3>
                    <p className="assistant-status">
                      <span className="status-indicator" />
                      Live &amp; Ready to help
                    </p>
                  </div>
                </div>

                <button
                  className="start-call-btn"
                  onClick={() => {
                    if (!selectedService) {
                      alert('Please select a service first');
                      return;
                    }
                    setShowVoiceCall(true);
                  }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '6px',
                    background: !selectedService ? '#94a3b8' : '#10b981',
                    color: 'white', border: 'none', borderRadius: '8px',
                    padding: '8px 14px', fontWeight: '600', fontSize: '0.875rem',
                    cursor: !selectedService ? 'not-allowed' : 'pointer',
                    opacity: !selectedService ? 0.65 : 1,
                    transition: 'background 0.2s', minWidth: '120px', justifyContent: 'center',
                  }}
                >
                  <Phone size={14} />
                  Start Call
                </button>
              </div>

              {/* Chat Messages */}
              <div className="chat-messages" style={{ maxWidth: '100%', minWidth: '100%' }}>

                {!selectedService && (
                  <div className="message-group">
                    <div className="message assistant-message">
                      <div className="message-avatar"><div className="avatar-small" /></div>
                      <div className="message-bubble">
                        Hello! I can help you book a service with {business?.name ?? 'us'}. Please select a service from the list to get started.
                      </div>
                    </div>
                  </div>
                )}

                {chatLoading && chatMessages.length === 0 && (
                  <div className="message-group">
                    <div className="message assistant-message">
                      <div className="message-avatar"><div className="avatar-small" /></div>
                      <div className="message-bubble" style={{ color: '#94a3b8', fontStyle: 'italic' }}>
                        Connecting to assistant…
                      </div>
                    </div>
                  </div>
                )}

                {chatMessages.map((msg, idx) => (
                  <div key={idx} className={`message-group ${msg.role === 'user' ? 'user-group' : ''}`}>
                    <div className={`message ${msg.role === 'user' ? 'user-message' : 'assistant-message'}`}>
                      {msg.role === 'assistant' && (
                        <div className="message-avatar"><div className="avatar-small" /></div>
                      )}
                      {msg.type === 'payment_options' ? (
                        <div className="message-bubble" style={{ padding: 0, overflow: 'hidden' }}>
                          <PaymentOptionsCard
                            bookingId={msg.bookingId}
                            paymentUrl={msg.paymentUrl}
                            onPayLater={handlePayLater}
                          />
                        </div>
                      ) : (
                        <div className={`message-bubble ${msg.role === 'user' ? 'user-bubble' : ''}`}>
                          {msg.text}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {chatLoading && chatMessages.length > 0 && (
                  <div className="message-group">
                    <div className="message assistant-message">
                      <div className="message-avatar"><div className="avatar-small" /></div>
                      <div className="message-bubble" style={{ color: '#94a3b8', fontStyle: 'italic' }}>Typing…</div>
                    </div>
                  </div>
                )}

                {paymentLoading && (
                  <div className="message-group">
                    <div className="message assistant-message">
                      <div className="message-avatar"><div className="avatar-small" /></div>
                      <div className="message-bubble" style={{ color: '#94a3b8', fontStyle: 'italic' }}>Generating payment options…</div>
                    </div>
                  </div>
                )}

                <div ref={chatEndRef} />
              </div>

              {/* Chat Input */}
              <div className="chat-input-container">
                <div className="chat-input-wrapper">
                  <button className="input-action-btn"><Smile className="input-icon" /></button>
                  <button className="input-action-btn"><Paperclip className="input-icon" /></button>
                  <input
                    type="text"
                    placeholder={selectedService ? 'Type a message…' : 'Select a service to start chatting…'}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="chat-input"
                    disabled={!selectedService || chatLoading}
                  />
                  <button
                    className="sending-btn"
                    onClick={handleSendMessage}
                    disabled={!selectedService || chatLoading || !message.trim()}
                  >
                    <img src={sending} alt="Send" />
                  </button>
                </div>
                <p className="powered-by">POWERED BY ADVANCED AI LOGIC</p>
              </div>

            </div>
          </section>

        </div>
      </main>

      {/* Voice Call Modal */}
      {showVoiceCall && selectedService && (
        <VoiceCallModal
          businessSlug={business_slug}
          serviceName={selectedService.title}
          onClose={() => setShowVoiceCall(false)}
          onHandoffToChat={({ conversationId }) => {
            setShowVoiceCall(false);
            if (conversationId) {
              setConversationId(conversationId);
            }
          }}
        />
      )}
    </div>
  );
}