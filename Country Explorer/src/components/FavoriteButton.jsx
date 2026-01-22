export default function FavoriteButton({ isFav, onToggle }) {
  return (
    <button
      className="retry-btn"
      onClick={onToggle}
    >
      {isFav ? "★ Remove Favorite" : "☆ Add Favorite"}
    </button>
  );
}
