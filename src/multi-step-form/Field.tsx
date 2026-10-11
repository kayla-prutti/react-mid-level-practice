import type { HTMLInputTypeAttribute } from "react";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface FieldProps {
  label: string;
  registration: UseFormRegisterReturn;
  error?: FieldError;
  required?: boolean;
  type?: HTMLInputTypeAttribute;
  autoComplete?: string;
}

/** Labelled input + error message; keeps the step components free of repeated markup. */
export default function Field({ label, registration, error, required, type = "text", autoComplete }: FieldProps) {
  const id = registration.name;
  const errorId = `${id}-error`;

  return (
    <div style={{ marginBottom: 12 }}>
      <label htmlFor={id} style={{ display: "block", marginBottom: 4 }}>
        {label}
        {required && <span aria-hidden="true" style={{ color: "crimson" }}> *</span>}
      </label>
      <input
        id={id}
        type={type}
        autoComplete={autoComplete}
        aria-required={required}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        style={{ width: "100%", padding: 8, boxSizing: "border-box" }}
        {...registration}
      />
      {error && (
        <p id={errorId} role="alert" style={{ color: "crimson", margin: "4px 0 0" }}>
          {error.message}
        </p>
      )}
    </div>
  );
}
