import type { User } from "./types";

export const mockUsers: User[] = [
  { id: 1, firstName: "Emma", lastName: "Johnson", email: "emma.johnson@example.com" },
  { id: 2, firstName: "Liam", lastName: "Smith", email: "liam.smith@example.com" },
  { id: 3, firstName: "Olivia", lastName: "Williams", email: "olivia.williams@example.com" },
  { id: 4, firstName: "Noah", lastName: "Brown", email: "noah.brown@example.com" },
  { id: 5, firstName: "Ava", lastName: "Jones", email: "ava.jones@example.com" },
  { id: 6, firstName: "Ethan", lastName: "Garcia", email: "ethan.garcia@example.com" },
  { id: 7, firstName: "Sophia", lastName: "Miller", email: "sophia.miller@example.com" },
  { id: 8, firstName: "Mason", lastName: "Davis", email: "mason.davis@example.com" },
  { id: 9, firstName: "Isabella", lastName: "Rodriguez", email: "isabella.rodriguez@example.com" },
  { id: 10, firstName: "Lucas", lastName: "Martinez", email: "lucas.martinez@example.com" },
  { id: 11, firstName: "Mia", lastName: "Hernandez", email: "mia.hernandez@example.com" },
  { id: 12, firstName: "Logan", lastName: "Lopez", email: "logan.lopez@example.com" },
  { id: 13, firstName: "Charlotte", lastName: "Gonzalez", email: "charlotte.gonzalez@example.com" },
  { id: 14, firstName: "James", lastName: "Wilson", email: "james.wilson@example.com" },
  { id: 15, firstName: "Amelia", lastName: "Anderson", email: "amelia.anderson@example.com" },
  { id: 16, firstName: "Benjamin", lastName: "Thomas", email: "benjamin.thomas@example.com" },
  { id: 17, firstName: "Harper", lastName: "Taylor", email: "harper.taylor@example.com" },
  { id: 18, firstName: "Elijah", lastName: "Moore", email: "elijah.moore@example.com" },
  { id: 19, firstName: "Evelyn", lastName: "Jackson", email: "evelyn.jackson@example.com" },
  { id: 20, firstName: "Oliver", lastName: "Martin", email: "oliver.martin@example.com" },
  { id: 21, firstName: "Abigail", lastName: "Lee", email: "abigail.lee@example.com" },
  { id: 22, firstName: "Jacob", lastName: "Perez", email: "jacob.perez@example.com" },
  { id: 23, firstName: "Emily", lastName: "Thompson", email: "emily.thompson@example.com" },
  { id: 24, firstName: "Michael", lastName: "White", email: "michael.white@example.com" },
  { id: 25, firstName: "Ella", lastName: "Harris", email: "ella.harris@example.com" },
  { id: 26, firstName: "Daniel", lastName: "Sanchez", email: "daniel.sanchez@example.com" },
  { id: 27, firstName: "Avery", lastName: "Clark", email: "avery.clark@example.com" },
  { id: 28, firstName: "Henry", lastName: "Ramirez", email: "henry.ramirez@example.com" },
  { id: 29, firstName: "Sofia", lastName: "Lewis", email: "sofia.lewis@example.com" },
  { id: 30, firstName: "Jack", lastName: "Robinson", email: "jack.robinson@example.com" },
  { id: 31, firstName: "Emma", lastName: "Walker", email: "emma.walker@example.com" },
  { id: 32, firstName: "Jackson", lastName: "Young", email: "jackson.young@example.com" },
  { id: 33, firstName: "Scarlett", lastName: "Allen", email: "scarlett.allen@example.com" },
  { id: 34, firstName: "Sebastian", lastName: "King", email: "sebastian.king@example.com" },
  { id: 35, firstName: "Grace", lastName: "Wright", email: "grace.wright@example.com" },
  { id: 36, firstName: "Mateo", lastName: "Scott", email: "mateo.scott@example.com" },
  { id: 37, firstName: "Chloe", lastName: "Torres", email: "chloe.torres@example.com" },
  { id: 38, firstName: "Owen", lastName: "Nguyen", email: "owen.nguyen@example.com" },
  { id: 39, firstName: "Lily", lastName: "Hill", email: "lily.hill@example.com" },
  { id: 40, firstName: "Wyatt", lastName: "Flores", email: "wyatt.flores@example.com" },
];

/**
 * Fake API with latency, for testing loading / error / race conditions offline.
 *  - Latency is random (100-800ms), so earlier requests can resolve AFTER later ones.
 *  - Queries containing "error" reject, to exercise the error state.
 *  - Honors AbortSignal.
 */
export function mockSearchUsers(query: string, signal?: AbortSignal): Promise<User[]> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      if (query.toLowerCase().includes("error")) {
        reject(new Error("Mock server error"));
        return;
      }
      const q = query.trim().toLowerCase();
      resolve(
        mockUsers.filter((u) =>
          `${u.firstName} ${u.lastName} ${u.email}`.toLowerCase().includes(q)
        )
      );
    }, 100 + Math.random() * 700);

    signal?.addEventListener("abort", () => {
      clearTimeout(timer);
      reject(new DOMException("Aborted", "AbortError"));
    });
  });
}
