import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange, filteredTotal }) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const pages = getPageNumbers();

  return (
    <div className="flex flex-col items-center gap-4 py-8">
      {/* Info */}
      <p className="font-body text-sm" style={{ color: '#475569' }}>
        Showing page{' '}
        <span className="font-bold" style={{ color: '#818cf8' }}>{currentPage}</span>
        {' '}of{' '}
        <span className="font-bold" style={{ color: '#818cf8' }}>{totalPages}</span>
        {' '}—{' '}
        <span style={{ color: '#64748b' }}>{filteredTotal.toLocaleString()} results</span>
      </p>

      {/* Buttons */}
      <div className="flex items-center gap-1.5">
        {/* Prev */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="page-btn w-9 h-9 rounded-xl flex items-center justify-center font-display text-sm disabled:opacity-30 disabled:cursor-not-allowed"
          style={{ background: 'rgba(99,102,241,0.1)', color: '#818cf8', border: '1px solid rgba(99,102,241,0.2)' }}
        >
          ‹
        </button>

        {/* Page numbers */}
        {pages.map((page, idx) => (
          page === '...' ? (
            <span key={`dot-${idx}`} className="w-9 h-9 flex items-center justify-center text-sm" style={{ color: '#475569' }}>
              ···
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className="page-btn w-9 h-9 rounded-xl flex items-center justify-center font-display text-xs font-bold transition-all"
              style={{
                background: page === currentPage ? '#4f46e5' : 'rgba(99,102,241,0.08)',
                color: page === currentPage ? '#fff' : '#64748b',
                border: page === currentPage ? '1px solid #4f46e5' : '1px solid rgba(99,102,241,0.15)',
                boxShadow: page === currentPage ? '0 0 16px rgba(79,70,229,0.4)' : 'none',
              }}
            >
              {page}
            </button>
          )
        ))}

        {/* Next */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="page-btn w-9 h-9 rounded-xl flex items-center justify-center font-display text-sm disabled:opacity-30 disabled:cursor-not-allowed"
          style={{ background: 'rgba(99,102,241,0.1)', color: '#818cf8', border: '1px solid rgba(99,102,241,0.2)' }}
        >
          ›
        </button>
      </div>

      {/* Jump to page - only show if many pages */}
      {totalPages > 10 && (
        <div className="flex items-center gap-2">
          <span className="font-body text-xs" style={{ color: '#475569' }}>Jump to:</span>
          <input
            type="number"
            min={1}
            max={totalPages}
            defaultValue={currentPage}
            key={currentPage}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                const val = parseInt(e.target.value);
                if (val >= 1 && val <= totalPages) onPageChange(val);
              }
            }}
            className="w-16 px-2 py-1 rounded-lg text-center text-xs font-display outline-none"
            style={{
              background: '#12121a',
              border: '1px solid rgba(99,102,241,0.25)',
              color: '#818cf8',
            }}
          />
          <span className="font-body text-xs" style={{ color: '#475569' }}>/ {totalPages}</span>
        </div>
      )}
    </div>
  );
};

export default Pagination;
