import React, { useState } from 'react';
import { getTypeColor } from '../utils/constants';

const TypeFilter = ({ types, selectedType, onTypeChange }) => {
  const [expanded, setExpanded] = useState(false);

  const visibleTypes = expanded ? types : types.slice(0, 9);

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-3">
        <svg className="w-4 h-4" fill="none" stroke="#4f46e5" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M3 6h18M7 12h10M11 18h2" />
        </svg>
        <span className="font-body text-sm font-semibold uppercase tracking-widest" style={{ color: '#475569' }}>
          Filter by Type
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {/* All button */}
        <button
          onClick={() => onTypeChange('')}
          className="type-badge transition-all duration-200 hover:scale-105 border"
          style={{
            background: selectedType === '' ? '#4f46e5' : 'transparent',
            color: selectedType === '' ? '#fff' : '#818cf8',
            borderColor: selectedType === '' ? '#4f46e5' : 'rgba(99,102,241,0.3)',
          }}
        >
          ALL
        </button>

        {/* Type buttons */}
        {visibleTypes.map((type) => {
          const colors = getTypeColor(type.name);
          const isSelected = selectedType === type.name;
          return (
            <button
              key={type.name}
              onClick={() => onTypeChange(isSelected ? '' : type.name)}
              className="type-badge transition-all duration-200 hover:scale-105 border"
              style={{
                background: isSelected ? colors.bg : 'transparent',
                color: isSelected ? colors.text : colors.bg,
                borderColor: isSelected ? colors.bg : `${colors.bg}60`,
                boxShadow: isSelected ? `0 0 12px ${colors.bg}60` : 'none',
              }}
            >
              {type.name.toUpperCase()}
            </button>
          );
        })}

        {/* Show more/less */}
        {types.length > 9 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="type-badge transition-all duration-200 hover:scale-105 border"
            style={{
              background: 'transparent',
              color: '#64748b',
              borderColor: 'rgba(99,102,241,0.2)',
              fontStyle: 'italic',
            }}
          >
            {expanded ? '− LESS' : `+ ${types.length - 9} MORE`}
          </button>
        )}
      </div>
    </div>
  );
};

export default TypeFilter;
