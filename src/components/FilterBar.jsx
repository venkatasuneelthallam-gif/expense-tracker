function FilterBar({
  search,
  setSearch,
  category,
  setCategory,
  period,
  setPeriod,
  onClear,
}) {
  return (
    <div className="filter-bar">

      <div className="search-box">

        <span>🔍</span>

        <input
          type="text"
          placeholder="Search expenses..."
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
        />

      </div>

      <select
        value={category}
        onChange={(event) =>
          setCategory(event.target.value)
        }
      >
        <option value="All">All Categories</option>
        <option value="Food">Food</option>
        <option value="Travel">Travel</option>
        <option value="Shopping">Shopping</option>
        <option value="Bills">Bills</option>
        <option value="Education">Education</option>
        <option value="Health">Health</option>
        <option value="Entertainment">
          Entertainment
        </option>
        <option value="Other">Other</option>
      </select>

      <select
        value={period}
        onChange={(event) =>
          setPeriod(event.target.value)
        }
      >
        <option value="All">All Time</option>
        <option value="Week">This Week</option>
        <option value="Month">This Month</option>
        <option value="Year">This Year</option>
      </select>

      <button
        className="clear-filter-btn"
        onClick={onClear}
      >
        Clear
      </button>

    </div>
  );
}

export default FilterBar;