export default function SkeletonGrid() {
  return (
    <div className="countries-container">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="glass-card">
          <div className="skeleton" style={{ height: "55%" }} />
          <div style={{ padding: "12px" }}>
            <div className="skeleton" style={{ height: 16, width: "70%", marginBottom: 6 }} />
            <div className="skeleton" style={{ height: 14, width: "50%" }} />
          </div>
        </div>
      ))}
    </div>
  );
}
