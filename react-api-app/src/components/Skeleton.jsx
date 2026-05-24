import React from 'react';

const SkeletonCard = () => (
  <div
    className="rounded-2xl p-4 overflow-hidden"
    style={{ background: '#12121a', border: '1px solid rgba(99,102,241,0.1)' }}
  >
    {/* ID row */}
    <div className="flex justify-between mb-2">
      <div className="shimmer h-3 w-12 rounded" />
      <div className="shimmer h-3 w-3 rounded-full" />
    </div>
    {/* Image placeholder */}
    <div className="shimmer h-28 w-28 rounded-full mx-auto my-3" />
    {/* Name */}
    <div className="shimmer h-4 w-3/4 rounded mx-auto mb-3" />
    {/* Type badges */}
    <div className="flex gap-2 justify-center mb-3">
      <div className="shimmer h-5 w-14 rounded-full" />
      <div className="shimmer h-5 w-14 rounded-full" />
    </div>
    {/* Stats */}
    <div className="space-y-1.5">
      <div className="flex gap-2 items-center">
        <div className="shimmer h-2 w-5 rounded" />
        <div className="shimmer h-1.5 flex-1 rounded-full" />
        <div className="shimmer h-2 w-6 rounded" />
      </div>
      <div className="flex gap-2 items-center">
        <div className="shimmer h-2 w-5 rounded" />
        <div className="shimmer h-1.5 flex-1 rounded-full" />
        <div className="shimmer h-2 w-6 rounded" />
      </div>
    </div>
  </div>
);

const Skeleton = ({ count = 20 }) => (
  <div className="pokemon-grid">
    {Array.from({ length: count }).map((_, i) => (
      <SkeletonCard key={i} />
    ))}
  </div>
);

export default Skeleton;
