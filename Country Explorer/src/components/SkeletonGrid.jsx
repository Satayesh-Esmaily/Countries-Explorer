export default function SkeletonGrid() {
  return (
    <div className="countries-container">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="skeleton-card">
          
          <div className="skeleton-line full" style={{ height: "55%", borderRadius: 0 }} />

          <div className="skeleton-content">
            <div className="skeleton-line medium" />
            <div className="skeleton-line short" />
          </div>
        </div>
      ))}
    </div>
  );
}
