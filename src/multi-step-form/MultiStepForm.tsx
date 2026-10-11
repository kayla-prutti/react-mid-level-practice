import { useState } from "react";
import { useForm } from "react-hook-form";
import type { FormData } from "./schema";
import { PersonalStep, AddressStep, AccountStep, ReviewStep } from "./steps";

/**
 * Requirements checklist:
 *  [ ] One useForm shared across all steps (state persists when going back)
 *  [ ] Validate ONLY the current step's fields before "Next" (form.trigger([...fields]))
 *  [ ] Zod resolver (@hookform/resolvers/zod) - decide: per-step schema vs. one schema
 *  [ ] Back / Next / Submit buttons; no Back on step 1
 *  [ ] Progress indicator
 *  [ ] Review step + final submit (fake async submit, disable button while submitting)
 *  [ ] Success screen + reset
 *  [ ] Bonus: persist draft to localStorage
 */
const STEPS = [
  { label: "Personal", fields: ["firstName", "lastName", "email"] },
  { label: "Address", fields: ["street", "city", "zip"] },
  { label: "Account", fields: ["username", "password", "confirmPassword"] },
  { label: "Review", fields: [] },
] as const;

export default function MultiStepForm() {
  const [stepIndex, setStepIndex] = useState(0);

  const form = useForm<FormData>({
    mode: "onTouched",
    defaultValues: {
      firstName: "", lastName: "", email: "",
      street: "", city: "", zip: "",
      username: "", password: "", confirmPassword: "",
    },
    // TODO: resolver: zodResolver(...)
  });

  // TODO: handleNext  -> const valid = await form.trigger(STEPS[stepIndex].fields); if (valid) setStepIndex(i => i + 1)
  // TODO: handleBack
  // TODO: onSubmit

  return (
    <div style={{ maxWidth: 480 }}>
      <h2>Multi-Step Form</h2>
      <p>Step {stepIndex + 1} of {STEPS.length}: {STEPS[stepIndex].label}</p>

      <form>
        {stepIndex === 0 && <PersonalStep form={form} />}
        {stepIndex === 1 && <AddressStep form={form} />}
        {stepIndex === 2 && <AccountStep form={form} />}
        {stepIndex === 3 && <ReviewStep form={form} />}

        {/* TODO: Back / Next / Submit buttons */}
      </form>
    </div>
  );
}
