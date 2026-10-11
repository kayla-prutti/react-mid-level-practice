import type { UseFormReturn } from "react-hook-form";
import type { FormData } from "./schema";

export interface StepProps {
  form: UseFormReturn<FormData>;
}

export function PersonalStep({ form }: StepProps) {
  const { register, formState: { errors } } = form;
  // TODO: render firstName / lastName / email inputs + error messages
  return <div>PersonalStep TODO</div>;
}

export function AddressStep({ form }: StepProps) {
  // TODO: street / city / zip
  return <div>AddressStep TODO</div>;
}

export function AccountStep({ form }: StepProps) {
  // TODO: username / password / confirmPassword
  return <div>AccountStep TODO</div>;
}

export function ReviewStep({ form }: StepProps) {
  // TODO: show form.getValues() summary (don't display the password!)
  return <div>ReviewStep TODO</div>;
}
