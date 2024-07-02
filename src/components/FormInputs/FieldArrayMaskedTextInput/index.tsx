import { ICombinedSchema } from "@/lib/forms/combinedInterfaces";
import { MaskitoOptions } from "@maskito/core";
import { useMaskito } from "@maskito/react";
import { Control, Controller, Path } from "react-hook-form";

type MaskedFieldArrayTextInputProps = {
  fieldId: Path<ICombinedSchema>;
  label?: string;
  placeholder?: string;
  value?: string;
  minLength?: number;
  maxLength?: number;
  control: Control<ICombinedSchema>;
  maskitoOptions: { options: MaskitoOptions };
  readonly?: boolean;
  extraChange?: () => void;
};

export default function FieldArrayMaskedTextInput({
  fieldId,
  label,
  placeholder,
  minLength,
  maxLength,
  control,
  maskitoOptions,
  extraChange,
  readonly,
}: MaskedFieldArrayTextInputProps) {
  const maskitoRef = useMaskito(maskitoOptions);

  return (
    <>
      <label htmlFor={fieldId} className="label my-1 py-0">
        {label}
      </label>
      <Controller
        name={fieldId}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <input
            {...field}
            ref={(e) => {
              field.ref(e);
              maskitoRef(e);
            }}
            {...(minLength ? { minLength: minLength } : {})}
            {...(maxLength ? { maxLength: maxLength } : {})}
            placeholder={placeholder}
            onInput={(e) => {
              field.onChange(e);
              if (extraChange) extraChange();
            }}
            type="text"
            id={fieldId}
            className={
              "input input-bordered h-10 w-full rounded-none px-2 focus:outline focus:outline-[3px] focus:outline-offset-0 focus:outline-sage-300"
            }
            readOnly = {readonly}
          />
        )}
      />
    </>
  );
}
