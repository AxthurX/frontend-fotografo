import { ICombinedSchema } from "@/lib/forms/combinedInterfaces";
import { ErrorMessage } from "@hookform/error-message";
import { ReactNode } from "react";
import { FieldErrors, Path, UseFormRegister } from "react-hook-form";

type FileInputProps = {
  fieldId: Path<ICombinedSchema>;
  label: string | ReactNode;
  register: UseFormRegister<ICombinedSchema>;
  errors?: FieldErrors<ICombinedSchema>;
};

export default function FileInput({
  fieldId,
  label,
  errors,
  register,
}: FileInputProps) {
  return (
    <>
      <label htmlFor={fieldId} className="label">
        {label}
      </label>
      <input
        type="file"
        id={fieldId}
        className="file-input file-input-bordered h-10 w-full rounded-none focus:outline focus:outline-[3px] focus:outline-offset-0 focus:outline-sage-300"
        {...register(fieldId)}
      />
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
