interface SearchFilterProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  gender: string
  onGenderChange: (value: string) => void
}

function SearchFilter({
  value,
  onChange,
  placeholder = 'Search...',
  gender,
  onGenderChange,
}: SearchFilterProps) {

  return (
  <div className="search-filter">
    <div className="search-filter-field">
      <svg
        className="search-filter-icon"
        viewBox="0 0 24 24"
        width="18"
        height="18"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>

      <input
        type="text"
        className="search-filter-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />

      {value && (
        <button
          type="button"
          className="search-filter-clear"
          onClick={() => onChange('')}
          aria-label="Clear search"
        >
          ×
        </button>
      )}
    </div>

    <select
      className="search-filter-select"
      value={gender}
      onChange={(e) => onGenderChange(e.target.value)}
      aria-label="Filter by gender"
    >
      <option value="">All</option>
      <option value="Male">Male</option>
      <option value="Female">Female</option>
    </select>
  </div>
)}

export default SearchFilter