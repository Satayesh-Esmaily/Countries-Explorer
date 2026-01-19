import { useEffect, useState } from "react";
import Controls from "./components/Controls";
import CountriesList from "./components/CountriesList";
import SkeletonGrid from "./components/SkeletonGrid";
import './App.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("all");

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
        setCountries([]); // ← Empty State
        return;
      } else {
        throw new Error("Something went wrong while fetching countries.");
      }
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

      <Controls
        search={search}
        setSearch={setSearch}
        region={region}
        setRegion={setRegion}
      />

      
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
        <CountriesList countries={countries} />
      )}
    </div>
  );
}

export default App;
