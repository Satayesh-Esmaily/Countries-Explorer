function CountryCard({ country }) {
  return (
    <div className="country-card">
      <img
        src={country.flags?.png}
        alt={country.flags?.alt || country.name?.common}
      />
      <h3>{country.name?.common}</h3>
      <p>Region: {country.region}</p>
      <p>Population: {country.population?.toLocaleString()}</p>
    </div>
  );
}

export default CountryCard;
