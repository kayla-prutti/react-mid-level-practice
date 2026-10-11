import type { User } from "./types";
import { mockSearchUsers } from "./mockUsers";

/**
 * Search users by `query`. Backed by local mock data (random latency, abortable).
 * Typing "error" rejects, to exercise the error state.
 */
export function searchUsers(query: string, signal?: AbortSignal): Promise<User[]> {
  return mockSearchUsers(query, signal);
}
