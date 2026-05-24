import React from 'react';

const ErrorMessage = ({ message, onRetry }) => (
  <div className="flex flex-col items-center justify-center py-20 px-4 text-center animate-fadeIn">
    {/* Error icon */}
    <div className="w-20 h-20 rounded-full flex items-center justify-center mb-5"
      style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
      <svg className="w-10 h-10" fill="none" stroke="#ef4444" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"/>
      </svg>
    </div>

    <h3 className="font-display text-xl font-bold mb-2" style={{ color: '#ef4444' }}>
      CONNECTION ERROR
    </h3>
    <p className="text-base mb-6 max-w-sm" style={{ color: '#64748b' }}>
      {message || 'Something went wrong loading the Pokédex data.'}
    </p>

    {onRetry && (
      <button
        onClick={onRetry}
        className="px-6 py-3 rounded-xl font-display font-bold text-sm tracking-widest transition-all hover:scale-105"
        style={{
          background: 'rgba(239, 68, 68, 0.15)',
          color: '#ef4444',
          border: '1px solid rgba(239, 68, 68, 0.3)',
        }}
      >
        RETRY
      </button>
    )}
  </div>
);

export default ErrorMessage;
