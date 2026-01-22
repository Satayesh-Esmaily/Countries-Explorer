import { useEffect, useState } from "react";
import Controls from "./components/Controls";
import CountriesList from "./components/CountriesList";
import SkeletonGrid from "./components/SkeletonGrid";
import Tabs from "./components/Tabs";
import SortSelect from "./components/SortSelect";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("all");
  const [favorites, setFavorites] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [sort, setSort] = useState("none");

 
  const applyFilters = (list) => {
  let result = list.filter((country) => {
    const matchSearch =
      search.trim() === "" ||
      country.name?.common
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchRegion =
      region === "all" || country.region === region;

    return matchSearch && matchRegion;
  });

  if (sort === "asc") {
    result = [...result].sort(
      (a, b) => (a.population || 0) - (b.population || 0)
    );
  }

  if (sort === "desc") {
    result = [...result].sort(
      (a, b) => (b.population || 0) - (a.population || 0)
    );
  }

  return result;
};


  const visibleCountries =
    activeTab === "favorites"
      ? applyFilters(favorites)
      : applyFilters(countries);

  const toggleFavorite = (country) => {
    setFavorites((prev) =>
      prev.some((c) => c.name?.common === country.name?.common)
        ? prev.filter((c) => c.name?.common !== country.name?.common)
        : [...prev, country]
    );
  };

  useEffect(() => {
    const fetchCountries = async () => {
      setLoading(true);
      setError(null);

      try {
        let url = "";
        if (search.trim().length >= 2) {
          url = `https://restcountries.com/v3.1/name/${search}?fields=name,flags,region,population`;
        } else if (region !== "all") {
          url = `https://restcountries.com/v3.1/region/${region}?fields=name,flags,region,population`;
        } else {
          url = `https://restcountries.com/v3.1/all?fields=name,flags,region,population`;
        }

        const response = await fetch(url);

        if (!response.ok) {
          if (response.status === 404) {
            setCountries([]);
            return;
          }
          throw new Error("Something went wrong while fetching countries.");
        }

        const data = await response.json();
        setCountries(data);
      } catch (err) {
        setError(err.message);
        setCountries([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, [search, region]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Countries Explorer</h1>

      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
     <div className="controls">
      <Controls
        search={search}
        setSearch={setSearch}
        region={region}
        setRegion={setRegion}
      />
     <SortSelect sort={sort} setSort={setSort} />
     </div>

      {loading && <SkeletonGrid />}

      {error && (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <p>Error: {error}</p>
          <button className="retry-btn" onClick={() => window.location.reload()}>
            Reload
          </button>
        </div>
      )}

      {!loading && !error && (
        <CountriesList
          countries={visibleCountries}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
        />
      )}
    </div>
  );
}

export default App;
