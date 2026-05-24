import React, { useState } from 'react';
import { usePokemonDashboard } from './hooks/usePokemonDashboard';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import TypeFilter from './components/TypeFilter';
import PokemonCard from './components/PokemonCard';
import PokemonModal from './components/PokemonModal';
import Skeleton from './components/Skeleton';
import ErrorMessage from './components/ErrorMessage';
import Pagination from './components/Pagination';

const ITEMS_PER_PAGE = 20;

const App = () => {
  const {
    displayedPokemon,
    types,
    selectedType,
    searchQuery,
    currentPage,
    totalPages,
    filteredTotal,
    totalCount,
    initialLoading,
    pageLoading,
    error,
    handleTypeChange,
    handleSearch,
    handlePageChange,
  } = usePokemonDashboard();

  const [selectedPokemon, setSelectedPokemon] = useState(null);

  // Initial full page loading state
  if (initialLoading) {
    return (
      <div className="min-h-screen hex-bg flex flex-col">
        <Header totalCount={0} />
        <div className="flex-1 flex flex-col items-center justify-center gap-6 pb-20">
          {/* Pokeball loader */}
          <div className="relative w-20 h-20">
            <svg viewBox="0 0 100 100" className="w-full h-full pokeball-spin" style={{ filter: 'drop-shadow(0 0 20px rgba(99,102,241,0.5))' }}>
              <circle cx="50" cy="50" r="45" fill="none" stroke="#4f46e5" strokeWidth="6"/>
              <line x1="5" y1="50" x2="95" y2="50" stroke="#4f46e5" strokeWidth="6"/>
              <circle cx="50" cy="50" r="16" fill="none" stroke="#4f46e5" strokeWidth="6"/>
              <circle cx="50" cy="50" r="8" fill="#4f46e5"/>
              <path d="M5,50 A45,45 0 0,1 95,50" fill="rgba(79,70,229,0.15)"/>
            </svg>
          </div>
          <p className="font-display text-sm tracking-widest" style={{ color: '#4f46e5' }}>
            LOADING POKÉDEX...
          </p>
        </div>
      </div>
    );
  }

  if (error && displayedPokemon.length === 0) {
    return (
      <div className="min-h-screen hex-bg">
        <Header totalCount={totalCount} />
        <ErrorMessage message={error} onRetry={() => window.location.reload()} />
      </div>
    );
  }

  return (
    <div className="min-h-screen hex-bg">
      {/* Header */}
      <Header totalCount={totalCount} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 pb-12">

        {/* Search & Filter Panel */}
        <div
          className="sticky top-0 z-30 py-4 mb-6"
          style={{
            background: 'rgba(10, 10, 15, 0.95)',
            backdropFilter: 'blur(12px)',
            borderBottom: '1px solid rgba(99,102,241,0.1)',
            marginLeft: '-1rem',
            marginRight: '-1rem',
            paddingLeft: '1rem',
            paddingRight: '1rem',
          }}
        >
          <SearchBar value={searchQuery} onChange={handleSearch} />
          
          <div className="mt-4">
            <TypeFilter
              types={types}
              selectedType={selectedType}
              onTypeChange={handleTypeChange}
            />
          </div>

          {/* Results info bar */}
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-2">
              {(searchQuery || selectedType) && (
                <span className="font-body text-sm" style={{ color: '#475569' }}>
                  Found{' '}
                  <span className="font-bold" style={{ color: '#818cf8' }}>
                    {filteredTotal.toLocaleString()}
                  </span>{' '}
                  Pokémon
                  {selectedType && (
                    <span style={{ color: '#64748b' }}> of type <strong style={{ color: '#818cf8' }}>{selectedType}</strong></span>
                  )}
                  {searchQuery && (
                    <span style={{ color: '#64748b' }}> matching <strong style={{ color: '#818cf8' }}>"{searchQuery}"</strong></span>
                  )}
                </span>
              )}
            </div>

            {/* Clear filters */}
            {(searchQuery || selectedType) && (
              <button
                onClick={() => {
                  handleSearch('');
                  handleTypeChange('');
                }}
                className="font-body text-xs px-3 py-1 rounded-lg transition-all hover:scale-105"
                style={{ background: 'rgba(99,102,241,0.1)', color: '#818cf8', border: '1px solid rgba(99,102,241,0.2)' }}
              >
                Clear filters ✕
              </button>
            )}
          </div>
        </div>

        {/* Empty state */}
        {!pageLoading && displayedPokemon.length === 0 && filteredTotal === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center animate-fadeIn">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="font-display text-xl font-bold mb-2" style={{ color: '#475569' }}>
              NO RESULTS FOUND
            </h3>
            <p className="font-body text-base" style={{ color: '#334155' }}>
              Try a different search term or type filter.
            </p>
          </div>
        )}

        {/* Pokemon Grid */}
        {pageLoading ? (
          <Skeleton count={ITEMS_PER_PAGE} />
        ) : (
          <div className="pokemon-grid">
            {displayedPokemon.map((pokemon) => (
              <PokemonCard
                key={pokemon.id}
                pokemon={pokemon}
                onClick={setSelectedPokemon}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {!pageLoading && totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            filteredTotal={filteredTotal}
            onPageChange={handlePageChange}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="text-center py-6 px-4" style={{ borderTop: '1px solid rgba(99,102,241,0.1)' }}>
        <p className="font-body text-sm" style={{ color: '#334155' }}>
          Built with{' '}
          <span style={{ color: '#818cf8' }}>React</span>
          {' '}+{' '}
          <span style={{ color: '#818cf8' }}>Tailwind CSS</span>
          {' '}·{' '}
          Data from{' '}
          <a href="https://pokeapi.co" target="_blank" rel="noopener noreferrer"
            className="underline transition-colors hover:text-indigo-400" style={{ color: '#4f46e5' }}>
            PokéAPI
          </a>
        </p>
      </footer>

      {/* Pokemon Detail Modal */}
      {selectedPokemon && (
        <PokemonModal
          pokemon={selectedPokemon}
          onClose={() => setSelectedPokemon(null)}
        />
      )}
    </div>
  );
};

export default App;
