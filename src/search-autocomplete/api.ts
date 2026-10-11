import type { User } from "./types";

const BASE_URL = "https://dummyjson.com/users/search";

/**
 * Fetch users matching `query`.
 * TODO: pass the AbortSignal to fetch so stale requests can be cancelled.
 * TODO: throw on non-2xx responses.
 */
export async function searchUsers(query: string, signal?: AbortSignal): Promise<User[]> {
  // TODO: implement
  throw new Error("searchUsers not implemented");
}
