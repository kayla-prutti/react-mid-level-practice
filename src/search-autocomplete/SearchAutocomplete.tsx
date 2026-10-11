import { useEffect, useState } from "react";
import { useDebounce } from "./useDebounce";
import { searchUsers } from "./api";
import type { SearchStatus, User } from "./types";

/**
 * Requirements checklist:
 *  [ ] Debounced input (300ms)
 *  [ ] Fetch on debounced value; skip empty query
 *  [ ] Loading / error / empty states
 *  [ ] Cancel or ignore stale requests (AbortController / race conditions)
 *  [ ] Highlight the matching text in results
 */
export default function SearchAutocomplete() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<User[]>([]);
  const [status, setStatus] = useState<SearchStatus>("idle");

  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    const trimmed = debouncedQuery.trim();

    if (!trimmed) {
      setResults([]);
      setStatus("idle");
      return;
    }

    // Each run owns its controller; cleanup aborts the previous request,
    // so a slow, stale response can never overwrite a newer one.
    const controller = new AbortController();
    setStatus("loading");

    searchUsers(trimmed, controller.signal)
      .then((users) => {
        setResults(users);
        setStatus("success");
      })
      .catch((err) => {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setResults([]);
        setStatus("error");
      });

    return () => controller.abort();
  }, [debouncedQuery]);

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

      {status === "loading" && <p>Loading...</p>}
      {status === "error" && (
        <p role="alert">Something went wrong. Please try again.</p>
      )}
      {status === "success" && results.length === 0 && (
        <p>No results for "{debouncedQuery}".</p>
      )}
      {status === "success" && results.length > 0 && (
        <ul>
          {results.map((u) => (
            <li key={u.id}>
              {u.firstName} {u.lastName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
