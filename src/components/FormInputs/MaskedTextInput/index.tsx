import type { ICombinedSchema } from '@/lib/interface';
import { ErrorMessage } from '@hookform/error-message';
import type { MaskitoOptions } from '@maskito/core';
import { useMaskito } from '@maskito/react';
import type { ReactNode } from 'react';
import {
	type Control,
	Controller,
	type FieldErrors,
	type Path,
} from 'react-hook-form';

type MaskedTextInputProps = {
	fieldId: Path<ICombinedSchema>;
	label?: string | ReactNode;
	placeholder?: string;
	value?: string;
	minLength?: number;
	maxLength?: number;
	control: Control<ICombinedSchema>;
	maskitoOptions: { options: MaskitoOptions };
	errors?: FieldErrors<ICombinedSchema>;
	handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	disabled?: boolean;
	required?: boolean;
};

export default function MaskedTextInput({
	fieldId,
	errors,
	label,
	placeholder,
	minLength,
	maxLength,
	control,
	maskitoOptions,
	handleChange,
	disabled,
	required,
}: MaskedTextInputProps) {
	const maskitoRef = useMaskito(maskitoOptions);

	return (
		<>
			<label htmlFor={fieldId} className='label my-1 py-0'>
				{label}
			</label>
			<Controller
				name={fieldId}
				control={control}
				defaultValue=''
				rules={required ? { required: required } : {}}
				render={({ field }) => (
					//@ts-ignore
					<input
						{...field}
						ref={(e) => {
							field.ref(e);
							maskitoRef(e);
						}}
						{...(minLength ? { minLength: minLength } : {})}
						{...(maxLength ? { maxLength: maxLength } : {})}
						placeholder={placeholder}
						onInput={field.onChange}
						onChange={handleChange}
						type='text'
						disabled={disabled}
						id={fieldId}
						className='input input-bordered h-10 w-full rounded-none px-2 focus:outline focus:outline-[3px] focus:outline-blue-300 focus:outline-offset-0 disabled:border-gray-400 disabled:border-solid disabled:border-opacity-40 disabled:text-gray-400'
					/>
				)}
			/>
			{errors && (
				<ErrorMessage
					errors={errors}
					name={fieldId}
					render={({ message }) => (
						<span className='my-1 text-error text-xs'>{message}</span>
					)}
				/>
			)}
		</>
	);
}
