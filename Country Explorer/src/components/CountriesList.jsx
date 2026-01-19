import CountryCard from "./CountryCard";

function CountriesList({ countries, loading, error }) {
  if (loading || error) return null;
 if (countries.length === 0)
  return <p style={{ textAlign: "center", marginTop: "20px" }}>Does this country exist? I don't think so.</p>;

  return (
    <div className="countries-container">
      {countries.map((country) => (
        <CountryCard key={country.name?.common} country={country} />
      ))}
    </div>
  );
}

export default CountriesList;
