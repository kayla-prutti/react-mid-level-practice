import { useState } from "react";
import type { FormEvent } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ZodTypeAny } from "zod";
import { accountSchema, addressSchema, formSchema, personalSchema } from "./schema";
import type { FormData } from "./schema";
import { PersonalStep, AddressStep, AccountStep, ReviewStep } from "./steps";
import { submitForm } from "./api";

/**
 * Requirements checklist:
 *  [x] One useForm shared across all steps (state persists when going back)
 *  [~] Next enabled only when the current step is valid (safeParse of the step schema)
 *  [x] Zod resolver (one combined schema for messages + per-step schema for navigation)
 *  [x] Previous / Next / Submit buttons; Previous hidden on step 1
 *  [ ] Progress indicator
 *  [x] Review step + final submit (fake async submit, disable button while submitting)
 *  [x] Success screen + reset
 *  [ ] Bonus: persist draft to localStorage
 */
const STEPS: { label: string; schema: ZodTypeAny }[] = [
  { label: "Personal", schema: personalSchema },
  { label: "Address", schema: addressSchema },
  { label: "Account", schema: accountSchema },
  { label: "Review", schema: formSchema },
];

export default function MultiStepForm() {
  const [stepIndex, setStepIndex] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<FormData>({
    mode: "onTouched",
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "", lastName: "", email: "",
      street: "", city: "", zip: "",
      username: "", password: "", confirmPassword: "",
    },
  });

  const { isSubmitting } = form.formState;
  const isFirstStep = stepIndex === 0;
  const isLastStep = stepIndex === STEPS.length - 1;

  // watch() re-renders on every change, so the button state tracks the inputs live.
  // Only the current step's schema decides whether "Next" is enabled.
  const isStepValid = STEPS[stepIndex].schema.safeParse(form.watch()).success;

  const handleNext = () => {
    if (isStepValid) setStepIndex((i) => i + 1);
  };

  const handleBack = () => setStepIndex((i) => i - 1);

  // handleSubmit awaits this, so formState.isSubmitting is true for the whole request.
  const onSubmit = async (data: FormData) => {
    setSubmitError(null);
    try {
      await submitForm(data);
      setIsSuccess(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  const handleReset = () => {
    form.reset();
    setStepIndex(0);
    setSubmitError(null);
    setIsSuccess(false);
  };

  // Enter inside an input fires the <form>'s submit event. It must never submit the data:
  // treat it as "Next" on steps 0-2 and ignore it on the review step.
  // The real submit only happens from the Submit button's onClick.
  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!isLastStep) handleNext();
  };

  if (isSuccess) {
    return (
      <div style={{ maxWidth: 480 }}>
        <h2>Multi-Step Form</h2>
        <p role="status" style={{ color: "green" }}>
          Success! Your registration was submitted.
        </p>
        <button type="button" onClick={handleReset}>Start over</button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 480 }}>
      <h2>Multi-Step Form</h2>
      <p>Step {stepIndex + 1} of {STEPS.length}: {STEPS[stepIndex].label}</p>

      <form onSubmit={handleFormSubmit} noValidate>
        {stepIndex === 0 && <PersonalStep form={form} />}
        {stepIndex === 1 && <AddressStep form={form} />}
        {stepIndex === 2 && <AccountStep form={form} />}
        {stepIndex === 3 && <ReviewStep form={form} />}

        {submitError && (
          <p role="alert" style={{ color: "crimson" }}>
            Submission failed: {submitError} Please try again.
          </p>
        )}

        <div
          style={{
            display: "flex",
            justifyContent: isFirstStep ? "flex-end" : "space-between",
            marginTop: 16,
          }}
        >
          {!isFirstStep && (
            <button type="button" onClick={handleBack} disabled={isSubmitting}>
              Previous
            </button>
          )}
          {isLastStep ? (
            <button
              type="button"
              onClick={form.handleSubmit(onSubmit)}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          ) : (
            <button type="button" onClick={handleNext} disabled={!isStepValid}>
              Next
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
