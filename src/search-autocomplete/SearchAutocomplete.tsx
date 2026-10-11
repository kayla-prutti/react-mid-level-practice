import { useState } from "react";
import { useDebounce } from "./useDebounce";
import { searchUsers } from "./api";
import type { SearchStatus, User } from "./types";

/**
 * Requirements checklist:
 *  [ ] Debounced input (300ms)
 *  [ ] Fetch on debounced value; skip empty query
 *  [ ] Loading / error / empty states
 *  [ ] Cancel or ignore stale requests (AbortController / race conditions)
 *  [ ] Keyboard nav: ArrowUp / ArrowDown / Enter / Escape
 *  [ ] Click outside closes the list
 *  [ ] Highlight the matching text in results
 *  [ ] a11y: role="combobox", aria-expanded, aria-activedescendant, role="listbox"/"option"
 */
export default function SearchAutocomplete() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<User[]>([]);
  const [status, setStatus] = useState<SearchStatus>("idle");
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);

  const debouncedQuery = useDebounce(query, 300);

  // TODO: useEffect on debouncedQuery -> call searchUsers, update status/results

  // TODO: handleKeyDown for keyboard navigation

  // TODO: handleSelect(user)

  return (
    <div style={{ maxWidth: 400 }}>
      <h2>Search Autocomplete</h2>
      <input
        type="text"
        value={query}
        placeholder="Search users..."
        onChange={(e) => setQuery(e.target.value)}
        style={{ width: "100%", padding: 8 }}
      />

      {/* TODO: render loading / error / empty / results list */}
    </div>
  );
}
