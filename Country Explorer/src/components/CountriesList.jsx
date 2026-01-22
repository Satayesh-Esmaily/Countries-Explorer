import CountryCard from "./CountryCard";

function CountriesList({
  countries,
  loading,
  error,
  favorites = [],
  toggleFavorite,
}) {
  if (loading || error) return null;

  if (countries.length === 0)
    return (
      <p style={{ textAlign: "center", marginTop: "20px" }}>
        Does this country exist? I don't think so.
      </p>
    );

  return (
    <div className="countries-container">
      {countries.map((country) => {
        const isFav = favorites.some(
          (c) => c.name?.common === country.name?.common
        );

        return (
          <CountryCard
            key={country.name?.common}
            country={country}
            isFav={isFav}
            toggleFavorite={toggleFavorite}
          />
        );
      })}
    </div>
  );
}

export default CountriesList;
