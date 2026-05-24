import React, { useState } from 'react';
import { getTypeColor } from '../utils/constants';
import { getOfficialArtwork } from '../utils/api';

const PokemonCard = ({ pokemon, onClick }) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const primaryType = pokemon.types[0]?.type?.name || 'normal';
  const colors = getTypeColor(primaryType);
  const id = pokemon.id;
  const imgUrl = getOfficialArtwork(id);
  const fallbackImg = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

  return (
    <div
      className="pokemon-card cursor-pointer rounded-2xl p-4 relative overflow-hidden animate-fadeIn"
      style={{
        background: `linear-gradient(135deg, #12121a 0%, ${colors.card} 100%)`,
        border: `1px solid ${colors.border}`,
        boxShadow: `0 4px 20px ${colors.card}`,
      }}
      onClick={() => onClick(pokemon)}
    >
      {/* Background decorative circle */}
      <div
        className="absolute -bottom-6 -right-6 w-28 h-28 rounded-full opacity-10 pointer-events-none"
        style={{ background: colors.bg }}
      />
      <div
        className="absolute -top-4 -left-4 w-16 h-16 rounded-full opacity-5 pointer-events-none"
        style={{ background: colors.bg }}
      />

      {/* ID Badge */}
      <div className="flex justify-between items-start mb-1">
        <span
          className="id-badge font-display font-bold"
          style={{ color: `${colors.bg}99` }}
        >
          #{String(id).padStart(4, '0')}
        </span>
        {/* Fav indicator dot */}
        <div className="w-2 h-2 rounded-full" style={{ background: colors.bg, opacity: 0.7 }} />
      </div>

      {/* Pokemon Image */}
      <div className="relative flex justify-center items-center h-28 md:h-32 my-2">
        {!imgLoaded && !imgError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 rounded-full border-2 border-t-transparent animate-spin"
              style={{ borderColor: `${colors.bg}40`, borderTopColor: colors.bg }} />
          </div>
        )}
        <img
          src={imgError ? fallbackImg : imgUrl}
          alt={pokemon.name}
          className={`h-28 md:h-32 w-auto object-contain transition-all duration-500 drop-shadow-lg ${
            imgLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
          }`}
          style={{ filter: imgLoaded ? 'drop-shadow(0 4px 12px rgba(0,0,0,0.4))' : 'none' }}
          onLoad={() => setImgLoaded(true)}
          onError={() => {
            if (!imgError) {
              setImgError(true);
              setImgLoaded(false);
            } else {
              setImgLoaded(true);
            }
          }}
        />
      </div>

      {/* Pokemon Name */}
      <h3
        className="font-display text-sm font-bold text-center capitalize truncate mt-1"
        style={{ color: '#e2e8f0', letterSpacing: '0.05em' }}
      >
        {pokemon.name.replace(/-/g, ' ')}
      </h3>

      {/* Type Badges */}
      <div className="flex justify-center gap-1.5 mt-2 flex-wrap">
        {pokemon.types.map((t) => {
          const tc = getTypeColor(t.type.name);
          return (
            <span
              key={t.type.name}
              className="type-badge"
              style={{ background: tc.bg, color: tc.text }}
            >
              {t.type.name}
            </span>
          );
        })}
      </div>

      {/* Mini stat bars */}
      <div className="mt-3 space-y-1">
        {pokemon.stats.slice(0, 2).map((stat) => {
          const pct = Math.min((stat.base_stat / 255) * 100, 100);
          return (
            <div key={stat.stat.name} className="flex items-center gap-2">
              <span className="text-xs w-5 flex-shrink-0" style={{ color: colors.bg, fontFamily: 'Rajdhani', fontWeight: 700 }}>
                {stat.stat.name === 'hp' ? 'HP' : stat.stat.name === 'attack' ? 'AT' : ''}
              </span>
              <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
                <div
                  className="h-full rounded-full transition-all duration-1000"
                  style={{ width: `${pct}%`, background: colors.bg }}
                />
              </div>
              <span className="text-xs w-6 text-right" style={{ color: '#64748b', fontFamily: 'Rajdhani' }}>
                {stat.base_stat}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PokemonCard;
