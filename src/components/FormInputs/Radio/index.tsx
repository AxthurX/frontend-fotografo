import { ICombinedSchema } from "@/lib/forms/combinedInterfaces";
import { ErrorMessage } from "@hookform/error-message";
import { ReactNode } from "react";
import { FieldErrors, Path, UseFormRegister } from "react-hook-form";

export interface IRadioOption {
  label: string;
  value: string | number ;
  checked?: boolean;
  disabled?: boolean;
}

type RadioProps = {
  fieldId: Path<ICombinedSchema>;
  label?: string | ReactNode;
  register: UseFormRegister<ICombinedSchema>;
  options?: IRadioOption[];
  centered?: boolean;
  isDaisy?: boolean;
  className?: string;
  isVertical?: boolean;
  errors?: FieldErrors<ICombinedSchema>;
  extraChange?: () => void;
};

export default function RadioButton({
  fieldId,
  isVertical = false,
  label,
  errors,
  register,
  options = [
    { label: "Sim", value: "Sim" },
    { label: "Não", value: "Não" },
  ],
  className,
  extraChange,
  centered = false,
}: RadioProps) {
  const { onChange } = register(fieldId);

  return (
    <fieldset>
      <legend className="label py-0 max-sm:mb-2">{label}</legend>
      <div
        className={
          (className ? className : isVertical ? "flex flex-row gap-2 " : "")+ (centered == true ? "justify-center":"")
        }
      >
        {options.map((option) => (
          <div
            className="mb-1 flex items-center gap-2 max-sm:gap-1 max-sm:pb-2 md:py-1"
            key={`${fieldId}${option.value}`}
          >
            <input
              type="radio"
              id={`${fieldId}${option.value}`}
              value={option.value}
              defaultChecked={option.checked}
              disabled={option.disabled}
              {...register(fieldId)}
              onChange={(e) => {
                onChange(e);
                if (extraChange) extraChange();
              }}
              className="radio-primary radio border-beige-200 bg-beige-50 checked:shadow-daisy-radio focus:outline focus:outline-[3px] focus:outline-offset-0 focus:outline-sage-300 disabled:bg-gray-300 disabled:opacity-75 max-lg:mr-2"
            />
            <label
              htmlFor={`${fieldId}${option.value}`}
              className="label text-base font-normal"
            >
              {option.label}
            </label>
          </div>
        ))}
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
    </fieldset>
  );
}
