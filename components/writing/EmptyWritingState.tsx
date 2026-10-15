import { SearchX } from "lucide-react";

export default function EmptyWritingState({
  onReset,
}: {
  onReset: () => void;
}) {
  return (
    <div className="writing-empty">
      <SearchX />
      <span>NO FIELD NOTES FOUND</span>
      <h3>Nothing matches this search or topic.</h3>
      <p>Clear the current filters and return to the full knowledge log.</p>
      <button type="button" onClick={onReset}>
        CLEAR FILTERS
      </button>
    </div>
  );
}
