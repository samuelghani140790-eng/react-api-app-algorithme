import React from 'react';

const Header = ({ totalCount }) => {
  return (
    <header className="relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, #818cf8, transparent)' }} />
        <div className="absolute -top-10 -left-10 w-60 h-60 rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, #f472b6, transparent)' }} />
      </div>

      <div className="relative z-10 px-4 py-8 md:py-12 text-center">
        {/* Pokeball decoration */}
        <div className="flex justify-center mb-4">
          <div className="relative w-16 h-16 md:w-20 md:h-20">
            <svg viewBox="0 0 100 100" className="w-full h-full animate-spin-slow opacity-80">
              <circle cx="50" cy="50" r="48" fill="none" stroke="#818cf8" strokeWidth="4"/>
              <line x1="2" y1="50" x2="98" y2="50" stroke="#818cf8" strokeWidth="4"/>
              <circle cx="50" cy="50" r="14" fill="none" stroke="#818cf8" strokeWidth="4"/>
              <circle cx="50" cy="50" r="8" fill="#818cf8"/>
              <path d="M2,50 A48,48 0 0,1 98,50" fill="rgba(129,140,248,0.1)"/>
            </svg>
          </div>
        </div>

        {/* Title */}
        <h1 className="font-display text-3xl md:text-5xl font-black tracking-wider mb-2 glow-text"
          style={{ color: '#a5b4fc', letterSpacing: '0.08em' }}>
          POKÉDEX
        </h1>
        <p className="font-display text-xs md:text-sm tracking-widest uppercase mb-3"
          style={{ color: '#4f46e5', letterSpacing: '0.3em' }}>
          DASHBOARD
        </p>
        
        {/* Subtitle */}
        <p className="text-base md:text-lg font-body" style={{ color: '#64748b' }}>
          Explore all{' '}
          <span className="font-semibold" style={{ color: '#818cf8' }}>
            {totalCount.toLocaleString()}
          </span>{' '}
          Pokémon in the database
        </p>

        {/* Decorative line */}
        <div className="flex items-center justify-center gap-3 mt-5">
          <div className="h-px flex-1 max-w-24" style={{ background: 'linear-gradient(to right, transparent, #3730a3)' }} />
          <div className="w-2 h-2 rotate-45" style={{ background: '#818cf8' }} />
          <div className="h-px flex-1 max-w-24" style={{ background: 'linear-gradient(to left, transparent, #3730a3)' }} />
        </div>
      </div>
    </header>
  );
};

export default Header;
