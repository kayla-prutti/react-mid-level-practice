import { z } from "zod";

export const personalSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email"),
});

export const addressSchema = z.object({
  street: z.string().min(1, "Street is required"),
  city: z.string().min(1, "City is required"),
  zip: z.string().regex(/^\d{5}$/, "ZIP must be 5 digits"),
});

export const accountSchema = z
  .object({
    username: z.string().min(3, "At least 3 characters"),
    password: z.string().min(8, "At least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

// TODO: combine into one schema if you validate everything at once on submit
export type PersonalData = z.infer<typeof personalSchema>;
export type AddressData = z.infer<typeof addressSchema>;
export type AccountData = z.infer<typeof accountSchema>;
export type FormData = PersonalData & AddressData & AccountData;
