function Tabs({ activeTab, setActiveTab }) {
  return (
    <div className="tabs">
      <button
        className={`tab-btn ${activeTab === "all" ? "active" : ""}`}
        onClick={() => setActiveTab("all")}
      >
        All Countries
      </button>

      <button
        className={`tab-btn ${activeTab === "favorites" ? "active" : ""}`}
        onClick={() => setActiveTab("favorites")}
      >
        Favorites
      </button>
    </div>
  );
}

export default Tabs;
