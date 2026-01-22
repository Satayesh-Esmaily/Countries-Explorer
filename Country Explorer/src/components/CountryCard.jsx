function CountryCard({ country, isFav, toggleFavorite }) {
  return (
    <div className="glass-card">
      <img src={country.flags?.png} alt={country.name?.common} />
      <h3>{country.name?.common}</h3>
      <p>Region: {country.region}</p>
      <p>Population: {country.population?.toLocaleString()}</p>

      {/* Favorite Button */}
      <button
        className="favorite-btn"
        onClick={() => toggleFavorite(country)}
      >
        {isFav ? "★ Remove" : "☆ Add to Favorites"}
      </button>
    </div>
  );
}

export default CountryCard;
