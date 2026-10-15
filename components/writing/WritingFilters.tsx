import { Search, X } from "lucide-react";

export default function WritingFilters({
  query,
  onQueryChange,
  categories,
  selectedCategory,
  onCategoryChange,
}: {
  query: string;
  onQueryChange: (value: string) => void;
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
}) {
  return (
    <section className="writing-controls" aria-label="Writing filters">
      <label className="writing-search">
        <Search />
        <input
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search planning, nickel, AI, technology..."
          aria-label="Search field notes"
        />
        {query && (
          <button
            type="button"
            onClick={() => onQueryChange("")}
            aria-label="Clear search"
          >
            <X />
          </button>
        )}
      </label>

      <div className="writing-category-scroll">
        {categories.map((category) => (
          <button
            type="button"
            key={category}
            className={selectedCategory === category ? "active" : ""}
            onClick={() => onCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </section>
  );
}
