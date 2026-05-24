import React, { useEffect, useState } from 'react';
import { getTypeColor, STAT_LABELS } from '../utils/constants';
import { getOfficialArtwork } from '../utils/api';

const PokemonModal = ({ pokemon, onClose }) => {
  const [animateStats, setAnimateStats] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const timer = setTimeout(() => setAnimateStats(true), 300);
    return () => {
      document.body.style.overflow = '';
      clearTimeout(timer);
    };
  }, []);

  const handleBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const primaryType = pokemon.types[0]?.type?.name || 'normal';
  const colors = getTypeColor(primaryType);
  const id = pokemon.id;
  const imgUrl = getOfficialArtwork(id);

  const totalStats = pokemon.stats.reduce((sum, s) => sum + s.base_stat, 0);

  return (
    <div
      className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn"
      onClick={handleBackdrop}
    >
      <div
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl animate-slideUp"
        style={{
          background: `linear-gradient(160deg, #12121a 0%, #1a1a2e 50%, ${colors.card} 100%)`,
          border: `1px solid ${colors.border}`,
          boxShadow: `0 20px 60px rgba(0,0,0,0.6), 0 0 40px ${colors.card}`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
          style={{ background: 'rgba(99,102,241,0.2)', color: '#818cf8' }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Header with image */}
        <div className="relative pt-8 pb-4 px-6 text-center overflow-hidden">
          {/* BG decoration */}
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <svg viewBox="0 0 200 200" className="w-48 h-48 absolute -top-8 -right-8 opacity-20">
              <circle cx="100" cy="100" r="90" fill="none" stroke={colors.bg} strokeWidth="8"/>
              <line x1="10" y1="100" x2="190" y2="100" stroke={colors.bg} strokeWidth="8"/>
              <circle cx="100" cy="100" r="25" fill="none" stroke={colors.bg} strokeWidth="8"/>
              <circle cx="100" cy="100" r="12" fill={colors.bg}/>
            </svg>
          </div>

          <p className="font-display text-sm mb-1" style={{ color: `${colors.bg}aa`, letterSpacing: '0.2em' }}>
            #{String(id).padStart(4, '0')}
          </p>

          <img
            src={imgUrl}
            alt={pokemon.name}
            className="w-44 h-44 object-contain mx-auto animate-float"
            style={{ filter: `drop-shadow(0 8px 24px ${colors.bg}60)` }}
            onError={(e) => {
              e.target.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
            }}
          />

          <h2 className="font-display text-2xl font-black capitalize mt-2" style={{ color: '#e2e8f0' }}>
            {pokemon.name.replace(/-/g, ' ')}
          </h2>

          {/* Types */}
          <div className="flex justify-center gap-2 mt-2">
            {pokemon.types.map((t) => {
              const tc = getTypeColor(t.type.name);
              return (
                <span key={t.type.name} className="type-badge" style={{ background: tc.bg, color: tc.text }}>
                  {t.type.name}
                </span>
              );
            })}
          </div>
        </div>

        {/* Info grid */}
        <div className="px-6 pb-2">
          <div className="grid grid-cols-3 gap-3 mb-5">
            {[
              { label: 'HEIGHT', value: `${(pokemon.height / 10).toFixed(1)} m` },
              { label: 'WEIGHT', value: `${(pokemon.weight / 10).toFixed(1)} kg` },
              { label: 'BASE XP', value: pokemon.base_experience ?? '—' },
            ].map(({ label, value }) => (
              <div key={label} className="text-center p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <p className="font-display text-xs" style={{ color: '#475569', letterSpacing: '0.1em' }}>{label}</p>
                <p className="font-display font-bold text-sm mt-1" style={{ color: colors.bg }}>{value}</p>
              </div>
            ))}
          </div>

          {/* Abilities */}
          <div className="mb-5">
            <h3 className="font-display text-xs uppercase tracking-widest mb-2" style={{ color: '#475569' }}>Abilities</h3>
            <div className="flex flex-wrap gap-2">
              {pokemon.abilities.map((a) => (
                <span
                  key={a.ability.name}
                  className="px-3 py-1.5 rounded-xl text-sm font-semibold capitalize"
                  style={{
                    background: a.is_hidden ? `${colors.bg}20` : 'rgba(255,255,255,0.06)',
                    color: a.is_hidden ? colors.bg : '#94a3b8',
                    border: `1px solid ${a.is_hidden ? `${colors.bg}40` : 'rgba(255,255,255,0.1)'}`,
                  }}
                >
                  {a.ability.name.replace(/-/g, ' ')}
                  {a.is_hidden && <span className="ml-1 text-xs opacity-70">(hidden)</span>}
                </span>
              ))}
            </div>
          </div>

          {/* Base Stats */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-display text-xs uppercase tracking-widest" style={{ color: '#475569' }}>Base Stats</h3>
              <span className="font-display text-xs" style={{ color: colors.bg }}>
                TOTAL: <strong>{totalStats}</strong>
              </span>
            </div>
            <div className="space-y-2.5">
              {pokemon.stats.map((stat) => {
                const pct = Math.min((stat.base_stat / 255) * 100, 100);
                const label = STAT_LABELS[stat.stat.name] || stat.stat.name.toUpperCase();
                return (
                  <div key={stat.stat.name} className="flex items-center gap-3">
                    <span className="font-body font-bold text-xs w-14 flex-shrink-0" style={{ color: '#64748b' }}>{label}</span>
                    <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                      <div
                        className="h-full rounded-full transition-all duration-1000"
                        style={{
                          width: animateStats ? `${pct}%` : '0%',
                          background: `linear-gradient(to right, ${colors.bg}, ${colors.bg}aa)`,
                          boxShadow: `0 0 8px ${colors.bg}60`,
                        }}
                      />
                    </div>
                    <span className="font-display text-xs w-8 text-right" style={{ color: '#94a3b8' }}>
                      {stat.base_stat}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonModal;
