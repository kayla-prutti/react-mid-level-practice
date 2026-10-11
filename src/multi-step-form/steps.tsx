import type { UseFormReturn } from "react-hook-form";
import type { FormData } from "./schema";
import Field from "./Field";

export interface StepProps {
  form: UseFormReturn<FormData>;
}

export function PersonalStep({ form }: StepProps) {
  const { register, formState: { errors } } = form;
  return (
    <fieldset>
      <legend>Personal</legend>
      <Field label="First name" required registration={register("firstName")} error={errors.firstName} autoComplete="given-name" />
      <Field label="Last name" required registration={register("lastName")} error={errors.lastName} autoComplete="family-name" />
      <Field label="Email" type="email" required registration={register("email")} error={errors.email} autoComplete="email" />
    </fieldset>
  );
}

export function AddressStep({ form }: StepProps) {
  const { register, formState: { errors } } = form;
  return (
    <fieldset>
      <legend>Address</legend>
      <Field label="Street" required registration={register("street")} error={errors.street} autoComplete="street-address" />
      <Field label="City" required registration={register("city")} error={errors.city} autoComplete="address-level2" />
      <Field label="ZIP" required registration={register("zip")} error={errors.zip} autoComplete="postal-code" />
    </fieldset>
  );
}

export function AccountStep({ form }: StepProps) {
  const { register, formState: { errors } } = form;
  return (
    <fieldset>
      <legend>Account</legend>
      <Field label="Username" required registration={register("username")} error={errors.username} autoComplete="username" />
      <Field label="Password" type="password" required registration={register("password")} error={errors.password} autoComplete="new-password" />
      <Field label="Confirm password" type="password" required registration={register("confirmPassword")} error={errors.confirmPassword} autoComplete="new-password" />
    </fieldset>
  );
}

export function ReviewStep({ form }: StepProps) {
  // watch() subscribes to changes so the summary stays in sync with the inputs
  const { password, confirmPassword, ...values } = form.watch();

  return (
    <fieldset>
      <legend>Review</legend>
      <dl>
        {Object.entries(values).map(([key, value]) => (
          <div key={key} style={{ display: "flex", gap: 8 }}>
            <dt style={{ fontWeight: "bold" }}>{key}:</dt>
            <dd style={{ margin: 0 }}>{value || "—"}</dd>
          </div>
        ))}
        <div style={{ display: "flex", gap: 8 }}>
          <dt style={{ fontWeight: "bold" }}>password:</dt>
          <dd style={{ margin: 0 }}>{password ? "•".repeat(password.length) : "—"}</dd>
        </div>
      </dl>
    </fieldset>
  );
}
