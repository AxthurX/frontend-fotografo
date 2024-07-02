import { ICombinedSchema } from "@/lib/forms/combinedInterfaces";
import { ErrorMessage } from "@hookform/error-message";
import { ReactNode } from "react";
import { FieldErrors, Path, UseFormRegister } from "react-hook-form";
export interface ISelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
  selected?: boolean;
}

type SelectProps = {
  fieldId: Path<ICombinedSchema>;
  label?: string | ReactNode;
  register: UseFormRegister<ICombinedSchema>;
  options?: ISelectOption[];
  errors?: FieldErrors<ICombinedSchema>;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  required?: boolean;
};

export default function Select({
  fieldId,
  label,
  register,
  options,
  errors,
  handleChange,
  disabled,
  required,  
}: SelectProps) {
  const registerOptions = {
    onChange: handleChange,
    ...(required ? { required: "Campo obrigatorio" } : {}),
  };

  return (
    <>
      <label htmlFor={fieldId} className="label my-1 py-0">
        {label}
      </label>
      <select
        id={fieldId}
        className="select select-bordered select-sm h-10 w-full rounded-none px-2 py-0 text-base focus:outline focus:outline-[3px] focus:outline-offset-0 focus:outline-sage-300 disabled:border-solid disabled:border-gray-400 disabled:border-opacity-40"
        {...register(fieldId, registerOptions)}
        defaultValue={""}
        disabled={disabled}
      >
        <option disabled value=""></option>
        {options?.length === 0 ? (
          <>
            <option value={0}>
              {" "}
            </option>
          </>
        ) : (
          <></>
        )}
        {options &&
          options.length > 0 &&
          options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
      </select>

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
