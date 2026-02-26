// ─────────────────────────────────────────────────────────────────────────────
// CallButton.jsx  — drop-in replacement for the "Start Call" button
//
// Usage (already integrated below in BookingAssistant):
//   import CallButton from './CallButton';
//   <CallButton business_slug={business_slug} selectedService={selectedService} sessionId={sessionId} />
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import { Phone, PhoneOff, Mic, MicOff, Loader } from 'lucide-react';
import { useTwilioVoice, CALL_STATE } from './useTwilioVoice';

// ── Tiny helper: format seconds → "mm:ss" ─────────────────────────────────
function formatDuration(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

// ── Label + colour per state ───────────────────────────────────────────────
const STATE_LABEL = {
  [CALL_STATE.IDLE]:       { label: 'Start Call',  bg: '#2563eb', icon: 'phone'    },
  [CALL_STATE.CONNECTING]: { label: 'Connecting…', bg: '#64748b', icon: 'loading'  },
  [CALL_STATE.RINGING]:    { label: 'Ringing…',    bg: '#f59e0b', icon: 'loading'  },
  [CALL_STATE.IN_CALL]:    { label: 'End Call',    bg: '#dc2626', icon: 'phone-off'},
  [CALL_STATE.ENDED]:      { label: 'Call Ended',  bg: '#64748b', icon: 'phone'    },
};

export default function CallButton({ business_slug, selectedService, sessionId }) {
  const {
    callState,
    startCall,
    endCall,
    isMuted,
    toggleMute,
    callDuration,
    error,
  } = useTwilioVoice({ business_slug, selectedService, sessionId });

  const isActive   = callState === CALL_STATE.IN_CALL;
  const isBusy     = callState === CALL_STATE.CONNECTING || callState === CALL_STATE.RINGING;
  const { label, bg, icon } = STATE_LABEL[callState] ?? STATE_LABEL[CALL_STATE.IDLE];

  const handleMainClick = () => {
    if (callState === CALL_STATE.IDLE || callState === CALL_STATE.ENDED) startCall();
    else if (isActive || isBusy) endCall();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>

      {/* ── Error banner ── */}
      {error && (
        <span style={{ fontSize: '0.7rem', color: '#ef4444', maxWidth: '200px', textAlign: 'right' }}>
          ⚠ {error}
        </span>
      )}

      {/* ── In-call controls row ── */}
      {isActive && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {/* Duration */}
          <span style={{
            fontSize: '0.75rem',
            fontWeight: '600',
            color: '#16a34a',
            background: '#f0fdf4',
            padding: '2px 8px',
            borderRadius: '999px',
            border: '1px solid #86efac',
          }}>
            🔴 {formatDuration(callDuration)}
          </span>

          {/* Mute button */}
          <button
            onClick={toggleMute}
            title={isMuted ? 'Unmute' : 'Mute'}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              border: 'none',
              cursor: 'pointer',
              background: isMuted ? '#fef2f2' : '#f1f5f9',
              color: isMuted ? '#dc2626' : '#475569',
              transition: 'all 0.15s',
            }}
          >
            {isMuted ? <MicOff size={15} /> : <Mic size={15} />}
          </button>
        </div>
      )}

      {/* ── Main call button ── */}
      <button
        className="start-call-btn"
        onClick={handleMainClick}
        disabled={callState === CALL_STATE.ENDED}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          background: bg,
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          padding: '8px 14px',
          fontWeight: '600',
          fontSize: '0.875rem',
          cursor: callState === CALL_STATE.ENDED ? 'default' : 'pointer',
          opacity: callState === CALL_STATE.ENDED ? 0.7 : 1,
          transition: 'background 0.2s',
          minWidth: '120px',
          justifyContent: 'center',
        }}
      >
        {icon === 'loading' && (
          <Loader size={15} style={{ animation: 'spin 1s linear infinite' }} />
        )}
        {icon === 'phone' && <Phone size={15} />}
        {icon === 'phone-off' && <PhoneOff size={15} />}
        {label}
      </button>

      {/* Spin keyframe — injected once */}
      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}