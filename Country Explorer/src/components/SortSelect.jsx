function SortSelect({ sort, setSort }) {
  return (
    <div className="controls">
      <select value={sort} onChange={(e) => setSort(e.target.value)}>
        <option value="none">Sort by population</option>
        <option value="asc">Population: Low → High</option>
        <option value="desc">Population: High → Low</option>
      </select>
    </div>
  );
}

export default SortSelect;
