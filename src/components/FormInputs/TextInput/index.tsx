import { ICombinedSchema } from '@/lib/forms/combinedInterfaces';
import { cn } from '@/lib/utils';
import { ErrorMessage } from '@hookform/error-message';
import { ReactNode } from 'react';
import { FieldErrors, Path, UseFormRegister } from 'react-hook-form';

type TextInputProps = {
  inputType?: "text" | "email" | "number" | "date" | "tel";
  fieldId: Path<ICombinedSchema>;
  label?: string | ReactNode;
  placeholder?: string;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  register: UseFormRegister<ICombinedSchema>;
  value?: string;
  min?: number;
  styles?: string;
  errors?: FieldErrors<ICombinedSchema>;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  required?: boolean;
  readonly?: boolean;
  classNameInput?: string  
};

export default function TextInput({
  inputType,
  errors,
  fieldId,
  label,
  placeholder,
  minLength,
  maxLength,
  pattern,
  register,
  value,
  min,
  handleChange,
  disabled,
  required,
  readonly,
  classNameInput
}: TextInputProps) {
	const registerOptions = {
		pattern: pattern,
		onChange: handleChange,
		...(required ? { required: required } : {}), // Adicione required apenas se required for true
	};

  return (
    <>
      <label htmlFor={fieldId} className="label my-1 py-0">
        {label}
      </label>
      <input
        type={inputType ? inputType : "text"}
        id={fieldId}
        className={
          cn("input input-bordered h-10 w-full rounded-none px-2 focus:outline focus:outline-[3px] focus:outline-offset-0 focus:outline-sage-300 disabled:border-solid disabled:border-gray-400 disabled:border-opacity-40 disabled:text-gray-600 read-only:border-solid read-only:border-gray-400 read-only:border-opacity-40 read-only:text-gray-600", classNameInput)
        }
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        readOnly={readonly}
        {...(minLength ? { minLength: minLength } : {})}
        {...(maxLength ? { maxLength: maxLength } : {})}
        {...(inputType === "number" && min ? { min: min } : {})}
        {...register(fieldId, registerOptions)}
        
      />

			{errors && (
				<ErrorMessage
					errors={errors}
					name={fieldId}
					render={({ message }) => (
						<span className='my-1 text-xs text-error'>{message}</span>
					)}
				/>
			)}
		</>
	);
}
