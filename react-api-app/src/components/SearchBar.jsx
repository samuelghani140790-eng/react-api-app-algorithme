import React, { useState, useEffect } from 'react';

const SearchBar = ({ value, onChange }) => {
  const [localValue, setLocalValue] = useState(value);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(localValue);
    }, 350);
    return () => clearTimeout(timer);
  }, [localValue]);

  // Sync external value
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  return (
    <div className="relative w-full max-w-xl mx-auto">
      {/* Search icon */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
        <svg className="w-5 h-5" fill="none" stroke="#4f46e5" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
      </div>

      <input
        type="text"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        placeholder="Search Pokémon by name or ID..."
        className="search-input w-full pl-12 pr-12 py-3 md:py-4 rounded-2xl font-body text-base md:text-lg outline-none transition-all duration-300"
        style={{
          background: '#12121a',
          border: '1px solid rgba(99,102,241,0.25)',
          color: '#e2e8f0',
          letterSpacing: '0.03em',
        }}
      />

      {/* Clear button */}
      {localValue && (
        <button
          onClick={() => setLocalValue('')}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full transition-all hover:scale-110"
          style={{ background: 'rgba(99,102,241,0.2)', color: '#818cf8' }}
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default SearchBar;
