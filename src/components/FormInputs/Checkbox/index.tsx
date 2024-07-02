import { ICombinedSchema } from "@/lib/forms/combinedInterfaces";
import { cn } from "@/lib/utils";
import { ErrorMessage } from "@hookform/error-message";
import { ReactNode } from "react";
import { FieldErrors, Path, UseFormRegister } from "react-hook-form";

type CheckboxProps = {
  fieldId: Path<ICombinedSchema>;
  label: string | ReactNode;
  register?: UseFormRegister<ICombinedSchema>;
  errors?: FieldErrors<ICombinedSchema>;
  className?: string;
};

export default function Checkbox({
  fieldId,
  label,
  register,
  errors,
  className,
}: CheckboxProps) {
  return (
    <>
      <div className={cn("flex items-center", className)}>
        <input
          {...(register && register(fieldId))}
          type="checkbox"
          id={fieldId}
          className="checkbox-primary checkbox mr-3 border-beige-200 bg-beige-50 focus:outline focus:outline-[3px] focus:outline-offset-0 focus:outline-sage-300"
        />
        <label htmlFor={fieldId} className="label-text text-base">
          {label}
        </label>
      </div>
      {errors && (
        <ErrorMessage
          errors={errors}
          name={fieldId}
          render={({ message }) => (
            <span className="my-1 text-xs text-error">{message}</span>
          )}
        />
      )}
    </>
  );
}
