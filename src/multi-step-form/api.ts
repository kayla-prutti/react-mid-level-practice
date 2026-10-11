import type { FormData } from "./schema";

/**
 * Fake registration endpoint (800ms latency).
 * Rejects when the email contains "error", so the failure path is easy to test.
 */
export function submitForm(data: FormData): Promise<{ id: string }> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (data.email.toLowerCase().includes("error")) {
        reject(new Error("Server rejected the submission."));
        return;
      }
      resolve({ id: crypto.randomUUID() });
    }, 800);
  });
}
